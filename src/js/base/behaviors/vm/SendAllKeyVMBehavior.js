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

modulum('SendAllKeyVMBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.SendAllKeyVMBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.SendAllKeyVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.SendAllKeyVMBehavior.prototype */
      return {
        /** @type {string} */
        __name: "SendAllKeyVMBehavior",
        /** @type {classes.NodeBase} */
        _containerNode: null,
        _userInterfaceNode: null,
        _ui: null,

        /**
         * @constructs {classes.SendAllKeyVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} containerNode
         */
        constructor: function(controller, containerNode) {
          $super.constructor.call(this, controller);
          this._containerNode = containerNode;
          this._userInterfaceNode = this._containerNode.getApplication().getNode(0);
          //this._ui = context.SessionService.getCurrent().getCurrentApplication().getUI().getWidget().getElement();

          var applicationWidget = context.SessionService.getCurrent().getCurrentApplication().getUI().getWidget();
          applicationWidget.on(context.constants.widgetEvents.activate, this._apply.bind(this));
          applicationWidget.on(context.constants.widgetEvents.disable, this._detachWidget.bind(this));
        },

        _apply: function() {
          var focusId = this._userInterfaceNode.attribute('focus');
          if (focusId === this._containerNode.getId() || this._containerNode.getFirstChildWithId(focusId)) {
            context.keyboard.fireAll(true);
          } else {
            context.keyboard.fireAll(false);
            //context.keyboard(this._ui).stopToSendAllEvents();
          }
        },

        _detachWidget: function() {
          context.keyboard.fireAll(false);
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._userInterfaceNode,
            attribute: 'focus'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          context.keyboard.fireAll(false);
          $super.destroy.call(this);
        }
      };
    });
  });
