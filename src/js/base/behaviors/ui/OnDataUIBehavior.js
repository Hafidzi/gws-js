/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('OnDataUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnDataUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnDataUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnDataUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnDataUIBehavior",

        /** @type {classes.NodeBase} */
        _node: null,

        /**
         * @constructs {classes.OnDataUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} node
         */
        constructor: function(controller, node) {
          $super.constructor.call(this, controller);
          this._node = node;

          controller.getWidget().on(cls.WebComponentWidget.dataEvent, this._onData.bind(this));
        },

        /**
         * On data widget event
         * @private
         */
        _onData: function(event, widget, data) {
          //todo send config event
          var VMevent = new cls.VMConfigureEvent(this._node.getId(), {
            value: data
          });
          this._node.getApplication().event(VMevent);
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._node = null;
          $super.destroy.call(this);
        }
      };
    });
  });
