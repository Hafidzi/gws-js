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

modulum("SizePolicyConfig", ["SizePolicy"],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Size Policy Config
     * @class classes.SizePolicyConfig
     */
    cls.SizePolicyConfig = context.oo.Class(function() {
      /** @lends classes.SizePolicyConfig.prototype */
      return {
        __name: "SizePolicyConfig",

        /**
         * @type {classes.SizePolicy}
         */
        fixed: null,
        /**
         * @type {classes.SizePolicy}
         */
        initial: null,
        /**
         * @type {classes.SizePolicy}
         */
        dynamic: null,
        /**
         * @type {string}
         */
        mode: "initial",
        /**
         * @type {boolean}
         */
        measured: false,
        /**
         *
         */
        constructor: function() {
          this.reset();
        },
        reset: function() {
          this.fixed = cls.SizePolicy.Fixed();
          this.initial = cls.SizePolicy.Initial();
          this.dynamic = cls.SizePolicy.Dynamic();
        },
        needMeasure: function() {
          var status = this.getMode();
          if (!!status.isFixed()) {
            return !this.measured;
          }
          return !status.isInitialized() || !this.measured;
        },
        setMeasured: function() {
          this.measured = true;
        },
        /**
         * @returns {classes.SizePolicy}
         */
        getMode: function() {
          return this[this.mode] || this.initial;
        },
        /**
         *
         * @param string mode
         */
        setMode: function(mode) {
          this.mode = mode || "initial";
        }
      };
    });
  });
