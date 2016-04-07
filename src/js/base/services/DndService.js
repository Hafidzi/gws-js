/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('DndService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.DndService
     */
    context.DndService = context.oo.Singleton( /** @lends gbc.DndService */ {
      __name: "DndService",

      tableStartDragNode: null,
      tableCurrentDragNode: null,
      valueStartDragNode: null,
      dragDropInfoNode: null,
      dragOverValueNode: null,
      firstDragEnterSent: false,
      dragOverTreeItemNode: null,
      dndAccepted: false,

      init: Function.noop,

      /**
       * DragStart handler
       * @param tableNode
       * @param valueNode
       * @param evt
       */
      onDragStart: function(tableNode, valueNode, evt) {

        this.firstDragEnterSent = false;
        this.tableStartDragNode = tableNode;
        this.valueStartDragNode = valueNode;

        var events = [];

        // Send currentRow to VM
        var localStartDragRowIndex = valueNode.getParentNode().getChildren().indexOf(valueNode);
        var startDragRowIndex = tableNode.attribute("offset") + localStartDragRowIndex;
        events.push(new cls.VMConfigureEvent(tableNode.getId(), {
          currentRow: startDragRowIndex
        }));

        // Send row selection extension if mrs is enabled
        if (tableNode.attribute("multiRowSelection") === 1) {
          var startDragRowIndexIsSelected = (tableNode.getChildren("RowInfoList")[0].getChildren()[localStartDragRowIndex].attribute(
            "selected") === 1);
          if (startDragRowIndexIsSelected === false) {
            events.push(new cls.VMRowSelectionEvent(tableNode.getId(), {
              startIndex: startDragRowIndex,
              endIndex: startDragRowIndex,
              selectionMode: "set"
            }));
          }
        }

        // Send dragStart event to VM
        events.push(new cls.VMDragDropEvent(this.tableStartDragNode.getId(), {
          dndEventType: "dragStart"
        }));
        this.tableStartDragNode.getApplication().event(events);
      },

      /**
       * DragLeave handler
       * @param tableNode
       * @param valueNode
       * @param evt
       */
      onDragLeave: function(tableNode, valueNode, evt) {

      },

      /**
       * DragOver handler
       * @param tableNode
       * @param valueNode
       * @param evt
       */
      onDragOver: function(tableNode, valueNode, evt) {

        if (!this.dragDropInfoNode) {
          return;
        }

        this._showHideDropIndicator(this.dragOverValueNode, false);

        if (this.dragDropInfoNode.attribute("dndAccepted") === 1 && this.firstDragEnterSent) {
          evt.preventDefault();
        }

        var valueListNode = valueNode.getParentNode();
        var tableColumnNode = valueListNode.getParentNode();
        var indexValue = valueListNode.getChildren().indexOf(valueNode);
        var isTreeView = tableColumnNode.getParentNode().getController().getWidget().isTreeView();
        var treeItemNode = null;
        if (isTreeView) {
          var valueNodeElementPositionTop = $(evt.currentTarget).offset().top;
          var mousePositionTop = evt.originalEvent.clientY;

          if (mousePositionTop - valueNodeElementPositionTop > 6) { // if mouse position is not between two tree items
            treeItemNode = tableNode.getChildren("TreeInfo")[0].findNodeWithAttributeValue('TreeItem', 'row', indexValue);
          }
        }

        this._showHideDropIndicator(valueNode, true, treeItemNode);

        if (this.dragOverValueNode !== valueNode || this.dragOverTreeItemNode !== treeItemNode) {

          this.dragOverValueNode = valueNode;
          this.dragOverTreeItemNode = treeItemNode;

          var event = null;
          if (this.tableCurrentDragNode !== tableNode) {

            if (this.tableCurrentDragNode !== null) {
              // Send dragLeave event to VM
              event = new cls.VMDragDropEvent(this.tableCurrentDragNode.getId(), {
                dndEventType: "dragLeave"
              });
              this.tableStartDragNode.getApplication().event(event);
            }

            this.tableCurrentDragNode = tableNode;

            event = new cls.VMDragDropEvent(tableNode.getId(), {
              dndEventType: "dragEnter",
              dndMimeTypes: this.dragDropInfoNode.attribute("dndMimeTypes"),
              dndOperation: "move"
            });
            tableNode.getApplication().event(event);
            this.firstDragEnterSent = true;
          } else {

            if (valueNode === this.valueStartDragNode) {
              return; // don't send drag over event to the node which start the drag
            }

            var tableSize = tableNode.attribute("size");
            if (indexValue >= tableSize && this.dragDropInfoNode.attribute("dndFeedback") === "select") {
              return; // don't send drag over event to a node > tableSize if feedback is select
            }

            var dndOperation = this.dragDropInfoNode.attribute("dndOperation");
            dndOperation = dndOperation === "" ? "move" : dndOperation;

            if (isTreeView === false) {
              event = new cls.VMDragDropEvent(valueNode.getId(), {
                dndEventType: "dragOver",
                dndOperation: dndOperation
              });
            } else {
              event = new cls.VMDragDropEvent(valueNode.getId(), {
                dndEventType: "dragOver",
                dndOperation: dndOperation,
                dndParentIdRef: !!treeItemNode ? treeItemNode.getId() : -1
              });
            }
            this.tableStartDragNode.getApplication().event(event);
          }
        }

      },

      /**
       * DragEnd handler
       */
      onDragEnd: function() {
        var dndOperation = "";
        if (this.dragDropInfoNode) {
          dndOperation = this.dragDropInfoNode.attribute("dndOperation");
        }
        dndOperation = dndOperation === "" ? "move" : dndOperation;

        // Send dragFinished event to VM
        var event = new cls.VMDragDropEvent(this.tableStartDragNode.getId(), {
          dndEventType: "dragFinished",
          dndOperation: dndOperation
        });
        this.tableStartDragNode.getApplication().event(event);

        this._showHideDropIndicator(this.dragOverValueNode, false);

        this.tableCurrentDragNode = null;
        this.tableStartDragNode = null;
        this.valueStartDragNode = null;
        this.dragOverValueNode = null;
        this.firstDragEnterSent = false;
        this.dragOverTreeItemNode = null;
      },

      /**
       * Drop handler
       * @param valueNode
       */
      onDrop: function(valueNode) {

        if (!this.dragDropInfoNode) {
          return;
        }

        this._showHideDropIndicator(valueNode, false);

        // Send drop event to VM
        var event = new cls.VMDragDropEvent(valueNode.getId(), {
          dndEventType: "drop",
          dndBuffer: this.dragDropInfoNode.attribute("dndBuffer")

        });
        valueNode.getApplication().event(event);
      },

      /**
       * Show or hide drop indicator
       * @param {node} valueNode valueNode to find the row
       * @param {boolean} show if true show indicator, else hide it
       * @param {boolean} overTreeItem draw over treeitem indicator
       * @private
       */
      _showHideDropIndicator: function(valueNode, show, overTreeItem) {
        if (!valueNode) {
          return;
        }

        var valueListNode = valueNode.getParentNode();
        var tableNode = valueListNode.getParentNode().getParentNode();
        var indexInValueList = valueListNode.getChildren().indexOf(valueNode);

        // Draw line to visualize where the drop will be done
        var columns = tableNode.getChildren("TableColumn");
        for (var i = 0; i < columns.length; i++) {
          var c = columns[i];
          var valueList = c.getChildren()[1];
          if (!!valueList) {
            var element = valueList.getChildren()[indexInValueList].getController().getWidget().getParentWidget().$();

            element[0]
              .removeClass("dropIndicatorInsert")
              .removeClass("dropIndicatorSelect")
              .removeClass("dropIndicatorInsertAfter");

            if (show && this.dndAccepted && this.firstDragEnterSent) {
              var dndFeedback = this.dragDropInfoNode.attribute("dndFeedback");
              if (!!overTreeItem) {
                element[0].addClass("dropIndicatorSelect");
              } else if (dndFeedback === "insert") {
                element[0].addClass("dropIndicatorInsert");
              } else if (dndFeedback === "select") {
                element[0].addClass("dropIndicatorSelect");
              } else if (dndFeedback === "insert_after") {
                element[0].addClass("dropIndicatorInsertAfter");
              }
            }
          }
        }
      }

    });
    context.InitService.register(context.DndService);
  });
