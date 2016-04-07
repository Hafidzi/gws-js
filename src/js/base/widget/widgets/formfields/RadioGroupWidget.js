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

modulum('RadioGroupWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * RadioGroup widget.
     * @class classes.RadioGroupWidget
     * @extends classes.TextWidgetBase
     */
    cls.RadioGroupWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.RadioGroupWidget.prototype */
      return {
        __name: "RadioGroupWidget",
        /**
         * currently aimed item
         * @type {number}
         */
        _currentAimIndex: 0,

        /** @type {classes.FocusTracker} */
        _focusTracker: null,

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
          this._focusTracker = new cls.FocusTracker(this._element);
          this._focusTracker.on(context.constants.widgetEvents.blur, function(event, sender, domEvent) {
            this.emit(context.constants.widgetEvents.blur, domEvent);
          }.bind(this));
          this._focusTracker.on(context.constants.widgetEvents.focus, function(event, sender, domEvent) {
            this.emit(context.constants.widgetEvents.focus, domEvent);
          }.bind(this));
          $(this._element).on('click', '>.gbc_RadioGroupItem', function(evt) {
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            var item = $(evt.target).closest('.gbc_RadioGroupItem')[0];
            this._currentAimIndex = 0;
            for (; item.previousElementSibling; item = item.previousElementSibling) {
              ++this._currentAimIndex;
            }
            this._prepareValue(this._currentAimIndex, true, evt);
          }.bind(this));
          context.keyboard(this._element).bind(['up', 'left'], function(evt) {
            this._currentAimIndex = (this._currentAimIndex <= 0) ? this._element.children.length - 1 : (this._currentAimIndex -
              1);
            this._prepareValue(this._currentAimIndex, false, evt);
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['down', 'right'], function(evt) {
            this._currentAimIndex = (this._currentAimIndex >= (this._element.children.length - 1)) ? 0 : (this._currentAimIndex +
              1);
            this._prepareValue(this._currentAimIndex, false, evt);
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['space'], function(evt) {
            this._prepareValue(this._currentAimIndex, true, evt);
            return false;
          }.bind(this));
        },

        /**
         *
         * @param {value} return index of value in _values array
         * @private
         */
        _indexOf: function(value) {
          for (var i = 0; i < this._element.children.length; ++i) {
            if (this._element.children[i].getAttribute("data-value") === value.toString()) {
              return i;
            }
          }
          return -1;
        },

        /**
         * @param {string} choice adds a choice to the list
         * @private
         */
        _addChoice: function(choice) {
          var button = $(
            '<div class="gbc_RadioGroupItem" data-value="' + choice.value + '"tabindex="0">' +
            '<div class="mt-radiobutton">' +
            '<div class="mt-radiobutton-mark"></div>' +
            '</div>' +
            '<span>' + choice.text + '</span>' +
            '</div>'
          );
          button.appendTo(this._element);
          this._focusTracker.addItem(button[0]);
        },

        /**
         * @param {number} index removes a choice at the given index
         * @private
         */
        _removeChoiceAt: function(index) {
          $($(this._element).find('>.gbc_RadioGroupItem')[index]).remove();
        },

        /**
         * @param {string} choice removes the given choice
         * @private
         */
        _removeChoice: function(choice) {
          var index = this._indexOf(choice.value);
          if (index >= 0) {
            this._removeChoiceAt(index);
          }
        },

        /**
         * @param {string|string[]} choices adds a single or a list of choices
         */
        addChoices: function(choices) {
          if (choices) {
            if (Object.isArray(choices)) {
              for (var i = 0; i < choices.length; i++) {
                this._addChoice(choices[i]);
              }
            } else {
              this._addChoice(choices);
            }
          }
        },

        /**
         * @param {(string|string[])} choices removes a single or a list of choices
         */
        removeChoices: function(choices) {
          if (choices) {
            if (Object.isArray(choices)) {
              for (var i = 0; i < choices.length; i++) {
                this._removeChoice(choices[i]);
              }
            } else {
              this._removeChoice(choices);
            }
          }
        },

        /**
         * Clears all choices
         */
        clearChoices: function() {
          while (this._element.children.length !== 0) {
            $(this._element.children[0]).remove();
          }
        },

        /**
         * @param {string} orientation layout orientation. 'vertical' or 'horizontal'.
         */
        setOrientation: function(orientation) {
          $(this._element).toggleClass('gbc_RadioGroupWidget_horizontal', orientation === "horizontal");
          $(this._element).toggleClass('gbc_RadioGroupWidget_vertical', orientation === "vertical");
        },

        /**
         * @returns {string} the layout orientation. 'vertical' or 'horizontal'.
         */
        getOrientation: function() {
          if ($(this._element).hasClass('gbc_RadioGroupWidget_horizontal')) {
            return 'horizontal';
          } else {
            return 'vertical';
          }
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          for (var i = 0; i < this._element.children.length; ++i) {
            var item = this._element.children[i];
            if (item.querySelector(".mt-radiobutton").hasClass('checked')) {
              return item.getAttribute('data-value');
            }
          }
          return '';
        },

        /**
         * @param {string} value the value to display
         */
        setValue: function(value) {
          for (var i = 0; i < this._element.children.length; ++i) {
            var item = this._element.children[i];
            item.querySelector('.mt-radiobutton').toggleClass('checked', item.getAttribute("data-value") === value.toString());
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
            if (doSetValue || $(this._element).find(".checked").length !== 0) {
              for (var i = 0; i < this._element.children.length; ++i) {
                var item = $(this._element.children[i]).find('.mt-radiobutton');
                item.toggleClass('checked', i === index && !item.hasClass('checked'));
              }
              this.emit(context.constants.widgetEvents.change, event, false);
            }
          }
        },

        _updateVisualAim: function() {
          for (var i = 0; i < this._element.children.length; ++i) {
            var item = $(this._element.children[i]);
            item.toggleClass('aimed', i === this._currentAimIndex);
          }
        },
        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          $(this._element).toggleClass('disabled', !enabled);
          for (var i = 0; i < this._element.children.length; ++i) {
            var item = $(this._element.children[i]).find('.mt-radiobutton');
            item.toggleClass('disabled', !enabled);
          }
        },
        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          cls.FocusHelper.setInputFocus(this._element, "");
          this._updateVisualAim();
          $super.setFocus.call(this, bufferedText);
        }
      };
    });
    cls.WidgetFactory.register('RadioGroup', cls.RadioGroupWidget);
  });
