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

modulum('UploadWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Upload widget.
     * @class classes.UploadWidget
     * @extends classes.WidgetBase
     */
    cls.UploadWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.UploadWidget.prototype */
      return {
        __name: "UploadWidget",
        /** @lends classes.UploadWidget */
        $static: {
          statusChangedEvent: "statusChanged",
          fileSelectionChangedEvent: "fileSelectionChanged",
          progressChangedEvent: "progressChanged"
        },
        /**
         * @type {string}
         */
        _status: "waiting",
        /**
         * @type {string}
         */
        _fileTransferUrl: null,
        /**
         * @type {Element}
         */
        _inputFile: null,
        /**
         * @type {classes.ButtonWidget}
         */
        _inputSubmit: null,
        /**
         * @type {boolean}
         */
        _hideOnSubmit: false,

        _initElement: function() {
          $super._initElement.call(this);
          this._inputFile = this._element.querySelector("input[type='file']");
          this._inputSubmit = cls.WidgetFactory.create("Button");
          this._inputSubmit.setEnabled(false);
          this._inputSubmit.setText("Upload");
          this._element.appendChild(this._inputSubmit.getElement());
          this._inputFile.on("change.UploadWidget", function() {
            this._status = this.getFile() ? "ready" : "waiting";
            if (this.getFile()) {
              this._inputSubmit.setEnabled(true);
              this._status = "ready";
            } else {
              this._status = "waiting";
            }
            this._notifyStatusChanged();
          }.bind(this));
          this._inputSubmit.on(gbc.constants.widgetEvents.click, function() {
            this._inputSubmit.setEnabled(false);
            if (this._hideOnSubmit) {
              $(this._element).slideUp();
            }
            this._status = "uploading";
            this._notifyStatusChanged();
            this.emit(cls.UploadWidget.progressChangedEvent, {
              loaded: -1,
              total: -1
            });
            var formData = new FormData(this._element);
            var request = new XMLHttpRequest();
            request.onload = function() {
              this._status = "done";
              this._notifyStatusChanged();
            }.bind(this);
            if (request.upload) {
              request.upload.addEventListener("progress", function(e) {
                if (e.lengthComputable) {
                  this.emit(cls.UploadWidget.progressChangedEvent, {
                    loaded: e.loaded,
                    total: e.total
                  });
                } else {
                  this.emit(cls.UploadWidget.progressChangedEvent, {
                    loaded: -1,
                    total: -1
                  });
                }
              }.bind(this), false);
            } else {
              this.emit(cls.UploadWidget.progressChangedEvent, {
                loaded: -1,
                total: -1
              });
            }
            request.open("POST", this._fileTransferUrl);
            request.send(formData);
            /*    $.ajax({
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false
                }).done(function() {
                });*/
          }.bind(this));
        },

        /**
         * @returns {string} the transfer status
         */
        getStatus: function() {
          return this._status;
        },

        /**
         *
         * @returns {string}
         */
        getFile: function() {
          var v = this._inputFile.value;
          return !!v && v.replace("C:\\fakepath\\", "");
        },

        /**
         * @param {string} fileTransferUrl
         */
        setFileTransferUrl: function(fileTransferUrl) {
          this._fileTransferUrl = fileTransferUrl;
        },

        /**
         * @param {string} extension
         */
        setExtension: function(extension) {
          this._inputFile.setAttribute("accept", extension);
        },

        /**
         * Sends status notification changes events
         * @private
         */
        _notifyStatusChanged: function() {
          this.emit(cls.UploadWidget.statusChangedEvent, this.getStatus());
        },

        /**
         * @param {boolean} hide
         */
        hideOnSubmit: function(hide) {
          this._hideOnSubmit = hide;
        },

        destroy: function() {
          if (this._inputFile) {
            this._inputFile.remove();
            this._inputFile = null;
          }
          if (this._inputSubmit) {
            this._inputSubmit.destroy();
            this._inputSubmit = null;
          }
          $super.destroy.call(this);
        }
      };
    });
    cls.WidgetFactory.register('Upload', cls.UploadWidget);
  });
