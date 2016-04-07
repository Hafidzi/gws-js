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

modulum('ToolBarItemWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * ToolBarItem widget.
     * @class classes.ToolBarItemWidget
     * @extends classes.TextWidgetBase
     */
    cls.ToolBarItemWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.ToolBarItemWidget.prototype */
      return {
        __name: "ToolBarItemWidget",

        /** @type {Element} */
        _textElement: null,
        /** @type {classes.ImageWidget} */
        _image: null,
        /** @type {Element} */
        _imageContainer: null,
        /** @type {boolean} */
        _autoScale: false,

        _initElement: function(initialInformation) {
          $super._initElement.call(this, initialInformation);
          this._textElement = this._element.getElementsByTagName("span")[0];
          this._imageContainer = this._element.querySelector(".gbc_imageContainer");
          this._element.on('click.ToolBarItemWidget', function(event) {
            this.emit(context.constants.widgetEvents.click);
          }.bind(this));
        },

        setText: function(text) {
          this._element.setAttribute("title", text);
          this._textElement.textContent = text;
        },

        getText: function() {
          return this._textElement.textContent;
        },

        setImage: function(image) {
          if (image.length !== 0) {
            if (!this._image) {
              this._image = cls.WidgetFactory.create("Image");
              this._imageContainer.appendChild(this._image.getElement());
              this.setAutoScale(this._autoScale);
            }
            this._image.setSrc(image);
          } else if (this._image) {
            this._image.getElement().remove();
            this._image = null;
          }
        },

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
          }
          this._imageContainer.toggleClass("gbc_autoScale", this._autoScale);
        },

        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          this._element.setAttribute("title", title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._element.getAttribute("title");
        }

      };
    });
    cls.WidgetFactory.register('ToolBarItem', cls.ToolBarItemWidget);
  });
