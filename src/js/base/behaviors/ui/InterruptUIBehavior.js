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

modulum('InterruptUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.InterruptUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.InterruptUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.InterruptUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "InterruptUIBehavior",

        /** @type {classes.NodeBase} */
        _actionNode: null,
        /** @type {classes.NodeBase} */
        _activeAttributeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveAttributeNode: null,
        /** @type {HandleRegistration} */
        _actionHandle: null,

        /**
         * @constructs {classes.InterruptUIBehavior}
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
          var widget = this._controller.getWidget();
          this._actionHandle = widget.on(gbc.constants.widgetEvents.click, this._onAction.bind(this));
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
          if (this._actionNode.attribute('name') === "interrupt") {
            this._controller.getAnchorNode().getApplication().interrupt();
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
