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

modulum("AuiProtocolReader", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.AuiProtocolReader
     */
    cls.AuiProtocolReader = context.oo.Singleton(
      /** @lends classes.AuiProtocolReader */
      {
        __name: "AuiProtocolReader",
        translate: function(obj) {
          var result = context.AuiProtocolParser.parse(obj);
          //context.LogService.log(JSON.stringify(result));
          return result;
        }
      });
  });
