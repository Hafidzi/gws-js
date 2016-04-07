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

modulum('DummyRadioGroupWidget', ['RadioGroupWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * RadioGroup widget.
     * @class classes.DummyRadioGroupWidget
     * @extends classes.RadioGroupWidget
     */
    cls.DummyRadioGroupWidget = context.oo.Class(cls.RadioGroupWidget, function($super) {
      /** @lends classes.DummyRadioGroupWidget.prototype */
      return {
        __name: "DummyRadioGroupWidget",
        __templateName: "RadioGroupWidget",

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          var value = "";
          for (var i = 0; i < this._element.children.length; ++i) {
            var item = this._element.children[i];
            if (item.querySelector(".mt-radiobutton").hasClass('checked')) {
              if (value.length !== 0) {
                value += '|';
              }
              value += item.getAttribute('data-value');
            }
          }
          return value;
        },

        /**
         * @param {string} value the value to display
         */
        setValue: function(value) {
          var values = ("" + value).split('|');
          for (var i = 0; i < this._element.children.length; ++i) {
            var item = this._element.children[i];
            if (values.indexOf(item.getAttribute("data-value")) !== -1) {
              item.querySelector('.mt-radiobutton').toggleClass('checked', true);
            }
          }
        },

        /**
         * @param {string} value the value to display
         * @param {boolean} doSetValue
         * @private
         */
        _prepareValue: function(index, doSetValue, event) {
          if (this.isEnabled()) {
            this._updateVisualAim();
            if (doSetValue) {
              var item = this._element.children[index].querySelector('.mt-radiobutton');
              item.toggleClass('checked', !item.hasClass('checked'));
              this.emit(context.constants.widgetEvents.change, event, false);
            }
          }
        }
      };
    });
    cls.WidgetFactory.register('DummyRadioGroup', cls.DummyRadioGroupWidget);
  });
