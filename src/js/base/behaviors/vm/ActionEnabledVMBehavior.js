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

modulum('ActionEnabledVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's Menu
     * @class classes.HiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ActionEnabledVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ActionEnabledVMBehavior.prototype */
      return {
        __name: "ActionEnabledVMBehavior",
        /** @type {classes.NodeBase} */
        _menuActionNode: null,
        /** @type {classes.NodeBase} */
        _menuNode: null,

        /**
         * @constructs {classes.ActionEnabledVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         */
        constructor: function(controller, activeAttributeNode, parentNode) {
          $super.constructor.call(this, controller);
          this._menuActionNode = activeAttributeNode;
          this._menuNode = parentNode;
        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var activeValue = false;
          var parentActiveValue = false;
          if (!!this._menuActionNode) {
            activeValue = !!this._menuActionNode.attribute('active');
          }
          if (!!this._menuNode) {
            parentActiveValue = !!this._menuNode.attribute('active');
          }

          if (this._menuActionNode) {
            // enable/disable accelerators
            var appService = this._menuActionNode.getApplication().getActionApplicationService();
            if (activeValue && parentActiveValue) {
              appService.registerAction(this._menuActionNode);
            } else {
              appService.destroyAction(this._menuActionNode);
            }
          }

        },
        _getWatchedAttributes: function() {
          return [{
            node: this._menuActionNode,
            attribute: 'active'
          }, {
            node: this._menuNode,
            attribute: 'active'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._menuActionNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
