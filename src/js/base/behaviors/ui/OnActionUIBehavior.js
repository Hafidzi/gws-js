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

modulum('OnActionUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnActionUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnActionUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnActionUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnActionUIBehavior",

        /** @type {classes.NodeBase} */
        _actionNode: null,
        /** @type {classes.NodeBase} */
        _activeAttributeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveAttributeNode: null,
        /** @type {HandleRegistration} */
        _actionHandle: null,

        /**
         * @constructs {classes.OnActionUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} actionNode
         * @param {classes.NodeBase=} activeAttributeNode
         * @param {classes.NodeBase=} actionActiveAttributeNode
         */
        constructor: function(controller, actionNode) {
          $super.constructor.call(this, controller);
          this._actionNode = actionNode;
        },

        _attachWidget: function() {
          this._actionHandle = this._controller.getWidget().on(cls.WebComponentWidget.actionEvent, this._onAction.bind(this));
        },

        _detachWidget: function() {
          if (this._actionHandle) {
            this._actionHandle();
            this._actionHandle = null;
          }
        },
        /**
         * Creates an action event and sends it to the VM
         */
        _onAction: function(event, src, actionName) {
          this._controller.getAnchorNode().getApplication().action.executeByName(actionName);
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._actionNode = null;
          this._actionActiveAttributeNode = null;
          this._activeAttributeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
