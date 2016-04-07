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

modulum('MessageWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for widgets.
     * @class classes.MessageWidget
     * @extends classes.TextWidgetBase
     */
    cls.MessageWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.MessageWidget.prototype */
      return {
        __name: "MessageWidget",

        _currentTimeout: null,

        _initElement: function() {
          $super._initElement.call(this);
          this._element.on('click.MessageWidget', function(event) {
            this.setHidden(true);
          }.bind(this));
        },
        /**
         * @param {string} text sets the text to display
         */
        setText: function(text) {
          this._element.textContent = text;
        },

        /**
         * @returns {string} the displayed text
         */
        getText: function() {
          return this._element.textContent;
        },

        /**
         * @inheritDoc
         */
        setHidden: function(hidden) {
          $super.setHidden.call(this, hidden);
          if (this._currentTimeout !== null) {
            clearTimeout(this._currentTimeout);
            this._currentTimeout = null;
          }
          if (!hidden) {
            this._currentTimeout = setTimeout(function() {
              this.setHidden(true);
              this._currentTimeout = null;
            }.bind(this), 10000);
          }
        }
      };
    });
    cls.WidgetFactory.register('Message', cls.MessageWidget);
  });
