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

modulum('OnClickStartMenuCommandUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnClickStartMenuCommandUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnClickStartMenuCommandUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnClickStartMenuCommandUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnClickStartMenuCommandUIBehavior",

        /** @type {classes.NodeBase} */
        _startMenuCommandNode: null,
        /** @type {HandleRegistration} */
        _clickHandle: null,

        /**
         * @constructs {classes.OnClickStartMenuCommandUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} startMenuCommandNode
         */
        constructor: function(controller, startMenuCommandNode) {
          $super.constructor.call(this, controller);
          this._startMenuCommandNode = startMenuCommandNode;
        },

        _attachWidget: function() {
          var widget = this._controller.getWidget();
          if (widget) {
            this._clickHandle = widget.on(gbc.constants.widgetEvents.click, this._onClick.bind(this));
          }
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
          var disabled = this._startMenuCommandNode.attribute('disabled');
          if (!disabled) {
            this._controller.getAnchorNode().getApplication().action.execute(this._startMenuCommandNode.getId());
          }
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._startMenuCommandNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
