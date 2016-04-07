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

modulum('ComboBoxWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Combobox widget.
     * @class classes.ComboBoxWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ComboBoxWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ComboBoxWidget.prototype */
      return {
        __name: "ComboBoxWidget",
        _selectedWidget: null,
        _dropDown: null,
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        _typedLetters: [],
        _typedLettersCacheHandler: null,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.ComboBoxLayoutEngine(this);
        },

        _initContainerElement: function() {
          $super._initContainerElement.call(this);

          this._selectedWidget = cls.WidgetFactory.create("ValueLabel");
          this._selectedWidget.setFocusable(false);
          this.addChildWidget(this._selectedWidget);

          this._dropDown = cls.WidgetFactory.create("ChoiceDropDown");
          this._dropDown.setParentWidget(this);

          /* Click events */
          this._element.on('click.ComboBoxWidget', function(event) {
            event.stopPropagation();
            this._dropDown.toggle();
          }.bind(this));

          this.on(context.constants.widgetEvents.focus, function() {
            this.getElement().domFocus();
          }.bind(this));

          this._element.on('blur.ComboBoxWidget', function() {
            if (!this._dropDown.isVisible()) {
              this.emit(context.constants.widgetEvents.blur);
            }
          }.bind(this));
          /* Bind dropdown navigation keyboard to combo */
          this._element.on('keypress.ComboBoxWidget', function(event) {
            if (event.which <= 0) // arrows key (for firefox)
            {
              return true;
            }
            var char = String.fromCharCode(event.which).toLowerCase();

            this._typedLetters.push(char);
            clearTimeout(this._typedLettersCacheHandler);
            this._typedLettersCacheHandler = setTimeout(this._clearTypedLettersCache.bind(this), 500);

            var children = this._dropDown.getChildren();
            var len = children.length;
            var letters = this._typedLetters.join("");
            for (var i = 0; i < len; i++) {
              var currentChild = children[i];
              var childText = currentChild.getText();
              if (childText && childText.toLowerCase().startsWith(letters)) {
                if (this._dropDown.isVisible()) {
                  this._dropDown.navigateTo(i);
                } else {
                  this.setValue(currentChild.getValue());
                }
                break;
              }
            }

          }.bind(this));

          cls.KeyboardHelper.bindKeyboardNavigation(this._element, this);

          context.keyboard(this._element).bind(['left'], function(evt) {
            if (this.navigateTo) {
              this.navigateTo(-1, true);
            }
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['right'], function(evt) {
            if (this.navigateTo) {
              this.navigateTo(+1, false);
            }
            return false;
          }.bind(this));
          this.on(context.constants.widgetEvents.space, function(event, sender, domEvent) {
            this._dropDown.toggle();
            //return false;
          }.bind(this));
          this.on(context.constants.widgetEvents.enter, function(event, sender, domEvent) {
            this._dropDown.emit(context.constants.widgetEvents.enter, domEvent);
          }.bind(this));

        },

        _clearTypedLettersCache: function() {
          this._typedLetters.length = 0;
        },

        destroy: function() {
          this.getElement().off('click.ComboBoxWidget');
          this.getElement().off('blur.ComboBoxWidget');
          this._typedLetters.length = 0;
          this._dropDown.destroy();
          this._dropDown = null;
          this._selectedWidget.destroy();
          this._selectedWidget = null;
          $super.destroy.call(this);
        },
        /**
         * Returns position of current value
         * @returns {Number}
         * @private
         */
        _getCurrentPosition: function() {
          return this._dropDown.getValueIndex(this.getValue());
        },

        /**
         * Manage keyboard navigation over dropdown children.
         * If dropdown is not visible, navigation directly set value.
         * If dropdown is visible, leave dropdown manage work by emiting events
         * @param {Number} jump position requested over current position
         * @param {Boolean} if true, indicates navigation is going to previous items, otherwise to next items
         * @private
         */
        navigateTo: function(jump, up) {
          if (!this._dropDown.isVisible()) {
            var pos = 0;
            var childsLength = this._dropDown.getChildren().length;
            if (up === false && jump === 0) {
              jump = childsLength;
            }
            if (jump !== 0 && jump !== childsLength - 1) {
              pos = this._getCurrentPosition() + jump;
              if (pos < 0) {
                pos = 0;
              } else if (pos >= childsLength - 1) {
                pos = childsLength - 1;
              }
            } else {
              pos = jump;
            }
            if (this._dropDown.getChildren()[pos]) {
              this.setValue(this._dropDown.getChildren()[pos].getValue());
            }
          } else {
            this._dropDown.jumpTo(jump, up);
          }
        },

        /**
         * @param {string} single value label
         */
        _addChoice: function(choice) {
          var label = cls.WidgetFactory.create("ValueLabel");
          label.setText(choice.text);
          label.setValue(choice.value);
          this._dropDown.addChildWidget(label);
        },

        /**
         * @param {string|string[]} choices adds a single or a list of choices
         */
        addChoices: function(choices) {
          if (choices) {
            //this._choices = choices;
            if (Object.isArray(choices)) {
              for (var i = 0; i < choices.length; i++) {
                this._addChoice(choices[i]);
              }
            } else {
              this._addChoice(choices);
            }
          }
        },

        clearChoices: function() {
          var children = this._dropDown.getChildren().clone();
          var childenLength = children.length;
          if (childenLength > 0) {
            for (var i = 0; i < childenLength; i++) {
              this._dropDown.removeChildWidget(children[i]);
            }
          }
        },

        showDropDown: function() {
          this._dropDown.show(true, true);
        },

        /**
         * Get text associated to value in choices list
         * @param value
         * @returns {*}
         */
        getChoiceText: function(value) {
          var text = "";
          for (var i = 0; i < this._dropDown.getChildren().length; i++) {
            var choice = this._dropDown.getChildren()[i];
            if (choice.getValue() === value) {
              text = choice.getText();
              break;
            }
          }
          return text;
        },

        /**
         * @returns {string} the currently selected value
         */
        getValue: function() {
          return this._selectedWidget.getValue();
        },

        /**
         * @param {string} value changes the currently selected value
         */
        setValue: function(value) {
          if (this._selectedWidget.getValue() !== value) {
            this._selectedWidget.setValue(value);
            this._selectedWidget.setText(this.getChoiceText(value));
            this.emit(context.constants.widgetEvents.change, value);
          }
        },

        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          this.getElement().setAttribute("title", title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this.getElement().getAttribute("title");
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          $super.setFocus.call(this, bufferedText);
          this._element.domFocus();
          this._dropDown.show(true);
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);

          this._selectedWidget.setEnabled(enabled);
          this._dropDown.setEnabled(enabled);
          this._element.toggleClass('disabled', !enabled);
        }
      };
    });
    cls.WidgetFactory.register('ComboBox', cls.ComboBoxWidget);
  });
