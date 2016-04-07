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

modulum('SpinEditWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * SpinEdit widget.
     * @class classes.SpinEditWidget
     * @extends classes.TextWidgetBase
     */
    cls.SpinEditWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.SpinEditWidget.prototype */
      return {
        __name: "SpinEditWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        /**
         * @type Element
         */
        _inputElement: null,
        _maxLength: -1,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._inputElement = this._element.querySelector("input");
          context.keyboard(this._inputElement).bind(['home'], function(evt) {
            var min = this.getMin();
            if (min !== null) {
              this.setValue(min);
              this.emit(context.constants.widgetEvents.change, evt, false);
            } else {
              return false; // Do nothing if no min value provided
            }
            return false;
          }.bind(this));

          context.keyboard(this._inputElement).bind(['end'], function(evt) {
            var max = this.getMax();
            if (max !== null) {
              this.setValue(max);
              this.emit(context.constants.widgetEvents.change, evt, false);
            } else {
              return false; // Do nothing if no max value provided
            }
            return false;
          }.bind(this));
          context.keyboard(this._inputElement).bind(['up'], function(evt) {
            evt.stopPropagation();
            this._increase();
            this.emit(context.constants.widgetEvents.change, event, false);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['down'], function(evt) {
            evt.stopPropagation();
            this._decrease();
            this.emit(context.constants.widgetEvents.change, event, false);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['pageup'], function(evt) {
            var current = this.getValue();
            var bigStep = this.getStep() * 10 || 10;
            this.setValue(parseInt(current + bigStep, 10));
            this.emit(context.constants.widgetEvents.change, evt, false);
            return false;
          }.bind(this));
          context.keyboard(this._inputElement).bind(['pagedown'], function(evt) {
            var current = this.getValue();
            var bigStep = this.getStep() * 10 || 10;
            this.setValue(parseInt(current - bigStep, 10));
            this.emit(context.constants.widgetEvents.change, evt, false);
            return false;
          }.bind(this));
          this._inputElement.on('blur.SpinEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.blur, event);
          }.bind(this));
          this._inputElement.on('focus.SpinEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          }.bind(this));
          this._inputElement.on('change.SpinEditWidget', function(event) {
            // Emitted when up/down buttons are triggered
            this.emit(context.constants.widgetEvents.change, event, false);
          }.bind(this));
          this._inputElement.on('keyup.SpinEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.change, event, true);
          }.bind(this));

          /* Browser specific */

          this._inputElement.on('keypress.SpinEditWidget', function(event) { // keypress isn't raised for special commands (ctrl, arrow, delete, ...), so no need to test them
            var isValid = cls.KeyboardHelper.isSpecialCommand(event) || (cls.KeyboardHelper.isDecimal(event) && !this._isMaxLength());

            if (isValid) {
              var value = this._inputElement.value;
              var start = this._inputElement.selectionStart;
              var end = this._inputElement.selectionEnd;
              if (end !== start) {
                value = "";
              }
              var typedChar = String.fromCharCode(event.which);

              isValid = cls.KeyboardHelper.validateNumber(value, start, typedChar, this._min, this._max);
              if (!isValid) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
              }
            } else {
              event.stopImmediatePropagation();
              event.stopPropagation();
              event.preventDefault();
            }

          }.bind(this));
        },

        /**
         * @param {number} value the value to display
         */
        setValue: function(value) {
          var min = this.getMin();
          var max = this.getMax();
          if (min !== null && value < min) {
            value = min;
          }
          if (max !== null && value > max) {
            value = max;
          }
          this._inputElement.value = value;
        },

        /**
         * @returns {number} the displayed value
         */
        getValue: function() {
          var value = parseInt(this._inputElement.value, 10);
          var isDefined = Object.isNumber(value) && !Object.isNaN(value);
          return isDefined ? value : null;
        },

        _increase: function() {
          var curVal = this.getValue();
          if (curVal !== this._max) {
            var newVal = curVal + this._step;
            if (newVal > this._max) {
              newVal = this._max;
            }
            this.setValue(newVal);
            //this._input.setCursorPosition(0, newVal.length);
          }
        },

        _decrease: function() {
          var curVal = this.getValue();
          if (curVal !== this._min) {
            var newVal = curVal - this._step;
            if (newVal < this._min) {
              newVal = this._min;
            }
            this.setValue(newVal);
            //this._input.setCursorPosition(0, newVal.length);
          }
        },

        /**
         * @param {number} min the minimum allowed value
         */
        setMin: function(min) {
          if (Object.isNumber(min)) {
            this._min = min;
          }
        },

        /**
         * @returns {number} the minimum allowed value
         */
        getMin: function() {
          return this._min;
        },

        /**
         * @param {number} max the maximum allowed value
         */
        setMax: function(max) {
          if (Object.isNumber(max)) {
            this._max = max;
            //this._input.attr('max', max);
          }
        },

        /**
         * @returns {number} the maximum allowed value
         */
        getMax: function() {
          return this._max;
        },

        /**
         * @param {number} step the increment step
         */
        setStep: function(step) {
          this._step = step;
        },

        /**
         * @returns {number} the increment step
         */
        getStep: function() {
          return this._step;
        },

        _isMaxLength: function() {
          return this._maxLength !== -1 && this._inputElement.value.length >= this._maxLength &&
            this._inputElement.selectionStart === this._inputElement.selectionEnd;
        },

        /**
         * @param {number} maxlength maximum number of characters allowed in the field
         */
        setMaxLength: function(maxlength, callback) {
          if (maxlength) {
            this._maxLength = maxlength;

            if (callback) {
              callback();
            }
          }
        },

        /**
         * @returns {number} the maximum number of characters allowed in the field
         */
        getMaxLength: function() {
          return this._maxLength;
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._inputElement.domFocus(bufferedText);
          $super.setFocus.call(this, bufferedText);
        },
        setTitle: function(title) {
          $super.setTitle.call(this, title);
          this._inputElement.setAttribute("title", title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._inputElement.getAttribute("title");
        },

        /**
         * When cursor2 === cursor, it is a simple cursor set
         * @param {int} cursor the selection range beginning
         * @param {int} cursor2 the selection range end, if any
         */
        setCursors: function(cursor, cursor2) {
          if (!cursor2) {
            cursor2 = cursor;
          }
          if (cursor2 && cursor2 < 0) {
            cursor2 = ("" + this.getValue()).length;
          }
          this._inputElement.setCursorPosition(cursor, cursor2);
        },

        getCursors: function() {
          var cursors = {
            start: 0,
            end: 0
          };
          try {
            cursors.start = this._inputElement.selectionStart;
            cursors.end = this._inputElement.selectionEnd;
          } catch (ignore) {
            // Some input types don't allow cursor manipulation
          }
          return cursors;
        },

        setTextAlign: function(align) {
          if (align === "left" && !this.isEnabled()) {
            align = "right";
          }
          this.setStyle("input", {
            "text-align": align
          });
        },

        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-align
         * @returns {String} a CSS text alignment
         */
        getTextAlign: function() {
          return this.getStyle("input", "text-align");
        },

        destroy: function() {
          this._inputElement = null;
          $super.destroy.call(this);
        }

      };
    });
    cls.WidgetFactory.register('SpinEdit', cls.SpinEditWidget);
  });
