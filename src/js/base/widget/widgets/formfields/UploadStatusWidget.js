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

modulum('UploadStatusWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Upload status widget.
     * @class classes.UploadStatusWidget
     * @extends classes.WidgetBase
     */
    cls.UploadStatusWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.UploadStatusWidget.prototype */
      return {
        __name: "UploadStatusWidget",
        /**
         * @type {Element}
         */
        _describe: null,
        /**
         * @type {Element}
         */
        _filename: null,

        _initElement: function() {
          $super._initElement.call(this);
          this._describe = this._element.child("filetransfer-describe");
          this._filename = this._element.child("filetransfer-name");
        },

        /**
         * @param {string} text
         */
        setFilename: function(text) {
          this._filename.textContent = text;
        },

        /**
         * @returns {string}
         */
        getFilename: function() {
          return this._filename.textContent;
        },

        /**
         * @param {string} text
         */
        setDescription: function(text) {
          this._describe.textContent = text;
        },

        /**
         * @returns {string}
         */
        getDescription: function() {
          return this._describe.textContent;
        }
      };
    });
    cls.WidgetFactory.register('UploadStatus', cls.UploadStatusWidget);
  });
