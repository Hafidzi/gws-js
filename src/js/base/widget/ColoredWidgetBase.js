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

modulum('ColoredWidgetBase', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for all widgets handling colors (background and fore)
     * @class classes.ColoredWidgetBase
     * @extends classes.WidgetBase
     */
    cls.ColoredWidgetBase = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ColoredWidgetBase.prototype */
      return {
        /**
         * Sets the fore color
         * @see http://www.w3.org/wiki/CSS/Properties/color
         * @param {String} color a CSS color definition. Can be a color name ('red', 'blue'),
         *                 an hex code ('#f5d48a') or a color function ('rgb(128, 255, 0)').
         *                 null restores the default value.
         */
        setColor: function(color) {
          this.setStyle({
            "color": !!color ? color + " !important" : null
          });
        },

        /**
         * Returns the fore color
         * @see http://www.w3.org/wiki/CSS/Properties/color
         * @returns {String} a color definition as an RGB function ('rgb(128, 255, 0)')
         */
        getColor: function() {
          return this.getStyle("color");
        },

        /**
         * Sets the background color
         * @see http://www.w3.org/wiki/CSS/Properties/background-color
         * @param {String} color a CSS color definition. Can be a color name ('red', 'blue'),
         *                 an hex code ('#f5d48a') or a color function ('rgb(128, 255, 0)')
         *                 null restores the default value.
         */
        setBackgroundColor: function(color) {
          this.setStyle({
            "background-color": !!color ? color + " !important" : null
          });
        },

        /**
         * Returns the background color
         * @see http://www.w3.org/wiki/CSS/Properties/background-color
         * @returns {String} a color definition as an RGB function ('rgb(128, 255, 0)')
         */
        getBackgroundColor: function() {
          return this.getStyle("background-color");
        }
      };
    });
  });
