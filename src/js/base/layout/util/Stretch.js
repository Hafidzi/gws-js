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

modulum("Stretch", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Stretch (x, y)
     * @class classes.Stretch
     */
    cls.Stretch = context.oo.Class(function() {
      /** @lends classes.Stretch.prototype */
      return {
        /** @lends classes.Stretch */
        $static: {
          undef: {}
        },
        __name: "Stretch",
        /**
         * @type {boolean|object}
         */
        _x: null,
        /**
         * @type {boolean|object}
         */
        _y: null,
        /**
         * @type {boolean}
         */
        _defaultX: false,
        /**
         * @type {boolean}
         */
        _defaultY: false,
        /**
         *
         * @param {*} [rawOptions]
         */
        constructor: function(rawOptions) {
          var opts = rawOptions || {};
          this._x = opts.x || cls.Stretch.undef;
          this._y = opts.y || cls.Stretch.undef;
        },
        reset: function() {
          this._x = cls.Stretch.undef;
          this._y = cls.Stretch.undef;
        },
        isXDefined: function() {
          return this._x !== cls.Stretch.undef;
        },
        isYDefined: function() {
          return this._y !== cls.Stretch.undef;
        },
        hasSize: function() {
          return this.isXDefined() || this.isYDefined();
        },
        getX: function(useFallback) {
          if (!!useFallback && !this.isXDefined()) {
            return this._defaultX;
          }
          return this._x;
        },
        getY: function(useFallback) {
          if (!!useFallback && !this.isYDefined()) {
            return this._defaultY;
          }
          return this._y;
        },
        setX: function(x) {
          if (x === null) {
            this._x = cls.Stretch.undef;
          } else {
            this._x = x;
          }
        },
        setY: function(y) {
          if (y === null) {
            this._y = cls.Stretch.undef;
          } else {
            this._y = y;
          }
        },
        setDefaultX: function(x) {
          this._defaultX = x;
        },
        setDefaultY: function(y) {
          this._defaultY = y;
        }
      };
    });
  });
