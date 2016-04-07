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

modulum('FileTransferApplicationService', ['ApplicationServiceBase', 'ApplicationServiceFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Base class of application scoped services
     * @class classes.FileTransferApplicationService
     * @extends classes.ApplicationServiceBase
     */
    cls.FileTransferApplicationService = context.oo.Class(cls.ApplicationServiceBase, function($super) {
      /** @lends classes.FileTransferApplicationService.prototype */
      return {
        __name: "FileTransferApplicationService",
        /**
         * @type {classes.ModalWidget}
         */
        _ui: null,
        _uploader: null,
        constructor: function(app) {
          $super.constructor.call(this, app);
          this.eventListener = new cls.EventListener();
          this._ui = cls.WidgetFactory.create("Modal");
          this._ui.getElement().addClass("mt-dialog-filetransfer");
          this._application.getUI().getWidget().getElement().appendChild(this._ui.getElement());
          this._ui.on(context.constants.widgetEvents.close, this._onClose.bind(this));
        },
        _onClose: function() {
          /* var closeAction = this._application.window.current().getController().getCloseAction();
           if (closeAction) {
             this._application.action.runActionNode(closeAction.id);
           }*/
        },
        show: function() {
          this._ui.show();
        },
        hide: function() {
          this._ui.hide();
        },
        askForFile: function(options, callback) {
          this._uploader = cls.WidgetFactory.create("Uploader", null, options);
          this._uploader.setCallback(function() {
            this.hide();
            callback({
              dataType: "STRING",
              isNull: 0,
              value: "0"
            });
          }.bind(this));
          this._ui.setContent(this._uploader.getElement());
          this.show();
        }
      };
    });
    cls.ApplicationServiceFactory.register("FileTransfer", cls.FileTransferApplicationService);
  });
