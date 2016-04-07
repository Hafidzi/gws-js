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

modulum('ButtonWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Button widget.
     * @class classes.ButtonWidget
     * @extends classes.TextWidgetBase
     */
    cls.ButtonWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.ButtonWidget.prototype */
      return {
        __name: "ButtonWidget",

        /**
         * @protected
         * @type {classes.ImageWidget}
         */
        _image: null,
        /**
         * @protected
         * @type {Element}
         */
        _textElement: null,

        /**
         * @protected
         * @type {Element}
         */
        _mtButton: null,

        /** @type {boolean} */
        _autoScale: false,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutInformation.getSizePolicyConfig().initial._shrinkable = false;
          this._layoutInformation.getSizePolicyConfig().dynamic._shrinkable = false;
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._mtButton = this._element.querySelector(".mt-button");
          this._textElement = this._mtButton.getElementsByTagName("span")[0];

          this._mtButton.on('click.ButtonWidget', function(event) {
            context.WidgetService.cursorX = event.clientX;
            context.WidgetService.cursorY = event.clientY;

            if (this.isEnabled()) {
              this.emit(context.constants.widgetEvents.click, event);
            }
          }.bind(this));

          context.keyboard(this._mtButton).bind(["enter", "space"], function(evt) {
            if (this.isEnabled()) {
              this.emit(context.constants.widgetEvents.click, event);
            }
            return false;
          }.bind(this));
        },

        destroy: function() {
          if (this._image) {
            this._image.destroy();
          }
          this._image = null;
          this._textElement = null;
          this._mtButton = null;
          $super.destroy.call(this);
        },
        /**
         * @param {string} text text to display in the button
         */
        setText: function(text) {
          this._textElement.textContent = text;

          //QA
          if (["qa_dialog_ready", "qa_menu_ready"].indexOf(text) >= 0) {
            //Once we see that' directly click
            this.emit(context.constants.widgetEvents.click);
          }
        },

        /**
         * @returns {string} the text displayed in the button
         */
        getText: function() {
          return this._textElement.textContent;
        },

        /**
         * @param {string} image the URL of the image to display
         */
        setImage: function(image) {
          if (image.length !== 0) {
            if (!this._image) {
              this._image = cls.WidgetFactory.create("Image");
              var imageContainer = document.createElement("div");
              imageContainer.addClass("gbc_imageContainer");
              imageContainer.appendChild(this._image.getElement());
              this._mtButton.prependChild(imageContainer);
              this.setAutoScale(this._autoScale);
            }
            this._image.setSrc(image);
          } else if (this._image) {
            this._image.getElement().parentElement.remove();
            this._image = null;
          }
        },

        /**
         * @returns {string} the URL of the displayed image
         */
        getImage: function() {
          if (this._image) {
            return this._image.getSrc();
          }
          return null;
        },

        setAutoScale: function(enabled) {
          this._autoScale = enabled;
          if (this._image) {
            this._image.setAutoScale(this._autoScale);
            this._image.getElement().parentElement.toggleClass("gbc_autoScale", this._autoScale);
          }
        },

        setFocus: function() {
          this._mtButton.domFocus();
          $super.setFocus.call(this);
        },
        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._mtButton.toggleClass('disabled', !enabled);
        },

        /**
         * @inheritDoc
         */
        setColor: function(color) {
          this.setStyle(".mt-button", {
            "color": !!color ? color + " !important" : null
          });
        },

        setFlat: function(flat) {
          if (flat) {
            this._mtButton.addClass("mt-button-flat");
          } else {
            this._mtButton.removeClass("mt-button-flat");
          }
        },

        /**
         * @inheritDoc
         */
        getColor: function() {
          return this.getStyle(".mt-button", "color");
        },

        /**
         * @inheritDoc
         */
        setBackgroundColor: function(color) {
          this.setStyle(".mt-button", {
            "background-color": !!color ? color + " !important" : null
          });
        },

        /**
         * @inheritDoc
         */
        getBackgroundColor: function() {
          return this.getStyle(".mt-button", "background-color");
        }
      };
    });
    cls.WidgetFactory.register('Button', cls.ButtonWidget);
    cls.WidgetFactory.register('Action', cls.ButtonWidget);
    cls.WidgetFactory.register('MenuAction', cls.ButtonWidget);
  });
