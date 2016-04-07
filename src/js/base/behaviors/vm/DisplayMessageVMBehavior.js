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

modulum('DisplayMessageVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DisplayMessageVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.DisplayMessageVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DisplayMessageVMBehavior.prototype */
      return {
        __name: "DisplayMessageVMBehavior",
        /** @type {classes.NodeBase} */
        _messageNode: null,
        /** @type {HandleRegistration} */
        _countHandle: null,
        /** @type {boolean} */
        _isApplying: false,

        /**
         * @constructs {classes.DisplayMessageVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} messageNode
         */
        constructor: function(controller, messageNode) {
          $super.constructor.call(this, controller);
          this._messageNode = messageNode;
        },

        /**
         * Re-applies all controller's behaviors as all messages share the same widget
         */
        _apply: function() {
          if (!this._isApplying) {
            this._isApplying = true;
            this._controller.applyBehaviors(true);
            this._controller.getWidget().setHidden(false);
            this._isApplying = false;
          }
        },

        /**
         * @inheritDoc
         */
        _getWatchedAttributes: function() {
          return [{
            node: this._messageNode,
            attribute: 'count'
          }];
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._messageNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
