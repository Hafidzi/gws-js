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
     * @class classes.DirectSendEndingEmpty
     */
    cls.DirectSendEndingEmpty = context.oo.Singleton(
      /** @lends classes.DirectSendEndingEmpty */
      {
        run: function(application, callback) {
          cls.DirectNetwork.empty(application.info(), callback);
        }
      });
  })(gbc, gbc.classes);
