/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";
modulum('VMKeyEvent', ['VMEventBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     *
     * @class classes.VMKeyEvent
     * @extends classes.VMEventBase
     */
    cls.VMKeyEvent = context.oo.Class({
      base: cls.VMEventBase
    }, function() {
      /** @lends classes.VMKeyEvent.prototype */
      return {
        __name: "VMKeyEvent",
        directFire: true,
        type: "keyEvent",
        /**
         * @type {Object}
         */
        attributes: null,
        /**
         * @param {string} keyName name of the pressed key
         */
        constructor: function(keyName) {
          this.attributes = {
            keyName: keyName
          };
        }
      };
    });
  });
