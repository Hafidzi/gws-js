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

modulum('ConsoleLogProvider', ['LogProviderBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ConsoleLogProvider
     * @extends classes.LogProviderBase
     */
    cls.ConsoleLogProvider = context.oo.Class(cls.LogProviderBase, /** @lends classes.ConsoleLogProvider.prototype */ {
      __name: "ConsoleLogProvider",
      getLogger: function() {
        return window.console;
      }
    });
  });
