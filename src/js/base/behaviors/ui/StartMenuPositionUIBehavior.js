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

modulum('StartMenuPositionUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the switch of widget by controller
     * @class classes.StartMenuPositionUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.StartMenuPositionUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.StartMenuPositionUIBehavior.prototype */
      return {
        __name: "StartMenuPositionUIBehavior",
        /** @type {classes.NodeBase} */
        _userInterfaceNode: null,
        /** @type {HandleRegistration} */
        _startMenuPositionHandle: null,

        /**
         * @constructs {classes.StartMenuPositionUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} startMenuNode
         * @param {classes.NodeBase=} userInterfaceNode
         */
        constructor: function(controller, userInterfaceNode) {
          $super.constructor.call(this, controller);
          this._userInterfaceNode = userInterfaceNode;
        },

        _attachWidget: function() {
          var uiWidget = this._controller.getWidget();
          this._startMenuPositionHandle = uiWidget.on(cls.UserInterfaceWidget.startMenuPosition, function(event, sender,
            windowIdRef) {
            var startMenu = this._userInterfaceNode.getFirstChild('StartMenu');
            if (startMenu) {
              var windowNode = this._userInterfaceNode.getApplication().getNode(windowIdRef);
              if (windowNode) {
                var kind = windowNode.getStyleAttribute('startMenuPosition');
                startMenu.getController().changeWidgetKind(kind);
              }
            }
          }.bind(this));
        },

        _detachWidget: function() {
          if (this._startMenuPositionHandle) {
            this._startMenuPositionHandle();
            this._startMenuPositionHandle = null;
          }
        },

        destroy: function() {
          this._userInterfaceNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
