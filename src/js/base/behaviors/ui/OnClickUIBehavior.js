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

modulum('OnClickUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnClickUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnClickUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnClickUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnClickUIBehavior",

        /** @type {classes.NodeBase} */
        _actionNode: null,
        /** @type {classes.NodeBase} */
        _activeAttributeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveAttributeNode: null,
        /** @type {classes.NodeBase} */
        _runtimeStatusNode: null,

        /** @type {HandleRegistration} */
        _clickHandle: null,

        /**
         * @constructs {classes.OnClickUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} actionNode
         * @param {classes.NodeBase=} activeAttributeNode
         * @param {classes.NodeBase=} actionActiveAttributeNode
         * @param {classes.NodeBase} runtimeStatusNode
         */
        constructor: function(controller, actionNode, actionActiveAttributeNode, activeAttributeNode, runtimeStatusNode) {
          $super.constructor.call(this, controller);
          this._actionNode = actionNode;
          this._actionActiveAttributeNode = actionActiveAttributeNode;
          this._activeAttributeNode = activeAttributeNode;
          this._runtimeStatusNode = runtimeStatusNode;
        },

        _attachWidget: function() {
          this._clickHandle = this._controller.getWidget().on(gbc.constants.widgetEvents.click, this._onClick.bind(this));
        },

        _detachWidget: function() {
          if (this._clickHandle) {
            this._clickHandle();
            this._clickHandle = null;
          }
        },
        /**
         * Creates an action event and sends it to the VM
         */
        _onClick: function() {
          var active = true;
          var isProcessing = this._runtimeStatusNode.attribute("runtimeStatus") === "processing";
          if (!isProcessing) {
            if (this._actionActiveAttributeNode) {
              active = this._actionActiveAttributeNode.attribute('actionActive');
            }
            if (active && this._activeAttributeNode) {
              active = this._activeAttributeNode.attribute('active');
            }
            if (active) {
              this._controller.getAnchorNode().getApplication().action.execute(this._actionNode.getId());
            }
          }
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._actionNode = null;
          this._actionActiveAttributeNode = null;
          this._runtimeStatusNode = null;
          this._activeAttributeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
