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

modulum("Size", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * size (width, height)
     * @class classes.Size
     */
    cls.Size = context.oo.Class(function() {
      /** @lends classes.Size.prototype */
      return {
        /** @lends classes.Size */
        $static: {
          valueRE: /([0-9]+)(px|em|ch|ln|col|row)/,
          colsRE: /^([0-9]+)(ch|col)?$/,
          undef: "UNDEF",
          getMaxWidth: function() {
            var result = this.undef;
            var args = Array.prototype.slice.call(arguments);
            for (var i = 0; i < args.length; i++) {
              if (args[i] && args[i].getWidth() !== this.undef) {
                result = result === this.undef ? args[i].getWidth() : Math.max(args[i].getWidth(), result);
              }
            }
            return result;
          },
          getMaxHeight: function() {
            var result = this.undef;
            var args = Array.prototype.slice.call(arguments);
            for (var i = 0; i < args.length; i++) {
              if (args[i] && args[i].getHeight() !== this.undef) {
                result = result === this.undef ? args[i].getHeight() : Math.max(args[i].getHeight(), result);
              }
            }
            return result;
          },
          isCols: function(size) {
            return cls.Size.colsRE.test(size);
          },
          translate: function(context, size) {
            // 1em = 16px ... should be finetuned
            var _1em = 16;
            var pxResult = 0;
            if (!!size) {
              if (Object.isNumber(size)) {
                pxResult = size * _1em;
              } else {
                var result = cls.Size.valueRE.exec(size);
                if (result) {
                  var numeric = +result[1],
                    unit = result[2];
                  switch (unit) {
                    case "ln":
                      pxResult = numeric * 2 * _1em;
                      break;
                    case "col":
                      // TODO : read col widths
                      pxResult = numeric * 2 * _1em;
                      break;
                    case "row":
                      pxResult = numeric * cls.TableWidget.defaultRowHeight;
                      break;
                    case "ch":
                    case "em":
                      pxResult = numeric * _1em;
                      break;
                    default:
                      pxResult = numeric;
                      break;
                  }
                }
              }
            }
            return pxResult;
          }
        },
        __name: "Size",
        /**
         * @type {number|object}
         */
        _width: null,
        /**
         * @type {number|object}
         */
        _height: null,
        /**
         * @type {boolean}
         */
        _loose: false,
        /**
         * @type {Number}
         */
        _defaultWidth: 0,
        /**
         * @type {Number}
         */
        _defaultHeight: 0,
        /**
         *
         * @param {*} [rawOptions]
         */
        constructor: function(rawOptions) {
          var opts = rawOptions || {};
          this._width = Object.isNumber(opts.width) ? opts.width : cls.Size.undef;
          this._height = Object.isNumber(opts.height) ? opts.height : cls.Size.undef;
        },

        reset: function() {
          this._width = cls.Size.undef;
          this._height = cls.Size.undef;
        },

        hasWidth: function(considerZero) {
          return this._width !== cls.Size.undef && (!!considerZero || this._width > 0);
        },
        hasHeight: function(considerZero) {
          return this._height !== cls.Size.undef && (!!considerZero || this._height > 0);
        },
        hasSize: function(considerZero) {
          return this.hasWidth(considerZero) || this.hasHeight(considerZero);
        },
        getWidth: function(useFallback) {
          if (!!useFallback && !this.hasWidth(true)) {
            return this._defaultWidth;
          }
          return this._width;
        },
        getHeight: function(useFallback) {
          if (!!useFallback && !this.hasHeight(true)) {
            return this._defaultHeight;
          }
          return this._height;
        },
        setWidth: function(width) {
          if (width === null) {
            this._width = cls.Size.undef;
          } else {
            this._width = width;
          }
        },
        setHeight: function(height) {
          if (height === null) {
            this._height = cls.Size.undef;
          } else {
            this._height = height;
          }
        },
        setLoose: function(loose) {
          this._loose = !!loose;
        },
        isLoose: function() {
          return this._loose;
        },
        /**
         *
         * @param {classes.Size} size
         * @returns {classes.Size}
         */
        minus: function(size) {
          return new cls.Size({
            width: this.getWidth(true) - size.getWidth(true),
            height: this.getHeight(true) - size.getHeight(true)
          });
        },
        /**
         *
         * @returns {classes.Size}
         */
        clone: function() {
          var result = new cls.Size({
            width: this.getWidth(true),
            height: this.getHeight(true)
          });
          result._defaultWidth = this._defaultWidth;
          result._defaultHeight = this._defaultHeight;
          return result;
        }
      };
    });
  });
