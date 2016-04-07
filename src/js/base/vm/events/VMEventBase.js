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
modulum('VMEventBase', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Base class of vm events
     * @class classes.VMEventBase
     */
    cls.VMEventBase = context.oo.Class(function() {
      /** @lends classes.VMEventBase.prototype */
      return {
        __name: "VMEventBase",
        directFire: false
      };
    });
  });
