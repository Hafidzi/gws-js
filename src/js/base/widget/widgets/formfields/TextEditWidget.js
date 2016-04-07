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

modulum('TextEditWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * TextEdit widget.
     * @class classes.TextEditWidget
     * @extends classes.TextWidgetBase
     */
    cls.TextEditWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.TextEditWidget.prototype */
      return {
        __name: "TextEditWidget",
        /**
         * @type Element
         */
        _inputElement: null,
        _hasHTMLContent: false,
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutInformation.forcedMinimalWidth = 20;
          this._layoutInformation.forcedMinimalHeight = 20;
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._inputElement = this._element.getElementsByTagName("textarea")[0];
          this._initEvents();

          context.keyboard(this._element).bind(['enter', 'up', 'down'], function(evt) {
            evt.stopPropagation();
          }.bind(this));
        },

        _initEvents: function() {
          this._inputElement.on('blur.TextEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.blur, event);
          }.bind(this));
          this._inputElement.on('focus.TextEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          }.bind(this));
          this._inputElement.on('keyup.TextEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.change, event, true);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['home'], function(event) {
            event.stopPropagation();
            this.setCursors(0);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['end'], function(event) {
            event.stopPropagation();
            var len = this.getValue().length;
            this.setCursors(len);
          }.bind(this));
        },

        /**
         * @param {string} value the value to display
         */
        setValue: function(value) {
          if (this._hasHTMLContent === true) {
            this._inputElement.innerHTML = value;
          } else {
            this._inputElement.value = value;
          }
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          if (this._hasHTMLContent === true) {
            return this._inputElement.innerHTML;
          } else {
            return this._inputElement.value;
          }
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
        setMaxLength: function(maxlength) {
          this._inputElement.setAttribute("maxlength", maxlength);
        },

        /**
         * @returns {number} the maximum number of characters allowed in the field
         */
        getMaxLength: function() {
          return this._inputElement.getIntAttribute("maxlength");
        },

        /**
         * When cursor2 === cursor, it is a simple cursor set
         * @param {int} cursor the selection range beginning
         * @param {int} cursor2 the selection range end, if any
         */
        setCursors: function(cursor, cursor2) {
          if (!cursor2) {
            cursor2 = cursor;
          } else if (cursor2 === -1) {
            //cursor2 = this.getValue().length;
            cursor2 = cursor;
          }
          this._inputElement.setCursorPosition(cursor, cursor2);
        },

        getCursors: function() {
          return {
            start: this._inputElement.selectionStart,
            end: this._inputElement.selectionEnd
          };
        },
        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._inputElement.disabled = !enabled;
        },

        /**
         *
         * @param {Element} jcontrol
         */
        setHtmlControl: function(jcontrol) {
          if (this.isEnabled()) {
            jcontrol.setAttribute("contenteditable", true);
          }
          var value = this.getValue();
          jcontrol.innerHTML = value;
          this._inputElement.replaceWith(jcontrol);
          this._hasHTMLContent = true;
          this._inputElement = jcontrol;
          this._initEvents();
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._inputElement.domFocus(bufferedText);
          $super.setFocus.call(this, bufferedText);
        },
        setRows: function(rows) {
          this._inputElement.setAttribute("rows", rows || 1);
        },

        setWrapPolicy: function(format) {
          this._inputElement.toggleClass("breakword", format === "anywhere");
        },

        destroy: function() {
          this._inputElement.off('blur.TextEditWidget');
          this._inputElement.off('focus.TextEditWidget');
          this._inputElement.off('keyup.TextEditWidget');
          this._inputElement = null;
          $super.destroy.call(this);
        }
      };
    });
    cls.WidgetFactory.register('TextEdit', cls.TextEditWidget);
  });
