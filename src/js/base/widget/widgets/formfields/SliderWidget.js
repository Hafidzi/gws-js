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

modulum('SliderWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Slider widget.
     * @class classes.SliderWidget
     * @extends classes.TextWidgetBase
     */
    cls.SliderWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.SliderWidget.prototype */
      return {
        __name: "SliderWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        /**
         * @type Element
         */
        _inputElement: null,
        constructor: function() {
          $super.constructor.call(this);
          this.setFocusable(true);
        },

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._inputElement = this._element.querySelector('input');
          context.keyboard(this._element).bind(['up', 'right', 'pageup'], function(evt) {
            this._increase();
            this.emit(context.constants.widgetEvents.change, evt, false);
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['down', 'left', 'pagedown'], function(evt) {
            this._decrease();
            this.emit(context.constants.widgetEvents.change, evt, false);
            return false;
          }.bind(this));
          this._inputElement.on('change.SliderWidget', function(event) {
            this.emit(context.constants.widgetEvents.change, event, false);
          }.bind(this));
          this._inputElement.on('blur.SliderWidget', function(event) {
            this.emit(context.constants.widgetEvents.blur, event);
          }.bind(this));
          this._inputElement.on('focus.SliderWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          }.bind(this));

          this.setOrientation("vertical");
        },

        /**
         * Increase the displayed value
         * @private
         */
        _increase: function() {
          this.setValue((this.getValue() || this._getMeanValue()) + this.getStep());
        },

        /**
         * Decrease the displayed value
         * @private
         */
        _decrease: function() {
          this.setValue((this.getValue() || this._getMeanValue()) - this.getStep());
        },

        /***
         * @returns {number} the mean value between min and max
         * @private
         */
        _getMeanValue: function() {
          return Math.round((this.getMax() - this.getMin()) / 2 + this.getMin());
        },

        /**
         * @returns {Number} the displayed value
         */
        getValue: function() {
          return parseInt(this._inputElement.value, 10);
        },

        /**
         * @param {number} value the value to display
         */
        setValue: function(value) {
          this._inputElement.value = value;
        },

        /**
         * @returns {Number} the minimum value
         */
        getMin: function() {
          return this._inputElement.getIntAttribute('min');
        },

        /**
         * @param {number} value the minimum value
         */
        setMin: function(value) {
          if (Object.isNumber(value)) {
            this._inputElement.setAttribute('min', value);
          } else {
            this._inputElement.removeAttribute('min');
          }
        },

        /**
         * @returns {Number} the maximum value
         */
        getMax: function() {
          return this._inputElement.getIntAttribute('max');
        },

        /**
         * @param {number} value the maximum value
         */
        setMax: function(value) {
          if (Object.isNumber(value)) {
            this._inputElement.setAttribute('max', value);
          } else {
            this._inputElement.removeAttribute('max');
          }
        },

        /**
         * @returns {number} the progress step
         */
        getStep: function() {
          return this._inputElement.getIntAttribute('step');
        },

        /**
         * @param {number} step the progress step
         */
        setStep: function(step) {
          this._inputElement.setAttribute('step', Object.isNumber(step) && step > 0 ? step : 1);
        },

        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          this._inputElement.setAttribute("title", title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._inputElement.getAttribute("title");
        },

        /**
         * Set the orientation of the slider widget
         * @param {String} orientation can be "horizontal" or "vertical"
         */
        setOrientation: function(orientation) {
          this._orientation = orientation;
          var newStyle = {};

          if (orientation === "vertical") {
            newStyle = {
              "-webkit-appearance": "slider-vertical",
              "writing-mode": "bt-lr"
            };
            this._inputElement.setAttribute("orient", "vertical");
          } else {
            newStyle = {
              "-webkit-appearance": null,
              "writing-mode": null
            };
            this._inputElement.removeAttribute("orient");
          }
          this.setStyle(">input[type=range]", newStyle);
        },

        getOrientation: function() {
          return this._inputElement.getAttribute("orient") || "horizontal";
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._inputElement.domFocus("");
          $super.setFocus.call(this, bufferedText);
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._inputElement.disabled = !enabled;
        }
      };
    });
    cls.WidgetFactory.register('Slider', cls.SliderWidget);
  });
