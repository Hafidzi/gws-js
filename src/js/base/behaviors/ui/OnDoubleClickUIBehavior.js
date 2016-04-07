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

modulum('OnDoubleClickUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnDoubleClickUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnDoubleClickUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnDoubleClickUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnDoubleClickUIBehavior",

        /** @type {classes.NodeBase} */
        _actionNode: null,
        /** @type {classes.NodeBase} */
        _activeAttributeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveAttributeNode: null,
        /** @type {HandleRegistration} */
        _doubleClickHandle: null,

        /**
         * @constructs {classes.OnDoubleClickUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} actionNode
         * @param {classes.NodeBase=} activeAttributeNode
         * @param {classes.NodeBase=} actionActiveAttributeNode
         */
        constructor: function(controller, actionNode, actionActiveAttributeNode, activeAttributeNode) {
          $super.constructor.call(this, controller);
          this._actionNode = actionNode;
          this._actionActiveAttributeNode = actionActiveAttributeNode;
          this._activeAttributeNode = activeAttributeNode;
        },

        _attachWidget: function() {
          this._doubleClickHandle = this._controller.getWidget().on(gbc.constants.widgetEvents.doubleClick, this._onDoubleClick.bind(
            this));
        },

        _detachWidget: function() {
          if (this._doubleClickHandle) {
            this._doubleClickHandle();
            this._doubleClickHandle = null;
          }
        },
        /**
         * Creates an action event and sends it to the VM
         */
        _onDoubleClick: function() {
          var active = true;
          if (this._actionActiveAttributeNode) {
            active = this._actionActiveAttributeNode.attribute('actionActive');
          }
          if (active && this._activeAttributeNode) {
            active = this._activeAttributeNode.attribute('active');
          }
          if (active) {
            this._controller.getAnchorNode().getApplication().action.execute(this._actionNode.getId());
          }
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
