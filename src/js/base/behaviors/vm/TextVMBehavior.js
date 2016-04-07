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

modulum('TextVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextVMBehavior.prototype */
      return {
        __name: "TextVMBehavior",
        /** @type {classes.NodeBase} */
        _textNode: null,
        /**
         * @constructs {classes.TextVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} textAttributeNode
         */
        constructor: function(controller, textAttributeNode) {
          $super.constructor.call(this, controller);
          this._textNode = textAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setText) {
            var text = this._textNode.attribute('text');
            widget.setText(text);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._textNode,
            attribute: 'text'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._textNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
