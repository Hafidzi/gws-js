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

modulum('TextLabelVMBehavior', ['BehaviorBase'],
  /**
   * Manage "Text" attribute only for Label widgets
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextLabelVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextLabelVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextLabelVMBehavior.prototype */
      return {
        __name: "TextLabelVMBehavior",
        /** @type {classes.NodeBase} */
        _textNode: null,
        /**
         * @constructs {classes.TextLabelVMBehavior}
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
          if (widget && widget.setValue) { // for label the function to change text is setValue
            var text = this._textNode.attribute('text');
            widget.setValue(text);
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
