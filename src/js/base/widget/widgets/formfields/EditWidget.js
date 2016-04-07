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

modulum('EditWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Edit widget.
     * @class classes.EditWidget
     * @extends classes.TextWidgetBase
     */
    cls.EditWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.EditWidget.prototype */
      return {
        __name: "EditWidget",
        /** @lends classes.EditWidget */
        $static: {
          _onClick: function(event) {
            this.emit(context.constants.widgetEvents.click, event);
          },
          _onKeyUp: function(event) {
            this.emit(context.constants.widgetEvents.change, event);
          },
          _onFocus: function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          },
          _onBlur: function(event) {
            if (window.browserInfo.isFirefox) {
              this.setCursors(0, 0);
            }
            this.emit(context.constants.widgetEvents.blur, event);
          }
        },

        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        /**
         * @type Element
         */
        _inputElement: null,
        _completerWidget: null,
        _inputType: "text",
        _maxLength: -1,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._inputElement = this._element.getElementsByTagName("input")[0];
          this._element.on('click.EditWidget', cls.EditWidget._onClick.bind(this));
          this._inputElement.on('keyup.EditWidget', cls.EditWidget._onKeyUp.bind(this));
          this._inputElement.on('focus.EditWidget', cls.EditWidget._onFocus.bind(this));
          this._inputElement.on('blur.EditWidget', cls.EditWidget._onBlur.bind(this));
          context.keyboard(this._inputElement).bind(['home'], function(event) {
            event.stopPropagation();
            this.setCursors(0);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['end'], function(event) {
            event.stopPropagation();
            this.setCursors(this.getValue().length);
          }.bind(this));
        },

        getInput: function() {
          return this._inputElement;
        },

        /**
         * @param {boolean} readonly true to set the widget as read-only, false otherwise
         */
        setReadOnly: function(readonly) {
          if (readonly) {
            this._inputElement.setAttribute("readonly", "readonly");
          } else {
            this._inputElement.removeAttribute("readonly");
          }
        },

        /**
         * @returns {boolean} true if the widget is read-only, false otherwise
         */
        isReadOnly: function() {
          return !!this._inputElement.getAttribute("readonly");
        },

        /**
         * @param {number} maxlength maximum number of characters allowed in the field
         */
        setMaxLength: function(maxlength, callback) {
          if (maxlength) {
            this._maxLength = maxlength;
            this._inputElement.setAttribute("maxlength", maxlength);

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

        _timer: null,
        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-align
         * @param align {String} a CSS text alignment. null restores the default value.
         */
        setTextAlign: function(align) {
          this.setStyle(">input", {
            "text-align": align
          });
        },

        setCols: function(cols) {
          this._inputElement.setAttribute("size", cols);
        },
        /**
         * @see http://www.w3.org/wiki/CSS/Properties/text-align
         * @returns {String} a CSS text alignment
         */
        getTextAlign: function() {
          return this.getStyle(">input", "text-align");
        },

        /**
         * @param {string} value sets the value to display
         */
        setValue: function(value) {
          this._inputElement.value = value;
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          return this._inputElement.value;
        },

        /**
         * When cursor2 === cursor, it is a simple cursor set
         * @param {int} cursor the selection range beginning (-1 for end)
         * @param {int} cursor2 the selection range end, if any
         */
        setCursors: function(cursor, cursor2) {
          if (!cursor2) {
            cursor2 = cursor;
          }
          if (cursor2 && cursor2 < 0) {
            cursor2 = this.getValue().length;
          }
          var oldCursors = this.getCursors();

          if (oldCursors.start !== cursor || oldCursors.end !== cursor2) { // fix for ie11, gbc-393
            this._inputElement.setCursorPosition(cursor, cursor2);
          }
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

        /**
         * @param {boolean} isPassword true if the widget should be in 'password' mode, false otherwise
         */
        setIsPassword: function(isPassword) {
          if (!!isPassword) {
            this._inputElement.setAttribute("type", "password");
          } else {
            this.setType(this._inputType);
          }
        },

        /**
         * @returns {boolean} true if the widget is in 'password' mode, false otherwise
         */
        isPassword: function() {
          return this._inputElement.getAttribute("type") === "password";
        },

        _isMaxLength: function() {
          return this._maxLength !== -1 && this._inputElement.value.length >= this._maxLength &&
            this._inputElement.selectionStart === this._inputElement.selectionEnd;
        },

        /**
         * Used to manage the keyboardHint.
         * @param {string} valType the type attribute value to set
         */
        setType: function(valType) {
          this._inputType = valType;
          if (!this.isPassword()) {
            this._inputElement.setAttribute("type", valType);
            if (window.browserInfo.isFirefox) {
              // sad old browser patch
              this._inputElement.setAttribute("step", valType === "number" ? "any" : null);
            }
          }
        },
        /**
         * @returns {String} this Edit current type
         */
        getType: function() {
          return this._inputType;
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._inputElement.domFocus(bufferedText);
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
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._inputElement.disabled = !enabled;
        },

        destroy: function() {
          if (this._input) {
            this._inputElement.off("keyup.EditWidget");
            this._inputElement.off("focus.EditWidget");
            this._inputElement.off("blur.EditWidget");
            this._inputElement.remove();
            this._inputElement = null;
          }
          this._element.off("click.EditWidget");
          $super.destroy.call(this);
        }
      };
    });
    cls.WidgetFactory.register('Edit', cls.EditWidget);
  });
