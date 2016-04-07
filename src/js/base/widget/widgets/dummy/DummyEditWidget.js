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

modulum('DummyEditWidget', ['EditWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Edit widget.
     * @class classes.DummyEditWidget
     * @extends classes.EditWidget
     */
    cls.DummyEditWidget = context.oo.Class(cls.EditWidget, function($super) {
      /** @lends classes.DummyEditWidget.prototype */
      return {
        __name: "DummyEditWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        _completerWidget: null,
        _choices: {},

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
        },

        /**
         * @param {boolean} readonly true to set the widget as read-only, false otherwise
         */
        setReadOnly: function(readonly) {

        },

        /**
         * @returns {boolean} true if the widget is read-only, false otherwise
         */
        isReadOnly: function() {
          return !!this._element.getAttribute("readonly");
        },

        /**
         * @param {number} maxlength maximum number of characters allowed in the field
         */
        setMaxLength: function(maxlength) {

        },

        /**
         * @returns {number} the maximum number of characters allowed in the field
         */
        getMaxLength: function() {
          this._element.getIntAttribute("maxlength");
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          return this._inputElement.value;
        },

        setValue: function(value) {
          //$super.setValue(value);
          if (this._choices && this._choices[value]) {
            value = this._choices[value].text;
            this._element.getElementsByTagName("input")[0].value = value;
          }

          //$super.setValue(value);

        },

        /**
         * @param {boolean} isPassword true if the widget should be in 'password' mode, false otherwise
         */
        setIsPassword: function(isPassword) {

        },

        /**
         * @returns {boolean} true if the widget is in 'password' mode, false otherwise
         */
        isPassword: function() {
          return this._element.getAttribute("type") === "password";
        },

        /**
         * Used to manage the keyboardHint.
         * @param {string} valType the type attribute value to set
         */
        setType: function(valType) {

        },

        /**
         * @returns {String} this Edit current type
         */
        getType: function() {
          return this._element.getAttribute("type");
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          cls.FocusHelper.setInputFocus(this._inputElement, bufferedText);
          $super.setFocus.call(this, bufferedText);
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._element.disabled = !enabled;
        },

        /**
         * Used when the dummy edit is a combobox
         * @param {string|string[]} choices adds a single or a list of choices
         */

        addChoices: function(choices) {
          if (choices) {
            for (var i = 0; i < choices.length; ++i) {
              this._choices[choices[i].value] = choices[i];
            }
            // this._choices =
            /*if (Object.isArray(choices)) {
              for (var i = 0; i < choices.length; i++) {
                this._addChoice(choices[i]);
              }
            } else {
              this._addChoice(choices);
            }
            */
          }
        },
        clearChoices: function() {
          this._choices = {};
        }

      };
    });
    cls.WidgetFactory.register('DummyEdit', cls.DummyEditWidget);
  });
