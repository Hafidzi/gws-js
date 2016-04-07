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

modulum('UploaderWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Uploader widget.
     * @class classes.UploaderWidget
     * @extends classes.WidgetBase
     */
    cls.UploaderWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.UploaderWidget.prototype */
      return {
        __name: "UploaderWidget",
        /**
         * @type classes.UploadWidget
         */
        _upload: null,
        /**
         * @type classes.UploadStatusWidget
         */
        _uploadStatus: null,
        /**
         * @type classes.ProgressBarWidget
         */
        _progress: null,
        /**
         * @type {Function}
         */
        _callback: null,
        _options: null,
        constructor: function(options) {
          this._options = options;
          $super.constructor.call(this);
        },
        _initElement: function() {
          $super._initElement.call(this);
          this._upload = cls.WidgetFactory.create('Upload');
          this._upload.setFileTransferUrl(this._options.fileTransferUrl);
          this._upload.setExtension(this._options.extension);
          this._uploadStatus = cls.WidgetFactory.create('UploadStatus');
          this._progress = cls.WidgetFactory.create('ProgressBar');
          this._upload.hideOnSubmit(true);
          this._upload.on(cls.UploadWidget.statusChangedEvent, function(evt, src, status) {
            switch (status) {
              case "ready":
                this._uploadStatus.setDescription(i18n.t("file.upload.ready"));
                this._uploadStatus.setFilename(this._upload.getFile());
                break;
              case "uploading":
                this._uploadStatus.setDescription(i18n.t("file.upload.uploading"));
                this._progress.setRunning(true);
                break;
              case "done":
                this._callback();
                break;
              case "waiting":
                this._uploadStatus.setDescription("");
                this._uploadStatus.setFilename("");
                break;
              default:
                this._uploadStatus.setDescription("");
                this._uploadStatus.setFilename("");
                break;
            }
          }.bind(this));
          this._upload.on(cls.UploadWidget.progressChangedEvent, function(evt, src, progress) {
            if (progress.total < 0) {
              this._progress.setProgressUnknown(true);
            }
            this._progress.setValue(((progress.loaded / progress.total) * 100));
          }.bind(this));
          this._element.appendChild(this._upload.getElement());
          this._element.appendChild(this._uploadStatus.getElement());
          this._element.appendChild(this._progress.getElement());
        },

        /**
         * @param {Function} callback the function to call on upload completion
         */
        setCallback: function(callback) {
          this._callback = callback;
        },

        /**
         * @returns {Function} the function to call on upload completion
         */
        getCallback: function() {
          return this._callback;
        }
      };
    });
    cls.WidgetFactory.register('Uploader', cls.UploaderWidget);
  });
