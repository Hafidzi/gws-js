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

modulum('StyleBehaviorBase', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.StyleBehaviorBase
     * @extends classes.BehaviorBase
     */
    cls.StyleBehaviorBase = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.StyleBehaviorBase.prototype */
      return {
        __name: "StyleBehaviorBase",
        /** @type {classes.NodeBase} */
        /** {boolean} true if this behavior uses 4ST styles, false otherwise */
        styleBased: true,

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        /**
         * Test if style attribute is "yes" like
         * @param sa Style attribute
         */
        isSAYesLike: function(sa) {
          return sa === 1 || sa === "yes" || sa === "true";
        },

        /**
         * Test if style attribute is "no" like
         * @param sa Style attribute
         */
        isSANoLike: function(sa) {
          return sa === 0 || sa === "no" || sa === "false" || sa === "none";
        }
      };
    });
  });
