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

modulum('ModalWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Modal widget.
     * @class classes.ModalWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ModalWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ModalWidget.prototype */
      return {
        __name: "ModalWidget",
        /**
         * @type {jQuery}
         */
        _header: null,
        /**
         * @type {jQuery}
         */
        _footer: null,
        /**
         * @type {jQuery}
         */
        _title: null,
        /**
         * @type {jQuery}
         */
        _actionsHost: null,
        /**
         * @type {jQuery}
         */
        _closeButton: null,

        _initElement: function() {
          $super._initElement.call(this);
          var element = $(this._element);
          this._header = element.find('.mt-dialog-pane>.mt-dialog-header');
          this._header.toggleClass("hidden");
          this._footer = element.find('.mt-dialog-pane>.mt-dialog-footer');
          this._title = this._header.find('.mt-dialog-title');
          this._actionsHost = this._header.find('.mt-dialog-actions');
          this._closeButton = this._actionsHost.find('.close');
          this._closeButton.on("click", function() {
            this.emit(context.constants.widgetEvents.close);
          }.bind(this));
          $(this._element).on("click", function(evt) {
            if ($(evt.target).is($(evt.currentTarget))) {
              this.emit(context.constants.widgetEvents.modalOut);
            }
          }.bind(this));
        },

        /**
         * @param {string|Element|jQuery} header the header
         */
        setHeader: function(header) {
          if (Object.isString(header)) {
            this._header.toggleClass("hidden", header.length === 0);
            this._title.text(header);
          } else {
            this._title.empty().append(header);
          }
        },

        setImage: function(image) {
          if (!this._image) {
            this._image = cls.WidgetFactory.create("Image");
            this._title.before(this._image.getElement());
          }
          this._image.setSrc(image);
        },

        /**
         * @param {string|Element|jQuery} header the footer
         */
        setFooter: function(footer) {
          if (Object.isString(footer)) {
            this._footer.text(footer);
          } else {
            this._footer.empty().append(footer);
          }
        },

        /**
         * @param {string|Element|jQuery} header the content
         */
        setContent: function(content) {
          if (Object.isString(content)) {
            $(this._containerElement).text(content);
          } else {
            $(this._containerElement).find(">*").detach();
            $(this._containerElement).append(content);
          }
        },

        /**
         * @param {boolean} closable true if the dialog is closable, false otherwise
         */
        setClosable: function(closable) {
          if (closable) {
            this._closeButton.show();
          } else {
            this._closeButton.hide();
          }
        },

        /**
         * @returns {boolean} true if the dialog is closable, false otherwise
         */
        getClosable: function() {
          return this._closeButton.is(':visible');
        },
        show: function() {
          this._element.addClass("displayed");
        },
        hide: function() {
          this._element.removeClass("displayed");
        }
      };
    });
    cls.WidgetFactory.register('Modal', cls.ModalWidget);
  });
