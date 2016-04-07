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

modulum("SizePolicy", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Size Policy
     * @class classes.SizePolicy
     */
    cls.SizePolicy = context.oo.Class(function() {
      /** @lends classes.SizePolicy.prototype */
      return {
        __name: "SizePolicy",
        /** @lends classes.SizePolicy */
        $static: {
          /**
           * @returns {classes.SizePolicy}
           */
          Fixed: function() {
            var result = new cls.SizePolicy();
            result._fixed = true;
            return result;
          },
          /**
           * @returns {classes.SizePolicy}
           */
          Initial: function() {
            var result = new cls.SizePolicy();
            result._growable = true;
            result._shrinkable = true;
            result._initialOnly = true;
            return result;
          },
          /**
           * @returns {classes.SizePolicy}
           */
          InitialGrow: function() {
            var result = new cls.SizePolicy();
            result._growable = true;
            result._initialOnly = true;
            return result;
          },
          /**
           * @returns {classes.SizePolicy}
           */
          InitialShrink: function() {
            var result = new cls.SizePolicy();
            result._shrinkable = true;
            result._initialOnly = true;
            return result;
          },
          /**
           * @returns {classes.SizePolicy}
           */
          Dynamic: function() {
            var result = new cls.SizePolicy();
            result._growable = true;
            result._shrinkable = true;
            result._dynamic = true;
            return result;
          },
          /**
           * @returns {classes.SizePolicy}
           */
          DynamicGrow: function() {
            var result = new cls.SizePolicy();
            result._growable = true;
            result._dynamic = true;
            return result;
          },
          /**
           * @returns {classes.SizePolicy}
           */
          DynamicShrink: function() {
            var result = new cls.SizePolicy();
            result._shrinkable = true;
            result._dynamic = true;
            return result;
          }
        },
        /**
         * @type {boolean}
         */
        _growable: false,
        /**
         * @type {boolean}
         */
        _dynamic: false,
        /**
         * @type {boolean}
         */
        _shrinkable: false,
        /**
         * @type {boolean}
         */
        _initialOnly: false,
        /**
         * @type {boolean}
         */
        _initialDone: false,
        /**
         * @type {boolean}
         */
        _fixed: false,

        /**
         *
         * @returns {boolean}
         */
        canGrow: function() {
          if (this._fixed || this._initialOnly) {
            return false;
          }
          return this._growable;
        },
        /**
         *
         * @returns {boolean}
         */
        canShrink: function() {
          if (this._fixed || this._initialOnly) {
            return false;
          }
          return this._shrinkable;
        },
        setInitialized: function() {
          this._initialDone = true;
        },
        isInitialized: function() {
          return this._initialOnly && this._initialDone;
        },
        isFixed: function() {
          return this._fixed;
        },
        isDynamic: function() {
          return this._dynamic;
        }
      };
    });
  });
