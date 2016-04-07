/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('TreeItemKeyExpandUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TreeItemKeyExpandUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.TreeItemKeyExpandUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.TreeItemKeyExpandUIBehavior.prototype */
      return {
        __name: "TreeItemKeyExpandUIBehavior",
        /** @type {classes.NodeBase} */
        _treeViewColumnNode: null,
        /** @type {HandleRegistration} */
        _rightHandle: null,
        /** @type {HandleRegistration} */
        _leftHandle: null,

        /**
         * @constructs {classes.TreeItemKeyExpandUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} treeViewColumnNode
         */
        constructor: function(controller, treeViewColumnNode) {
          $super.constructor.call(this, controller);
          this._treeViewColumnNode = treeViewColumnNode;
        },

        /**
         *
         * @param expand
         * @private
         */
        _expandOrCollapse: function(expand) {
          var tableNode = this._treeViewColumnNode.getParentNode();
          var offset = tableNode.attribute('offset');
          var currentRow = tableNode.attribute('currentRow');
          var treeItemNode = tableNode.findNodeWithAttributeValue("TreeItem", "row", currentRow - offset);
          if (treeItemNode) {
            var vmEvent = null;
            if (expand && (treeItemNode.attribute("expanded") === 1)) {
              vmEvent = new cls.VMConfigureEvent(tableNode.getId(), {
                currentRow: treeItemNode.attribute("row") + offset + 1
              });
            } else if (!expand && (treeItemNode.attribute("expanded") === 0)) {
              var parent = treeItemNode.getParentNode();
              if (parent._tag === "TreeItem") {
                vmEvent = new cls.VMConfigureEvent(tableNode.getId(), {
                  currentRow: treeItemNode.attribute("row") - (parent.getChildren().indexOf(treeItemNode) + 1) + offset
                });
              }
            } else if (treeItemNode.attribute("hasChildren")) {
              vmEvent = new cls.VMConfigureEvent(treeItemNode.getId(), {
                expanded: expand
              });
            }
            if (vmEvent) {
              treeItemNode.getApplication().event(vmEvent);
            }
          }
        },

        /**
         *
         * @private
         */
        _onKeyRight: function() {
          this._expandOrCollapse(1);
        },

        /**
         *
         * @private
         */
        _onKeyLeft: function() {
          this._expandOrCollapse(0);
        },

        /**
         *
         * @protected
         */
        _attachWidget: function() {
          var tableWidget = this._controller.getAnchorNode().getParentNode().getController().getWidget();
          this._rightHandle = tableWidget.on(gbc.constants.widgetEvents.keyRight, this._onKeyRight.bind(this));
          this._leftHandle = tableWidget.on(gbc.constants.widgetEvents.keyLeft, this._onKeyLeft.bind(this));
        },
        /**
         *
         * @protected
         */
        _detachWidget: function() {
          if (this._rightHandle) {
            this._rightHandle();
            this._rightHandle = null;
          }
          if (this._leftHandle) {
            this._leftHandle();
            this._leftHandle = null;
          }
        },
        /**
         *
         */
        destroy: function() {
          this._treeViewColumnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
