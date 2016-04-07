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

modulum('BackgroundColorMessageVMBehavior', ['BackgroundColorVMBehavior'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.BackgroundColorMessageVMBehavior
     * @extends classes.BackgroundColorVMBehavior
     */
    cls.BackgroundColorMessageVMBehavior = context.oo.Class(cls.BackgroundColorVMBehavior, function($super) {
      /** @lends classes.BackgroundColorMessageVMBehavior.prototype */
      return {
        __name: "BackgroundColorMessageVMBehavior",
        /** @type {classes.NodeBase} */
        _typeNode: null,
        /**
         * @constructs {classes.BackgroundColorMessageVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} colorAttributeNode
         * @param {classes.NodeBase=} reverseAttributeNode
         * @param {classes.NodeBase=} typeAttributeNode
         */
        constructor: function(controller, colorAttributeNode, reverseAttributeNode, typeAttributeNode) {
          $super.constructor.call(this, controller, colorAttributeNode, reverseAttributeNode);
          this._typeNode = typeAttributeNode;
        },

        /**
         * Applies the background color only if it has been defined by the VM, use default value otherwise.
         */
        _apply: function() {
          if (this._colorNode.isAttributesSetByVM('color')) {
            $super._apply.call(this);
          } else {
            var error = this._typeNode.attribute('type') === 'error';
            var widget = this._controller.getWidget();
            if (error) {
              widget.setBackgroundColor(gbc.constants.theme["gbc-error-color"]);
            } else {
              widget.setBackgroundColor("");
            }
          }
        },

        /**
         * @inheritDoc
         */
        _getWatchedAttributes: function() {
          var watched = $super._getWatchedAttributes.call(this);
          watched.push({
            node: this._typeNode,
            attribute: 'type'
          });
          return watched;
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._typeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
