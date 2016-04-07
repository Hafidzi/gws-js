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

modulum('ProductInformationWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ProductInformationWidget
     * @extends classes.WidgetBase
     */
    cls.ProductInformationWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ProductInformationWidget.prototype */
      return {
        __name: "ProductInformationWidget",
        /**
         * @type Element
         */
        _versionElement: null,
        /**
         * @type Element
         */
        _buildElement: null,
        /**
         * @type Element
         */
        _tagElement: null,
        /**
         * @type Element
         */
        _logoElement: null,
        _initElement: function() {
          $super._initElement.call(this);
          this._versionElement = this._element.querySelector(".field_version");
          this._buildElement = this._element.querySelector(".field_build");
          this._tagElement = this._element.querySelector(".field_tag");
          this._logoElement = this._element.querySelector(".field_logo");
        },
        getVersion: function() {
          return this._versionElement.textContent;
        },
        setVersion: function(version) {
          this._versionElement.textContent = version;
        },
        getBuild: function() {
          return this._buildElement.textContent;
        },
        setBuild: function(build) {
          this._buildElement.textContent = build;
        },
        getTag: function() {
          return this._tagElement.textContent;
        },
        setTag: function(tag) {
          this._tagElement.textContent = tag;
        },
        getLogo: function() {
          return this._versionElement.getAttribute("src");
        },
        setLogo: function(logo) {
          this._logoElement.setAttribute("src", logo);
        },
        getLogoAlt: function() {
          return this._logoElement.getAttribute("alt");
        },
        setLogoAlt: function(logoAlt) {
          this._logoElement.setAttribute("alt", logoAlt);
        }
      };
    });
    cls.WidgetFactory.register('ProductInformation', cls.ProductInformationWidget);
  });
