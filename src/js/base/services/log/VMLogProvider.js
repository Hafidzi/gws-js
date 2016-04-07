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

modulum('VMLogProvider', ['LogProviderBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    var logger = context.oo.Singleton(cls.LoggerBase, {
      log: function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        context.DebugService.vmLog([arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
      }
    });

    /**
     * @class classes.VMLogProvider
     * @extends classes.LogProviderBase
     */
    cls.VMLogProvider = context.oo.Class(cls.LogProviderBase, /** @lends classes.VMLogProvider.prototype */ {
      __name: "VMLogProvider",
      getLogger: function() {
        return logger;
      }
    });
  });
