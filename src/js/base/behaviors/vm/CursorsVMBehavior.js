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

modulum('CursorsVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.CursorsVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.CursorsVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.CursorsVMBehavior.prototype */
      return {
        __name: "CursorsVMBehavior",
        /** @type {classes.NodeBase} */
        _containerNode: null,
        /** @type {classes.NodeBase} */
        _focusNode: null,

        /**
         * @constructs {classes.CursorsVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} cursorAttributeNode
         * @param {classes.NodeBase} focusAttributeNode
         */
        constructor: function(controller, containerNode, focusAttributeNode) {
          $super.constructor.call(this, controller);
          this._containerNode = containerNode;
          this._focusNode = focusAttributeNode || controller._application.uiNode();
        },

        _getMainArrayContainer: function() {
          switch (this._containerNode.getTag()) {
            case 'TableColumn':
              return this._containerNode.getParentNode();
            case 'Matrix':
              return this._containerNode;
            default:
              return null;
          }
        },

        /**
         *
         */
        _apply: function() {
          var widget = null;
          var focusedNodeId = this._focusNode.attribute('focus');

          var arrayContainer = this._getMainArrayContainer();
          if (arrayContainer) {
            // Table or Matrix
            if (focusedNodeId === arrayContainer._id) {
              var currentRow = arrayContainer.attribute("currentRow");
              var offset = arrayContainer.attribute("offset");
              var anchorRowIndex = this._controller.getAnchorNode().getIndex();
              if (anchorRowIndex === currentRow - offset) {
                if (arrayContainer.getTag() === "Table") { // consider also currentColumn for table
                  var currentColumn = arrayContainer.attribute("currentColumn");
                  var anchorColumnIndex = this._containerNode.getIndex();
                  if (anchorColumnIndex === currentColumn) {
                    widget = this._controller.getWidget();
                  }
                } else {
                  widget = this._controller.getWidget();
                }
              }
            }
          } else {
            // FormField
            if (focusedNodeId === this._controller.getAnchorNode().getId()) {
              widget = this._controller.getWidget();
            }
          }

          if (widget && widget.setCursors) {
            var cursor = this._containerNode.attribute('cursor');
            var cursor2 = this._containerNode.attribute('cursor2');
            window.requestAnimationFrame(widget.setCursors.bind(widget, cursor, cursor2));
          }
        },

        _getWatchedAttributes: function() {
          var a = [{
            node: this._containerNode,
            attribute: 'cursor'
          }, {
            node: this._containerNode,
            attribute: 'cursor2'
          }];

          var arrayContainer = this._getMainArrayContainer();
          if (arrayContainer) {
            a = a.concat([{
              node: arrayContainer,
              attribute: 'currentRow'
            }, {
              node: arrayContainer,
              attribute: 'currentColumn'
            }, {
              node: arrayContainer,
              attribute: 'dialogType'
            }, {
              node: this._focusNode,
              attribute: 'focus'
            }]);
          }
          return a;
        },

        /**
         *
         */
        destroy: function() {
          this._containerNode = null;
          this._focusNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
