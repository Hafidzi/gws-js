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

modulum('IsPasswordVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.IsPasswordVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.IsPasswordVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.IsPasswordVMBehavior.prototype */
      return {
        __name: "IsPasswordVMBehavior",
        /** @type {classes.NodeBase} */
        _isPasswordNode: null,
        /**
         * @constructs {classes.IsPasswordVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} isPasswordAttributeNode
         */
        constructor: function(controller, isPasswordAttributeNode, isPasswordAttributeValueNode) {
          $super.constructor.call(this, controller);
          this._isPasswordNode = isPasswordAttributeNode;
          this._isPasswordValueNode = isPasswordAttributeValueNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setIsPassword) {
            var isPasswordNode = this._isPasswordValueNode || this._isPasswordNode;
            var isPassword = isPasswordNode.attribute('isPassword');
            widget.setIsPassword(isPassword);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._isPasswordNode,
            attribute: 'isPassword'
          }, {
            node: this._isPasswordValueNode,
            attribute: 'isPassword',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._isPasswordNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
