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

modulum('HiddenVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's visibility
     * @class classes.HiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.HiddenVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.HiddenVMBehavior.prototype */
      return {
        __name: "HiddenVMBehavior",
        /** @type {classes.NodeBase} */
        _hiddenNode: null,
        /** @type {classes.NodeBase} */
        _defaultViewNode: null,
        /**
         * @constructs {classes.HiddenVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} hiddenAttributeNode
         * @param {classes.NodeBase=} defaultViewAttributeNode
         */
        constructor: function(controller, hiddenAttributeNode, defaultViewAttributeNode) {
          $super.constructor.call(this, controller);
          this._hiddenNode = hiddenAttributeNode;
          this._defaultViewNode = defaultViewAttributeNode;
        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var widget = this._controller.getWidget();

          // Handle visibility in case of Matrix
          var isMatrix = this._hiddenNode.getTag() === "Matrix";
          if (isMatrix) {
            var valueList = this._hiddenNode._children[1];
            var pageSize = this._hiddenNode.attribute('pageSize');
            // Hide if Valuelist is bigger than pageSize
            if (valueList._children.indexOf(this._controller.getAnchorNode()) >= pageSize) {
              if (widget && widget.setHidden) {
                widget.setHidden(true);
                return;
              }
            }
          }

          if (widget && widget.setHidden) {
            var hidden = this._hiddenNode.attribute('hidden');
            var visible = hidden === context.constants.visibility.visible;
            if (visible && !!this._defaultViewNode) {
              var defaultView = this._defaultViewNode.attribute('defaultView');
              visible = defaultView === context.constants.viewType.showAlways;
            }
            var contextMenu = this._hiddenNode.attribute('contextMenu');
            var parentStyle = this._hiddenNode.getParentNode().attribute('style');
            if (parentStyle === "popup" && (contextMenu === "auto" || contextMenu === "yes")) { // context menu display
              visible = true;
            }
            widget.setHidden(!visible);

            var isTableColumn = this._hiddenNode.getTag() === "TableColumn";
            if (isTableColumn && widget.setUnhidable) {
              widget.setUnhidable(hidden === context.constants.visibility.hiddenByProgram);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._hiddenNode,
            attribute: 'hidden'
          }, {
            node: this._defaultViewNode,
            attribute: 'defaultView',
            optional: true
          }, {
            node: this._hiddenNode,
            attribute: 'pageSize',
            optional: true
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._hiddenNode = null;
          this._defaultViewNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
