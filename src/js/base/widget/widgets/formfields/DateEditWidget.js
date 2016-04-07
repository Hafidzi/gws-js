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

modulum('DateEditWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * DateEdit widget.
     * @class classes.DateEditWidget
     * @extends classes.TextWidgetBase
     */
    cls.DateEditWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.DateEditWidget.prototype */
      return {
        __name: "DateEditWidget",

        /** @lends classes.DateEditWidget */
        $static: {
          pikaDaysList: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        },
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        _displayFormat: null,
        _disabledDays: [],
        _disableDayFn: null,
        _dropDown: null,
        _buttonOk: null,
        _buttonCancel: null,
        _useMingGuoYears: false,
        _inputElement: null,
        //_pickerIcon: null,
        _dateObj: null,
        _pictureMask: null,
        _validValue: null,
        _mustValid: false,
        //_userClick: false,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function(datetime) {
          $super._initElement.call(this);
          if (this._displayFormat === null) {
            this._displayFormat = "MM/DD/YYYY"; //default format
          }
          if (moment.locale() !== navigator.language) {
            moment.locale(navigator.language);
          }
          this._firstDayOfWeek = 0;

          this._inputElement = this._element.getElementsByTagName("input")[0];
          this._dropDown = cls.WidgetFactory.create("DropDown");
          this._dropDown.setParentWidget(this);

          this._dropDown.onOpen = function() {
            if (this._dropDown) {
              this._addButtonsToPicker();
            }
            this._validValue = this.getValue();
            this._mustValid = true;
          }.bind(this);
          this._dropDown.onClose = function() {
            if (this._dropDown) {
              this._removeButtonsFromPicker();
            }
            if (this._mustValid) {
              this._mustValid = false;
              this.setLastValidValue();
            }
            this._validValue = null;
          }.bind(this);

          this.initDatePicker();

          // Create button which will close dropdown
          this._buttonCancel = cls.WidgetFactory.create("Button");
          this._buttonCancel.setFlat(true);
          this._buttonCancel.setText("Cancel");
          /*this._buttonCancel.setParentWidget(this._dropDown);
          this._dropDown.getElement().appendChild(this._buttonCancel.getElement());*/

          this._buttonOk = cls.WidgetFactory.create("Button");
          this._buttonOk.setFlat(true);
          this._buttonOk.setText("OK");
          /*   this._buttonOk.setParentWidget(this._dropDown);
             this._dropDown.getElement().appendChild(this._buttonOk.getElement());*/
          /*this._dropDown.addChildWidget(this._buttonOk, {
            position: 3
          });*/

          this._buttonOk.on(context.constants.widgetEvents.click, function(event, sender, domEvent) {
            this._mustValid = false;
            this._dropDown.show(false);
            this.emit(context.constants.widgetEvents.change, domEvent, false);
            //this._inputElement.domFocus();
          }.bind(this));

          this._buttonCancel.on(context.constants.widgetEvents.click, function(event, sender, domEvent) {
            this._dropDown.show(false);
            /*            this.setLastValidValue();*/
          }.bind(this));

          context.keyboard(this._inputElement).bind(['home'], function(event) {
            event.stopPropagation();
            this.setCursors(0);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['end'], function(event) {
            event.stopPropagation();
            this.setCursors(this.getValue().length);
          }.bind(this));
          this._element.on('click.DateEditWidget', function(event) {
            event.stopPropagation();
            this._dropDown.show(!this._dropDown.isVisible(), true);
          }.bind(this));
          this._inputElement.on('keyup.DateEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.change, event, true);
          }.bind(this));
          this._inputElement.on('focus.DateEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          }.bind(this));

          //if (!datetime) {
          this._inputElement.on('blur.DateEditWidget', function(event) {
            if (!this._dropDown.isVisible()) {
              this.emit(context.constants.widgetEvents.blur, event);
            } else {
              event.stopPropagation();
            }
          }.bind(this));
          //}
        },

        getInput: function() {
          return this._inputElement;
        },

        _getPickerConf: function() {
          var pickerConf = {
            field: this._inputElement,
            bound: false,
            container: this._dropDown.getElement(),
            format: this._displayFormat,
            firstDay: this._firstDayOfWeek || 0,
            showTime: false,
            disableDayFn: this._disableDayFn
          };
          if (this._useMingGuoYears) {
            pickerConf.onSelect = function(date) {
              var year = date.getFullYear();
              var mgyear = cls.DateTimeHelper.gregorianToMingGuoYears(date);
              var datestring = this.getValue().replace(year, mgyear);
              this._inputElement.value = datestring;
            }.bind(this);
          }
          return pickerConf;
        },

        _addButtonsToPicker: function() {
          var d1 = new Date();
          if (this._buttonCancel && this._buttonOk) {
            this._dropDown.addChildWidget(this._buttonCancel, {
              position: 1
            });
            this._dropDown.addChildWidget(this._buttonOk, {
              position: 1
            });
          }
        },

        _removeButtonsFromPicker: function() {
          var d1 = new Date();

          if (this._buttonCancel && this._buttonOk) {
            this._dropDown.removeChildWidget(this._buttonOk);
            this._dropDown.removeChildWidget(this._buttonCancel);
          }
        },

        initDatePicker: function() {
          if (this._picker) {
            this._picker.destroy();
          }
          var pickerConf = this._getPickerConf();
          this._picker = new Pikaday(pickerConf);
          if (this._dateObj) {
            this._picker.setMoment(this._dateObj, true);
          }
        },

        /**
         * @param {String} English name of the day to set as first day of the week
         */
        setFirstDayOfWeek: function(firstDayOfWeek) {
          if (firstDayOfWeek) {
            this._firstDayOfWeek = cls.DateEditWidget.pikaDaysList.indexOf(firstDayOfWeek);
            this.initDatePicker();
          }
        },

        /**
         * @returns {String} English name of the currently set first day of the week
         */
        getFirstDayOfWeek: function() {
          return cls.DateEditWidget.pikaDaysList[this._firstDayOfWeek];
        },

        /**
         * @returns {Array} Array of days that are disabled
         */
        getDisabledDays: function() {
          return this._disabledDays;
        },

        /**
         * @param {string} day names to disable separated with whitespace
         */
        setDisabledDays: function(disabledDays) {
          if (disabledDays) {
            var daysOffList = disabledDays.split(" ");
            this._disabledDays = daysOffList;
            var unsetThoseDays = [];
            //create a list of days to unset
            for (var d = 0; d < daysOffList.length; d++) {
              unsetThoseDays.push(cls.DateEditWidget.pikaDaysList.indexOf(daysOffList[d]));
            }

            this._disableDayFn = function(day) {
              // forEach day in current view, return a Date Object
              if (unsetThoseDays.indexOf(day.getDay()) >= 0) {
                return true; //disable this day
              }
            };
          } else {
            this._disabledDays = null;
            this._disableDayFn = null;
          }

          this.initDatePicker();
        },

        setLastValidValue: function() {
          this._inputElement.value = this._validValue;
        },

        /**
         * @returns {string} the displayed date
         */
        getValue: function() {
          return this._inputElement.value;
        },

        /**
         * @param {string} value the date to display
         */
        setValue: function(dateString) {
          if (this.getValue() !== dateString || !this._dateObj) {
            this.setDate(dateString);
          }
        },

        // Date object manipulation
        getDate: function() {
          return this._dateObj.format(this._displayFormat);
        },

        setDate: function(date) {
          if (date) {
            // created date object based on received value using known format (for datepicker)
            if (this._useMingGuoYears) { // Convert Ming Guo year to 4 digit years for datepicker
              var str = cls.DateTimeHelper.mingGuoToGregorianYears(date);
              this._dateObj = moment(str, this._displayFormat);
            } else {
              this._dateObj = moment(date, this._displayFormat);
            }

            // check date is ok and set it in date picker as current
            if (this.getDate() !== "Invalid date") {
              this._picker.setMoment(this._dateObj, true);
            }

            // set non formatted value to input (already formatted by VM depending)
            this._inputElement.value = date;
          }
        },

        setPictureMask: function(mask) {
          this._pictureMask = mask;
        },

        // Format manipulation
        setFormat: function(format) {
          if (format.match(/Y/g).length === 3) { // Ming Guo format
            this._useMingGuoYears = true;
            format = format.replace("YYY", "YYYY");
          }
          if (this._displayFormat !== format) {
            this._displayFormat = format;
            this.initDatePicker();
          }
        },

        /**
         * Force display of picker
         * @param {Boolean} visible force show if true, hide otherwise
         */
        showPicker: function(visible) {
          this._dropDown.show(visible, true);
        },

        /**
         * Return cursors position
         * @returns {Object} object with cursor & cursor2 positions
         */
        getCursors: function() {
          return {
            start: this._inputElement.selectionStart,
            end: this._inputElement.selectionEnd
          };
        },

        /** Place the cursor at the given position,
         * @param {Number} cursor  first cursor position
         * @param {Number} cursor2 second cursor position
         */
        setCursors: function(cursor, cursor2) {
          if (!cursor2) {
            cursor2 = cursor;
          }
          if (cursor2 && cursor2 < 0) {
            cursor2 = this.getValue().length;
          }
          this._inputElement.setCursorPosition(cursor, cursor2);
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
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          cls.FocusHelper.setInputFocus(this._inputElement, bufferedText);
          $super.setFocus.call(this, bufferedText);
          this._dropDown.show(true);
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._inputElement.disabled = !enabled;

          this._dropDown.setEnabled(enabled);
        },

        destroy: function() {
          if (this._picker) {
            this._picker.destroy();
            this._picker = null;
          }
          if (this._inputElement) {
            this._inputElement.remove();
            this._inputElement = null;
          }
          $super.destroy.call(this);
        }
      };
    });
    cls.WidgetFactory.register('DateEdit', cls.DateEditWidget);
  });
