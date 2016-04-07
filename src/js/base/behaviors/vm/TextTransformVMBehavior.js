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

modulum('TextTransformVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextTransformVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextTransformVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextTransformVMBehavior.prototype */
      return {
        __name: "TextTransformVMBehavior",
        /** @type {classes.NodeBase} */
        _shiftNode: null,
        /**
         * @constructs {classes.TextTransformVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} shiftAttributeNode
         */
        constructor: function(controller, shiftAttributeNode) {
          $super.constructor.call(this, controller);
          this._shiftNode = shiftAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setTextTransform) {
            var shift = this._shiftNode.attribute('shift');
            switch (shift) {
              case 'up':
                widget.setTextTransform('uppercase');
                break;
              case 'down':
                widget.setTextTransform('lowercase');
                break;
              default:
                widget.setTextTransform(null);
                break;
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._shiftNode,
            attribute: 'shift'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._shiftNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
