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

modulum('BackgroundColorVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.BackgroundColorVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.BackgroundColorVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.BackgroundColorVMBehavior.prototype */
      return {
        __name: "BackgroundColorVMBehavior",
        /** @type {classes.NodeBase} */
        _colorNode: null,
        /** @type {classes.NodeBase} */
        _reverseNode: null,
        /** @type {boolean} */
        styleBased: true,
        /**
         * @constructs {classes.BackgroundColorVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} colorAttributeNode
         * @param {classes.NodeBase=} reverseAttributeNode
         */
        constructor: function(controller, colorAttributeNode, reverseAttributeNode, colorAttributeValueNode,
          reverseAttributeValueNode) {
          $super.constructor.call(this, controller);
          this._colorNode = colorAttributeNode;
          this._reverseNode = reverseAttributeNode;
          this._colorValueNode = colorAttributeValueNode;
          this._reverseValueNode = reverseAttributeValueNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setBackgroundColor) {
            var colorNode = this._colorValueNode || this._colorNode;
            var reverseNode = this._reverseValueNode || this._reverseNode;

            var isReverse = false;
            if (this._reverseNode) {
              isReverse = reverseNode.attribute('reverse') === 1;
            }
            var color = null;
            if (isReverse && colorNode && (color = colorNode.attribute('color'))) {
              widget.setBackgroundColor(this._resolveThemedColor(color));
            } else {
              color = this._controller.getAnchorNode().getStyleAttribute('backgroundColor');
              if (color) {
                widget.setBackgroundColor(this._resolveThemedColor(color));
              } else {
                widget.setBackgroundColor(null);
              }
            }
          } else {
            this._failed("Could not apply behavior");
          }

        },
        _getWatchedAttributes: function() {
          return [{
            node: this._colorNode,
            attribute: 'color'
          }, {
            node: this._reverseNode,
            attribute: 'reverse'
          }, {
            node: this._colorValueNode,
            attribute: 'color',
            optional: true
          }, {
            node: this._reverseValueNode,
            attribute: 'reverse',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._colorNode = null;
          this._reverseNode = null;
          $super.destroy.call(this);
        },

        _resolveThemedColor: function(color) {
          var themedColor = gbc.constants.theme["gbc-genero-" + color];
          if (!!themedColor) {
            return themedColor;
          } else {
            return color;
          }
        }
      };
    });
  });
