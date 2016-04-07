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

modulum('TextWidgetBase', ['ColoredWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for all widgets handling text attributes
     * @class classes.TextWidgetBase
     * @extends classes.ColoredWidgetBase
     */
    cls.TextWidgetBase = context.oo.Class(cls.ColoredWidgetBase, function($super) {
      /** @lends classes.TextWidgetBase.prototype */
      return {
        _textTransform: null,

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/font-family
         * @param {String} fontFamily the font family to use. null restores the default value.
         */
        setFontFamily: function(fontFamily) {
          this.setStyle({
            "font-family": fontFamily
          });
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/font-family
         * @returns {String} the used font family
         */
        getFontFamily: function() {
          return this.getStyle("font-family");
        },

        /**
         * @see http://www.w3org/wiki/CSS/Properties/font-weight
         * @param weight {String} a CSS font weight value. null restores the default value.
         */
        setFontWeight: function(weight) {
          this.setStyle({
            "font-weight": weight
          });
        },

        /**
         * @see http://www.w3org/wiki/CSS/Properties/font-weight
         * @returns {String} a CSS font weight value
         */
        getFontWeight: function() {
          return this.getStyle("font-weight");
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/font-style
         * @param style {String} a CSS font style value. null restores the default value.
         */
        setFontStyle: function(style) {
          this.setStyle({
            "font-style": style
          });
        },

        /**
         * @see http://www.w3org/wiki/CSS/Properties/font-style
         * @returns {String} a CSS font style value
         */
        getFontStyle: function() {
          return this.getStyle("font-style");
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/font-size
         * @param style {String} a CSS font size value. null restores the default value.
         */
        setFontSize: function(style) {
          this.setStyle({
            "font-size": style
          });
        },

        /**
         * @see http://www.w3org/wiki/CSS/Properties/font-size
         * @returns {String} a CSS font size value
         */
        getFontSize: function() {
          return this.getStyle("font-size");
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-align
         * @param align {String} a CSS text alignment. null restores the default value.
         */
        setTextAlign: function(align) {
          this.setStyle({
            "text-align": align
          });
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-align
         * @returns {String} a CSS text alignment
         */
        getTextAlign: function() {
          return this.getStyle("text-align");
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-transform
         * @param transform {String} a CSS text transform. null restores the default value.
         */
        setTextTransform: function(transform) {
          this.setStyle({
            "text-transform": transform
          });
          this._textTransform = transform;
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-transform
         * @param transform {String} a CSS text transform. null restores the default value.
         */
        getTextTransform: function() {
          return this.getStyle("text-transform");
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-decoration
         * @return {String} a CSS text decoration
         */
        getTextDecoration: function() {
          return this.getStyle("text-decoration");
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-decoration
         * @return {String} a CSS text decoration
         */
        setTextDecoration: function(decoration) {
          this.setStyle({
            "text-decoration": decoration
          });
        }
      };
    });
  });
