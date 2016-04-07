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
modulum('VMActionEvent', ['VMEventBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     *
     * @class classes.VMActionEvent
     * @extends classes.VMEventBase
     */
    cls.VMActionEvent = context.oo.Class({
      base: cls.VMEventBase
    }, function() {
      /** @lends classes.VMActionEvent.prototype */
      return {
        __name: "VMActionEvent",
        directFire: true,
        type: "actionEvent",
        /**
         * @type {Object}
         */
        attributes: null,
        /**
         * @param {string} idRef reference of the node holding the action
         */
        constructor: function(idRef) {
          this.attributes = {
            idRef: idRef
          };
        }
      };
    });
  });
