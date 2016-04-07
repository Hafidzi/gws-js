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

modulum('WindowCloseUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowCloseUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.WindowCloseUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.WindowCloseUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "WindowCloseUIBehavior",

        /** @type {classes.NodeBase} */
        _windowNode: null,
        /** @type {HandleRegistration} */
        _clickHandle: null,

        /**
         * @constructs {classes.WindowCloseUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} windowNode
         */
        constructor: function(controller, windowNode) {
          $super.constructor.call(this, controller);
          this._windowNode = windowNode;
        },

        _attachWidget: function() {
          this._clickHandle = this._controller.getWidget().on(gbc.constants.widgetEvents.close, this._windowClose.bind(this));
        },

        _detachWidget: function() {
          if (this._clickHandle) {
            this._clickHandle();
            this._clickHandle = null;
          }
        },
        _windowClose: function() {
          var dialog = this._windowNode.getActiveDialog();
          if (dialog) {
            var closeActionNodes = dialog.getChildrenWithAttribute(null, "name", "close");
            if (closeActionNodes && closeActionNodes.length > 0) {
              var closeActionNode = closeActionNodes[0];
              if (closeActionNode.attribute('active')) {
                this._controller.getAnchorNode().getApplication().action.execute(closeActionNode.getId());
              }
            }
          }
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._windowNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
