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

modulum('ValueLabelWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Label widget composed of Text and Value
     * @class classes.ValueLabelWidget
     * @extends classes.TextWidgetBase
     */
    cls.ValueLabelWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.ValueLabelWidget.prototype */
      return {
        __name: "ValueLabelWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        _value: null,
        /**
         * @type Element
         */
        _textContent: null,
        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._textContent = this._element.getElementsByTagName("span")[0];
          this._element.on('click.ValueLabelWidget', function(event) {
            this.emit(context.constants.widgetEvents.click, event);
          }.bind(this));
        },

        destroy: function() {
          this._element.off('click.ValueLabelWidget');
          this._textContent = null;
          $super.destroy.call(this);
        },
        /**
         * @param {string} value sets the value to display
         */
        setText: function(value) {
          this._textContent.textContent = value;
        },

        /**
         * @returns {string} the displayed value
         */
        getText: function() {
          return this._textContent.textContent;
        },

        /**
         * @param {string} value sets the value to display
         */
        setValue: function(value) {
          this._value = value;
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          return this._value;
        },

        setFocus: function() {
          this._element.domFocus();
        }
      };
    });
    cls.WidgetFactory.register('ValueLabel', cls.ValueLabelWidget);
  });
