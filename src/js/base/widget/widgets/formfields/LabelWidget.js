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

modulum('LabelWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Label widget.
     * @class classes.LabelWidget
     * @extends classes.TextWidgetBase
     */
    cls.LabelWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.LabelWidget.prototype */
      return {
        __name: "LabelWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        /**
         * @type {Element}
         */
        _textContent: null,
        _hasHTMLContent: false,
        _value: null,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutInformation.forcedMinimalWidth = 16;
          this._layoutInformation.forcedMinimalHeight = 16;
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._textContent = this._element.getElementsByTagName('span')[0];
          this._element.on('click.LabelWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
            this.emit(context.constants.widgetEvents.click, event);
          }.bind(this));
        },

        /**
         * @param {string} value sets the value to display
         */
        setValue: function(value) {
          this.getLayoutInformation().invalidateInitialMeasure(!this._value && !!value);
          this._value = value;
          if (this._hasHTMLContent === true) {
            this._textContent.innerHTML = value;
          } else {
            if (!!value || value === 0 || value === false) {
              this._textContent.textContent = value;
            } else {
              this._textContent.textContent = '\u00a0';
            }
          }
          this.getLayoutInformation().invalidateMeasure();
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          if (this._hasHTMLContent === true) {
            return this._textContent.innerHTML;
          } else {
            if (this._textContent.textContent === '\u00a0') {
              return "";
            }
            return this._textContent.textContent;
          }
        },

        setFocus: function() {
          this._element.domFocus();
        },

        setHtmlControl: function(jcontrol) {
          var value = this.getValue();
          jcontrol.innerHTML = value;
          jcontrol.addClass("textContent");
          this._textContent.replaceWith(jcontrol);
          this._textContent = jcontrol;
        }
      };
    });
    cls.WidgetFactory.register('Label', cls.LabelWidget);
  });
