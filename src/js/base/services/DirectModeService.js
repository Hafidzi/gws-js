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

modulum('DirectModeService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.DirectModeService
     */
    context.DirectModeService = context.oo.Singleton( /** @lends gbc.DirectModeService */ {
      __name: "DirectModeService",
      _init: false,
      directTcp: null,
      activated: false,
      /**
       * init service method. should be called only once.
       */
      init: function() {
        if (context.embedded.nwjs) {
          this.directTcp = require("../node/directNetwork").get();
          this.directTcp.whenConnection = this.onConnection.bind(this);
        }
      },
      switchToDirectMode: function() {
        /* if (context.$app.hasRunningApplications()) {
           throw "Applications are running";
         }*/
        this.activated = !this.activated;
        //context.$display.switchToDirectMode();
        if (this.activated) {
          this.directTcp.start();
        } else {
          this.directTcp.stop();
        }
      },
      onConnection: function(connection) {
        context.SessionService.startDirect(connection);
      }

    });
    context.InitService.register(context.DirectModeService);
  });
