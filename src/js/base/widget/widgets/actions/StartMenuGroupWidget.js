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

modulum('StartMenuGroupWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * StartMenuGroup widget.
     * @class classes.StartMenuGroupWidget
     * @extends classes.WidgetGroupBase
     */
    cls.StartMenuGroupWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.StartMenuGroupWidget.prototype */
      return {
        __name: "StartMenuGroupWidget",

        _image: null,

        _initElement: function() {
          $super._initElement.call(this);
          this._element.querySelector(".gbc_startMenuGroupTitle").on('click.StartMenuGroupWidget', function(event) {
            this._element.classList.toggle('gbc_open');
          }.bind(this));
        },

        setText: function(text) {
          this._element.querySelector(".gbc_startMenuGroupTitleText").textContent = text;
        },

        getText: function() {
          return this._element.querySelector(".gbc_startMenuGroupTitleText").textContent;
        },

        setImage: function(image) {
          if (image.length !== 0) {
            if (!this._image) {
              this._image = cls.WidgetFactory.create("Image");
              this._element.child("gbc_startMenuGroupTitle").prependChild(this._image.getElement());
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
    cls.WidgetFactory.register('StartMenuGroup', cls.StartMenuGroupWidget);
  });
