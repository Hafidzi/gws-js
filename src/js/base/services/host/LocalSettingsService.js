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

modulum('LocalSettingsService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.LocalSettingsService
     */
    context.LocalSettingsService = context.oo.Singleton( /** @lends gbc.LocalSettingsService */ {
      __name: "LocalSettingsService",
      init: Function.noop,
      read: function(id) {
        return JSON.parse(localStorage.getItem(id));
      },
      write: function(id, contents) {
        localStorage.setItem(id, JSON.stringify(contents));
      }
    });
    context.InitService.register(context.LocalSettingsService);
  });
