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

modulum('DummyTextEditWidget', ['TextEditWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * TextEdit widget.
     * @class classes.DummyTextEditWidget
     * @extends classes.TextEditWidget
     */
    cls.DummyTextEditWidget = context.oo.Class(cls.TextEditWidget, function($super) {
      /** @lends classes.DummyTextEditWidget.prototype */
      return {
        __name: "DummyTextEditWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutInformation.forcedMinimalWidth = 20;
          this._layoutInformation.forcedMinimalHeight = 20;
        },

        setEditable: function(editable) {},

        setHtmlControl: function(jcontrol) {
          var value = this.getValue();
          jcontrol.innerHTML = value;
          this._inputElement.replaceWith(jcontrol);
          this._hasHTMLContent = true;
          this._inputElement = jcontrol;
        },

        /**
         * @param {string} value the value to display
         */
        setValue: function(value) {
          this._inputElement.value = value;
        },

        /**
         * @param {boolean} readonly true to set the widget as read-only, false otherwise
         */
        setReadOnly: function(readonly) {

        },

        /**
         * @param {number} maxlength maximum number of characters allowed in the field
         */
        setMaxLength: function(maxlength) {

        },

        /**
         * When cursor2 === cursor, it is a simple cursor set
         * @param {int} cursor the selection range beginning
         * @param {int} cursor2 the selection range end, if any
         */
        setCursors: function(cursor, cursor2) {

        }

      };
    });
    cls.WidgetFactory.register('DummyTextEdit', cls.DummyTextEditWidget);
  });
