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

modulum('TextActionVMBehavior', ['BehaviorBase'],
  /**
   * Manage "Text" attribute only for Action widgets
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextActionVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextActionVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextActionVMBehavior.prototype */
      return {
        __name: "TextActionVMBehavior",
        /** @type {classes.NodeBase} */
        _textNode: null,
        /** @type {classes.NodeBase} */
        _nameNode: null,
        /**
         * @constructs {classes.TextActionVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} textAttributeNode
         * @param {classes.NodeBase=} nameAttributeNode
         */
        constructor: function(controller, textAttributeNode, nameAttributeNode) {
          $super.constructor.call(this, controller);
          this._textNode = textAttributeNode;
          this._nameNode = nameAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setText) {
            var text = this._textNode.attribute('text');
            var image = this._textNode.attribute('image');
            if (!text && text !== 0 && text !== false && !image) { // for actions if there is no text we use name attribute
              text = this._textNode.attribute('name');
            }
            //remove first occurence of & symbol (quick shortcut not available in webclient)
            text = text.toString().replace(/&/g, "");
            widget.setText(text);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._nameNode,
            attribute: 'name'
          }, {
            node: this._textNode,
            attribute: 'text'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._textNode = null;
          this._nameNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
