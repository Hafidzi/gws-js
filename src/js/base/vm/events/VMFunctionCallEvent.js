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
modulum('VMFunctionCallEvent', ['VMEventBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     *
     * @class classes.VMFunctionCallEvent
     * @extends classes.VMEventBase
     */
    cls.VMFunctionCallEvent = context.oo.Class({
      base: cls.VMEventBase
    }, function() {
      /** @lends classes.VMFunctionCallEvent.prototype */
      return {
        /** @lends classes.VMFunctionCallEvent */
        $static: {
          success: 0, // Success
          unknownFunction: -1, // The function is not defined in the specified package
          unknownModule: -2, // Unknown module or shared library could not be loaded
          stackError: -3, // Wrong number of parameters or return values. Stack problem.
          functionError: -4 // Function call failed - fatal error in front-end function
        },

        __name: "VMFunctionCallEvent",
        type: "functionCallEvent",
        status: null,
        message: null,
        values: null,

        /**
         * @param {object} results function call results
         */
        constructor: function(status, message, values) {
          this.status = status;
          this.message = message;
          this.values = values;
        }
      };
    });
  });
