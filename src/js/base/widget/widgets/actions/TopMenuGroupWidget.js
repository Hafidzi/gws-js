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

modulum('TopMenuGroupWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * TopMenuGroup widget.
     * @class classes.TopMenuGroupWidget
     * @extends classes.WidgetGroupBase
     */
    cls.TopMenuGroupWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.TopMenuGroupWidget.prototype */
      return {
        __name: "TopMenuGroupWidget",
        _image: null,
        _dropDown: null,

        _textElement: null,
        _initContainerElement: function() {
          $super._initContainerElement.call(this);

          this._textElement = this._element.getElementsByTagName("span")[0];
          this._dropDown = cls.WidgetFactory.create("ChoiceDropDown");
          this._dropDown.autoSize = false;
          this._dropDown.setParentWidget(this);

          this._element.on('click.TopMenuGroupWidget', function(event) {
            event.preventDefault();
            event.stopPropagation();
            this._dropDown.toggle();
          }.bind(this));
          this._element.on('mouseover.TopMenuGroupWidget', function(event) {
            event.stopPropagation();
            var currentDropDown = context.DropDownService.getCurrentContainerDropDown();
            if (currentDropDown && (currentDropDown.getParentWidget().__name === this.__name || currentDropDown.getParentWidget()
                .__name === "TopMenuWidget")) {
              this._dropDown.show(true, true);
            }
          }.bind(this));
        },

        addChildWidget: function(widget) {
          $super.addChildWidget.call(this, widget, {
            noDOMInsert: true
          });
          this._dropDown.addChildWidget(widget);
        },

        setText: function(text) {
          this._textElement.textContent = text;
        },

        getText: function() {
          return this._textElement.textContent;
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
        },

        hasFocus: function() {
          return true;
        }
      };
    });
    cls.WidgetFactory.register('TopMenuGroup', cls.TopMenuGroupWidget);
  });
