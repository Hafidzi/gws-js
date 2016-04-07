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

modulum('WindowResizedSpecialAction', ['ActionApplicationService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowResizedSpecialAction
     */
    cls.WindowResizedSpecialAction = context.oo.Class(function() {
      /** @lends classes.WindowResizedSpecialAction.prototype */
      return {
        __name: "WindowResizedSpecialAction",
        /** @type {classes.ActionApplicationService} */
        _actionService: null,
        _listener: null,
        constructor: function(actionService) {
          this._actionService = actionService;
          this._listener = this._onResized.debounce().bind(this);
          window.addEventListener("resize", this._listener);
        },

        destroy: function() {
          window.removeEventListener("resize", this._listener);
          this._actionService = null;
        },
        _onResized: function() {
          if (this._actionService && this._actionService.hasAction("windowresized")) {
            this._actionService.executeByName("windowresized");
          }
        }
      };
    });
    cls.ActionApplicationService.registerSpecialAction("windowresized", cls.WindowResizedSpecialAction);
  });
