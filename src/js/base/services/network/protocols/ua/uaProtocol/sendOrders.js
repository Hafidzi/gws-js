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
     * @class classes.UASendOrders
     */
    cls.UASendOrders = context.oo.Singleton(
      /** @lends classes.UASendOrders */
      {
        run: function(orders, application, callback) {
          for (var o = 0; o < orders.length; o++) {
            if (orders[o].lazyResolve) {
              orders[o].lazyResolve();
            }
          }
          var data = cls.AuiProtocolWriter.translate({
            type: "om",
            order: application.info().auiOrder++,
            orders: orders
          }, application);
          application.model.logFireEvent(data);
          cls.UANetwork.auiOrder(application, callback, data);
        }
      });
  })(gbc, gbc.classes);
