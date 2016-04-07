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

modulum('ButtonEditWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * ButtonEdit widget.
     * @class classes.ButtonEditWidget
     * @extends classes.TextWidgetBase
     */
    cls.ButtonEditWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.ButtonEditWidget.prototype */
      return {
        __name: "ButtonEditWidget",
        /**
         * @type {classes.EditWidget}
         */
        _edit: null,
        /**
         * @type {classes.ButtonWidget}
         */
        _button: null,
        __dataContentPlaceholderSelector: '.gbc_dataContentPlaceholder',

        constructor: function() {
          $super.constructor.call(this);
          this.setFocusable(true);
        },

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutEngine.setReservedDecorationSpace(2);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._edit = cls.WidgetFactory.create("Edit");
          this._button = cls.WidgetFactory.create("Button");
          this._element.appendChild(this._edit.getElement());
          this._element.appendChild(this._button.getElement());
          this._edit.setParentWidget(this);
          this._button.setParentWidget(this);
          this._button.on(context.constants.widgetEvents.click, function(event, sender, domEvent) {
            if (this.isEnabled()) {
              this.emit(context.constants.widgetEvents.focus, domEvent);
              this.emit(context.constants.widgetEvents.click, domEvent);
            }
          }.bind(this));
          this._element.on('focus.ButtonEditWidget', function() {
            this._edit.getElement().domFocus();
          }.bind(this));

          this._element.on('blur.ButtonEditWidget', function() {
            this._edit.getElement().blur();
          }.bind(this));
          this._edit.on(context.constants.widgetEvents.focus, function(event, sender, domEvent) {
            this.emit(context.constants.widgetEvents.focus, domEvent);
          }.bind(this));
          this._edit.on(context.constants.widgetEvents.blur, function(event, sender, domEvent) {
            this.emit(context.constants.widgetEvents.blur, domEvent);
          }.bind(this));
          this._edit.on(context.constants.widgetEvents.change, function(event, sender, domEvent, isTextEntry) {
            this.emit(context.constants.widgetEvents.change, domEvent, isTextEntry);
          }.bind(this));
        },

        destroy: function() {
          this._element.off('focus.ButtonEditWidget');
          this._element.off('blur.ButtonEditWidget');
          this._edit.destroy();
          this._edit = null;
          this._button.destroy();
          this._button = null;
          $super.destroy.call(this);
        },
        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          this._edit.setTitle(title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._edit.getTitle();
        },

        /**
         * @param {boolean} readonly true to set the edit part as read-only, false otherwise
         */
        setReadOnly: function(readonly) {
          this._edit.setReadOnly(readonly);
        },

        /**
         * @returns {boolean} true if the edit part is read-only, false otherwise
         */
        isReadOnly: function() {
          return this._edit.isReadOnly();
        },

        /**
         * @param {number} maxlength maximum number of characters allowed in the field
         */
        setMaxLength: function(maxlength) {
          this._edit.setMaxLength(maxlength);
        },

        /**
         * @returns {number} the maximum number of characters allowed in the field
         */
        getMaxLength: function() {
          return this._edit.getMaxLength();
        },

        /**
         * When cursor2 === cursor, it is a simple cursor set
         * @param {int} cursor the selection range beginning
         * @param {int} cursor2 the selection range end, if any
         */
        setCursors: function(cursor, cursor2) {
          this._edit.setCursors(cursor, cursor2);
        },
        getCursors: function() {
          return this._edit.getCursors();
        },
        /**
         * @param {string} value the value to display in the edit part
         */
        setValue: function(value) {
          this._edit.setValue(value);
        },

        /**
         * @returns {string} the value displayed in the edit part
         */
        getValue: function() {
          return this._edit.getValue();
        },

        /**
         * @param {string} image the URL of the image to display in the button part
         */
        setImage: function(image) {
          this._button.setImage(image);
        },

        /**
         * @returns {string} the URL of the image displayed in the button part
         */
        getImage: function() {
          return this._button.getImage();
        },

        setAutoScale: function(enabled) {
          this._button.setAutoScale(enabled);
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._edit.setEnabled(enabled);
        },
        /**
         * @returns {boolean} true if the button is enabled, false otherwise
         */
        isEnabled: function() {
          return this._edit.isEnabled();
        },
        /**
         * @param {boolean} enabled true if the button should be enabled, false otherwise
         */
        setButtonEnabled: function(enabled) {
          this._button.setEnabled(enabled);
        },

        /**
         * @returns {boolean} true if the button is enabled, false otherwise
         */
        isButtonEnabled: function() {
          return this._button.isEnabled();
        },

        /**
         * @param {boolean} isPassword true if the widget should be in 'password' mode, false otherwise
         */
        setIsPassword: function(isPassword) {
          this._edit.setIsPassword(isPassword);
        },

        /**
         * @returns {boolean} true if the widget is in 'password' mode, false otherwise
         */
        isPassword: function() {
          return this._edit.isPassword();
        },

        /**
         * Used to manage the keyboardHint.
         * @param {string} valType the type attribute value to set
         */
        setType: function(valType) {
          this._edit.setType(valType);
        },

        /**
         * @returns {String} this Edit current type
         */
        getType: function() {
          return this._edit.getType();
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._edit.setFocus(bufferedText);
          $super.setFocus.call(this, bufferedText);
        },

        /**
         * Will add a completer to the edit
         */
        addCompleterWidget: function() {
          if (!this._completerWidget) {
            this._completerWidget = cls.WidgetFactory.create("Completer");
            this._completerWidget.addCompleterWidget(this);
          }
        },

        /**
         * @inheritDoc
         */
        setColor: function(color) {
          this._edit.setColor(color);
        },

        /**
         * @inheritDoc
         */
        getColor: function() {
          return this._edit.getColor();
        },

        /**
         * @inheritDoc
         */
        setBackgroundColor: function(color) {
          this._edit.setBackgroundColor(color);
        },

        /**
         * @inheritDoc
         */
        getBackgroundColor: function() {
          return this._edit.getBackgroundColor();
        }
      };
    });
    cls.WidgetFactory.register('ButtonEdit', cls.ButtonEditWidget);
  });
