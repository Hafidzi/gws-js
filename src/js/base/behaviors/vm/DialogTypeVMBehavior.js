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

modulum('DialogTypeVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the switch of widget by controller
     * @class classes.DialogTypeVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.DialogTypeVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DialogTypeVMBehavior.prototype */
      return {
        __name: "DialogTypeVMBehavior",
        /** @type {classes.NodeBase} */
        _dialogTypeNode: null,
        /**
         * @constructs {classes.DialogTypeVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} dialogTypeAttributeNode
         */
        constructor: function(controller, dialogTypeAttributeNode) {
          $super.constructor.call(this, controller);
          this._dialogTypeNode = dialogTypeAttributeNode;
        },
        _apply: function() {
          var controller = this._controller;
          if (!!controller && controller.changeWidgetKind) {
            var dialogType = this._dialogTypeNode.attribute('dialogType');
            controller.changeWidgetKind(dialogType);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._dialogTypeNode,
            attribute: 'dialogType'
          }];
        },
        destroy: function() {
          this._dialogTypeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
