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

modulum('TextDecorationVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextDecorationVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextDecorationVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextDecorationVMBehavior.prototype */
      return {
        __name: "TextDecorationVMBehavior",
        /** @type {classes.NodeBase} */
        _underlineNode: null,
        /** @type {boolean} */
        styleBased: true,
        /**
         * @constructs {classes.TextDecorationVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} underlineAttributeNode
         */
        constructor: function(controller, underlineAttributeNode, underlineAttributeValueNode) {
          $super.constructor.call(this, controller);
          this._underlineNode = underlineAttributeNode;
          this._underlineValueNode = underlineAttributeValueNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setTextDecoration) {
            var underlineNode = this._underlineValueNode || this._underlineNode;
            if (underlineNode && underlineNode.isAttributesSetByVM('underline')) {
              var underline = underlineNode.attribute('underline') === 1;
              widget.setTextDecoration(underline ? "underline" : null);
            } else {
              var textDeco = this._controller.getAnchorNode().getStyleAttribute('textDecoration');
              if (textDeco) {
                widget.setTextDecoration(textDeco);
              }
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._underlineNode,
            attribute: 'underline'
          }, {
            node: this._underlineValueNode,
            attribute: 'underline',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._underlineNode = null;
          this._underlineValueNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
