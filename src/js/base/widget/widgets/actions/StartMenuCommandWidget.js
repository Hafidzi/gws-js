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

modulum('StartMenuCommandWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * StartMenuCommand widget.
     * @class classes.StartMenuCommandWidget
     * @extends classes.TextWidgetBase
     */
    cls.StartMenuCommandWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.StartMenuCommandWidget.prototype */
      return {
        __name: "StartMenuCommandWidget",

        _image: null,

        constructor: function() {
          $super.constructor.call(this);
        },

        _initElement: function(initialInformation) {
          $super._initElement.call(this, initialInformation);
          this._element.on('click.StartMenuCommandWidget', function(event) {
            this.emit(context.constants.widgetEvents.click);
          }.bind(this));
        },

        destroy: function() {
          this._element.off('click.StartMenuCommandWidget');
          $super.destroy.call(this);
        },

        setText: function(text) {
          this._element.querySelector(".gbc_startMenuCommandText").textContent = text;
        },

        getText: function() {
          return this._element.querySelector(".gbc_startMenuCommandText").textContent;
        },

        setTitle: function(title) {
          this._element.setAttribute("title", title);
        },

        getTitle: function() {
          return this._element.getAttribute("title");
        },

        setImage: function(image) {
          if (image.length !== 0) {
            if (!this._image) {
              this._image = cls.WidgetFactory.create("Image");
              this._element.prependChild(this._image.getElement());
            }
            this._image.setSrc(image);
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
    cls.WidgetFactory.register('StartMenuCommand', cls.StartMenuCommandWidget);
  });
