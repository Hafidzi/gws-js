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

modulum('TableColumnItemWidget', ['WidgetGroupBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Table column widget.
     * @class classes.TableColumnItemWidget
     * @extends classes.WidgetGroupBase
     */
    cls.TableColumnItemWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.TableColumnItemWidget.prototype */
      return {
        __name: "TableColumnItemWidget",

        _leafSymbol: ' ',
        _collapsedSymbol: '\u25ba',
        _expandedSymbol: '\u25bc',
        /**
         * @type Element
         */
        _treeAnchor: null,
        _imageWidget: null,
        /**
         * @constructs {classes.TableColumnItemWidget}
         */
        constructor: function(isTreeItem) {
          $super.constructor.call(this);

          if (isTreeItem) {
            this._treeAnchor = document.createElement("span");
            this._treeAnchor.addClass("gbc_TreeAnchor");
            this._element.prependChild(this._treeAnchor);
            this._treeAnchor.on('click.TableColumnItemWidget', function() {
              this.emit(context.constants.widgetEvents.click);
            }.bind(this));
            this.setLeaf(true);
          }
        },

        _initElement: function() {
          $super._initElement.call(this);
          if (!this._imageWidget) {
            this._imageWidget = cls.WidgetFactory.create("Image");
            this._element.querySelector(".gbc_TableItemImage").prependChild(this._imageWidget.getElement());
          }
          this._imageWidget.setHidden(true);
        },

        /**
         * @inheritDoc
         */
        addChildWidget: function(widget, options) {
          if (this._children.length !== 0) {
            throw "A item only contain a single child";
          }
          $super.addChildWidget.call(this, widget, options);
          // add g_measured class because it's not done by the layout fo the table
          widget.getElement().removeClass("g_measuring").addClass("g_measured");
        },

        /**
         * Enable Dnd
         * @param b
         */
        setDndEnabled: function(b) {
          if (b) {
            this._element.setAttribute("draggable", "true");
            this.$().on("dragstart", this._onDragStart.bind(this));
            this.$().on("dragend", this._onDragEnd.bind(this));
            this.$().on("dragover", this._onDragOver.bind(this));
            this.$().on("drop", this._onDrop.bind(this));
            this.$().on("dragleave", this._onDragLeave.bind(this));

            if (this.getItemIndex() === 0) {
              this.getParentWidget().getAfterLastItemDropZone().on("drop", this._onDropAfterLastItem.bind(this));
              this.getParentWidget().getAfterLastItemDropZone().on("dragover", this._onDragOverAfterLastItem.bind(this));
            }
          } else {
            this._element.removeAttribute("draggable");
            this.$().off("dragstart");
            this.$().off("dragend");
            this.$().off("dragover");
            this.$().off("drop");
            this.$().off("dragleave");

            if (this.getItemIndex() === 0) {
              this.getParentWidget().getAfterLastItemDropZone().off("drop");
              this.getParentWidget().getAfterLastItemDropZone().off("dragover");
            }
          }
        },

        /**
         * @returns {boolean} true if the element is a tree item, false otherwise
         */
        isTreeItem: function() {
          return !!this._treeAnchor;
        },

        /**
         * @param {boolean} leaf true if the item is a leaf item, false otherwise
         */
        setLeaf: function(leaf) {
          if (this.isTreeItem()) {
            if (leaf) {
              this._treeAnchor.textContent = this._leafSymbol;
            } else {
              this._treeAnchor.textContent = this._collapsedSymbol;
            }
          }
        },

        /**
         * @returns {boolean} leaf true if the item is a leaf item, false otherwise
         */
        isLeaf: function() {
          return this.isTreeItem() && this._treeAnchor.textContent === this._leafSymbol;
        },

        /**
         * @param {boolean} expanded true if the item should be expanded, false otherwise
         */
        setExpanded: function(expanded) {
          if (this.isTreeItem() && !this.isLeaf()) {
            if (expanded) {
              this._treeAnchor.textContent = this._expandedSymbol;
            } else {
              this._treeAnchor.textContent = this._collapsedSymbol;
            }
            var qaElement = this.getContainerElement().querySelector("[data-gqa-name]");
            if (qaElement) {
              qaElement.setAttribute('data-gqa-expanded', expanded.toString());
            }
          }
        },

        /**
         * @returns {boolean} true if the item is expanded, false otherwise
         */
        isExpanded: function() {
          return this.isTreeItem() && this._treeAnchor.textContent === this._expandedSymbol;
        },

        /**
         * @param {number} depth item depth
         */
        setDepth: function(depth) {
          this.setStyle({
            'padding-left': depth + 'em'
          });
        },

        /**
         * @returns {number} item depth
         */
        getDepth: function() {
          var depth = this.getStyle('padding-left');
          if (depth) {
            return parseInt(depth);
          }
          return 0;
        },

        /**
         * @param {boolean} current true if the item is part of the current line, false otherwise
         */
        setCurrent: function(current) {
          this._element.toggleClass("currentRow", !!current);
        },

        /**
         * @param {string} image path
         */
        setImage: function(path) {
          this._imageWidget.setHidden(true);
          if (path && path !== "") {
            this._imageWidget.setSrc(path);
            this._imageWidget.setHidden(false);
          }
        },

        /**
         * @returns {boolean} true if the item is part of the current line, false otherwise
         */
        isCurrent: function() {
          return this._element.hasClass("currentRow");
        },

        /**
         * @param {boolean} selected true if the item should be selected, false otherwise
         */
        setSelected: function(selected) {
          this._element.toggleClass("selectedRow", !!selected);
        },

        /**
         * @returns {boolean} true if the row item is selected, false otherwise
         */
        isSelected: function() {
          return this._element.hasClass("selectedRow");
        },

        /**
         * Returns index of the item in the parent column
         * @returns {number} index of the item in the column
         */
        getItemIndex: function() {
          var parent = this.getParentWidget();
          if (!!parent) {
            return parent.getChildren().indexOf(this);
          }
          return -1;
        },

        /**
         * Handle dragStart event
         * @param evt
         * @private
         */
        _onDragStart: function(evt) {
          if (window.browserInfo.isFirefox) { // Firefox 1.0+
            try {
              evt.originalEvent.dataTransfer.setData('text/plain', ''); // for Firefox compatibility
            } catch (ex) {
              console.error("evt.originalEvent.dataTransfer.setData('text/plain', ''); not supported");
            }
          }
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDragStart, this.getItemIndex(), evt);
        },

        /**
         * Handle dragEnd event
         * @param evt
         * @private
         */
        _onDragEnd: function(evt) {
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDragEnd);
        },

        /**
         * Handle dragOver event
         * @param evt
         * @private
         */
        _onDragOver: function(evt) {
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDragOver, this.getItemIndex(), evt);
        },

        /**
         * Handle dragOver event
         * @param evt
         * @private
         */
        _onDragOverAfterLastItem: function(evt) {
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDragOver, tableColumn.getParentWidget().getVisibleRows(), evt);
        },

        /**
         * Handle dragLeave event
         * @param evt
         * @private
         */
        _onDragLeave: function(evt) {
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDragLeave, this.getItemIndex(), evt);
        },
        /**
         * Handle drop event
         * @param evt
         * @private
         */
        _onDrop: function(evt) {
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDrop, this.getItemIndex());
        },
        /**
         * Handle drop event
         * @param evt
         * @private
         */
        _onDropAfterLastItem: function(evt) {
          var tableColumn = this.getParentWidget();
          tableColumn.emit(gbc.constants.widgetEvents.tableDrop, tableColumn.getParentWidget().getVisibleRows());
        }
      };
    });
    cls.WidgetFactory.register('TableColumnItem', cls.TableColumnItemWidget);
  });
