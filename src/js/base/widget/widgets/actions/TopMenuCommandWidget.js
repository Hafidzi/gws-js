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

modulum('TopMenuCommandWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * TopMenuCommand widget.
     * @class classes.TopMenuCommandWidget
     * @extends classes.TextWidgetBase
     */
    cls.TopMenuCommandWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.TopMenuCommandWidget.prototype */
      return {
        __name: "TopMenuCommandWidget",

        _image: null,
        _anchorElement: null,

        _initElement: function(initialInformation) {
          $super._initElement.call(this, initialInformation);
          this._anchorElement = this._element.getElementsByTagName("a")[0];
          this._element.on('click.TopMenuCommandWidget', function(event) {
            this.emit(context.constants.widgetEvents.click, event);
          }.bind(this));
        },

        setText: function(text) {
          this._anchorElement.textContent = text;
        },

        getText: function() {
          return this._anchorElement.textContent;
        },

        setImage: function(image) {
          if (image) {
            if (!this._image) {
              this._image = cls.WidgetFactory.create("Image");
              this._image.setAutoScale(true);
              this._element.prependChild(this._image.getElement());
            } else {
              this._image.getElement().removeClass("hidden");
            }
            this._image.setSrc(image);
          } else {
            if (this._image) { // hide image widget
              this._image.getElement().addClass("hidden");
            }
          }
        },

        getImage: function() {
          if (this._image) {
            return this._image.getSrc();
          }
          return null;
        }
      };
    });
    cls.WidgetFactory.register('TopMenuCommand', cls.TopMenuCommandWidget);
  });
