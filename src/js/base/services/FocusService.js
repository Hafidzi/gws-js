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

modulum('FocusService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.FocusService
     */
    gbc.FocusService = context.oo.Singleton( /** @lends gbc.FocusService */ {
      __name: "FocusService",
      /**
       * @type {Element}
       */
      _input: null,

      /**
       * true if we are currently restoring the VM focus, false otherwise
       * @type {boolean}
       */
      _restoringFocus: false,

      init: function() {
        this._input = document.createElement('input');
        this._input.classList.add("gbc_FocusHolder");
        document.body.appendChild(this._input);
      },

      /**
       * set focus to hidden input
       */
      focusChange: function(callback) {
        this._input.value = "";
        this._input.off("focus.FocusService");
        this._input.domFocus(callback);
      },

      /**
       * @returns {boolean} true if we are currently restoring the VM focus, false otherwise
       */
      isRestoringFocus: function() {
        return this._restoringFocus;
      },

      /**
       * Restores the focus according to the VM focus
       */
      restoreVMFocus: function(app) {
        if (app) {
          var ui = app.model.getNode(0);
          if (ui) {
            var focusedNodeId = ui.attribute('focus');
            var node = app.getNode(focusedNodeId);
            if (node) {
              var ctrl = node.getController();
              if (ctrl && ctrl.setFocus) {
                this._restoringFocus = true;
                ctrl.ensureVisible();
                ctrl.setFocus(this._input.value);
                this._restoringFocus = false;
              }
            }
          }
        }
      }
    });
    gbc.InitService.register(gbc.FocusService);
  });
