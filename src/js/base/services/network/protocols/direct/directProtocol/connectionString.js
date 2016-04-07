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

(
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DirectConnectionString
     */
    cls.DirectConnectionString = context.oo.Singleton(
      /** @lends classes.DirectConnectionString */
      {
        /**
         *
         * @param data
         * @param {classes.VMApplication} application
         */
        run: function(data, application) {
          application.model.logDvm(data);
          try {
            var vmMessages = cls.AuiProtocolReader.translate(String(data));

            if (vmMessages.length === 0 || vmMessages.length !== 1 && vmMessages[0].type !== "meta" || vmMessages[0].verb !==
              "Connection") {
              throw "Received connectionString bad format : " + data;
            }
            application.info().connectionInfo = vmMessages[0].attributes;
          } catch (e) {
            var message = "ConnectionString - Bad contents. " + e.toString();
            application.info().ending = cls.ApplicationEnding.notok(message);
          }
        }
      });
  })(gbc, gbc.classes);
