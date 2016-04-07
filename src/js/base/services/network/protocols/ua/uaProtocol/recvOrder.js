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
     * @class classes.UARecvOrder
     */
    cls.UARecvOrder = context.oo.Singleton(
      /** @lends classes.UARecvOrder */
      {
        run: function(data, headers, application, callback) {
          if (!!data) {
            application.model.logDvm(data);
            application.dvm.manageAuiOrders(data, callback);
          } else {
            callback();
          }
        }
      });
  })(gbc, gbc.classes);
