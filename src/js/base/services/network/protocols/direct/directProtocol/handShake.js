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
     * @class classes.DirectHandShake
     */
    cls.DirectHandShake = context.oo.Singleton(
      /** @lends classes.DirectHandShake */
      {
        run: function(application, directInterface) {
          var data = cls.AuiProtocolWriter.translate({
            type: "meta",
            verb: "Client",
            attributes: {
              name: "GBC",
              version: context.version,
              //frontEndID2: application.info().frontEndId2,
              encapsulation: 1,
              filetransfer: 1
            }
          });
          application.model.logFireEvent(data);
          directInterface.directNetwork.write(data);
        }
      });
  })(gbc, gbc.classes);
