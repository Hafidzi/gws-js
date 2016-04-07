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

modulum('StartMenuWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * StartMenu widget.
     * @class classes.StartMenuWidget
     * @extends classes.WidgetGroupBase
     */
    cls.StartMenuWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.StartMenuWidget.prototype */
      return {
        __name: "StartMenuWidget",
        /**
         * @type Element
         */
        _textElement: null,
        constructor: function() {
          $super.constructor.call(this);
          this._textElement = this._element.querySelector("div.gbc_startMenuText");
        },

        setText: function(text) {
          this._textElement.setAttribute("title", text);
          this._textElement.textContent = text;
        },

        getText: function() {
          return this._textElement.textContent;
        }
      };
    });
    cls.WidgetFactory.register('StartMenu', cls.StartMenuWidget);
  });
