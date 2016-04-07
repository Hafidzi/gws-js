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

modulum('MockService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.MockService
     */
    context.MockService = context.oo.Singleton( /** @lends gbc.MockService */ {
      __name: "MockService",
      _init: false,
      init: Function.noop,

      fakeApplication: function() {
        if (!this._init) {
          this._init = true;
          context.HostService.wrapGlobalErrors();
          context.LogService.registerLogProvider(new cls.ConsoleLogProvider(), "networkProtocol");
          context.LogService.registerLogProvider(new cls.NetworkLogProvider(), "network");
          context.LogService.registerLogProvider(new cls.VMLogProvider(), "VM");
          context.LogService.registerLogProvider(new cls.BufferedConsoleLogProvider(), null);
        }
        return context.SessionService.start("fake", {
          mode: "no"
        }).getCurrentApplication();
      }
    });
    context.InitService.register(context.MockService);
  });
