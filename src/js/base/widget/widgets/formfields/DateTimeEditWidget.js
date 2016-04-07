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

modulum('DateTimeEditWidget', ['DateEditWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * DateTimeEdit widget.
     * @class classes.DateTimeEditWidget
     * @extends classes.DateEditWidget
     */
    cls.DateTimeEditWidget = context.oo.Class(cls.DateEditWidget, function($super) {
      /** @lends classes.DateTimeEditWidget.prototype */
      return {
        __name: "DateTimeEditWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        _showSeconds: false,
        _button: null,
        _displayFormat: null,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this, true);
          // default datetime format
          this._displayFormat = "MM/DD/YYYY HH:mm:ss";
        },

        _getPickerConf: function() {
          var pickerConf = $super._getPickerConf.call(this);
          pickerConf.showTime = true;
          pickerConf.showSeconds = this._showSeconds;
          pickerConf.onSelect = null;
          return pickerConf;
        },

        /**
         * Update date time format
         * @param format
         */
        setFormat: function(format) {
          this._displayFormat = format;
          this._showSeconds = !!~format.toLowerCase().indexOf("s");
          if (this._picker) {
            this._picker.destroy();
          }
          this.initDatePicker();
        },

        /**
         * @param {string} value the datetime to display
         */
        setValue: function(value) {
          if (value) {
            $super.setValue.call(this, value);
          }
        },

        destroy: function() {
          $super.destroy.call(this);
        }

      };
    });
    cls.WidgetFactory.register('DateTimeEdit', cls.DateTimeEditWidget);
  });
