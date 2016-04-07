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

modulum('KeyboardHelper', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Helper to attach keyboard navigation to a widget.
     * @class classes.KeyboardHelper
     */
    cls.KeyboardHelper = context.oo.Singleton(function() {
      /** @lends classes.KeyboardHelper */
      return {
        __name: "KeyboardHelper",

        bindKeyboardNavigation: function(element, widget) {
          context.keyboard(element).bind(['up'], function(evt) {
            if (widget.navigateTo) {
              widget.navigateTo(-1, true);
            }
            return false;
          }.bind(this));
          context.keyboard(element).bind(['down'], function(evt) {
            if (widget.navigateTo) {
              widget.navigateTo(+1, false);
            }
            return false;
          }.bind(this));
          context.keyboard(element).bind(['pageup'], function(evt) {
            if (widget.navigateTo) {
              widget.navigateTo(-10, true);
            }
            return false;
          }.bind(this));
          context.keyboard(element).bind(['pagedown'], function(evt) {
            if (widget.navigateTo) {
              widget.navigateTo(+10, false);
            }
            return false;
          }.bind(this));
          context.keyboard(element).bind(['home'], function(evt) {
            if (widget.navigateTo) {
              widget.navigateTo(0, true);
            }
            return false;
          }.bind(this));
          context.keyboard(element).bind(['end'], function(evt) {
            if (widget.navigateTo) {
              widget.navigateTo(0, false);
            }
            return false;
          }.bind(this));
          context.keyboard(element).bind(['enter'], function(evt) {
            widget.emit(context.constants.widgetEvents.enter, evt);
          }.bind(this));
          context.keyboard(element).bind(['space'], function(evt) {
            widget.emit(context.constants.widgetEvents.space, evt);
          }.bind(this));

        },

        unbindKeyboardNavigation: function(element) {
          context.keyboard(element).unbind(['up', 'left']);
          context.keyboard(element).unbind(['down', 'right']);
          context.keyboard(element).unbind(['pageup']);
          context.keyboard(element).unbind(['pagedown']);
          context.keyboard(element).unbind(['home']);
          context.keyboard(element).unbind(['end']);
        },

        isDecimal: function(event) {
          return /[0-9]/.test(String.fromCharCode(event.which)) || // numbers
            event.which === 45 || // - key
            event.which === 46 || // decimal key
            event.which === 43; // + key
        },

        isSpecialCommand: function(event) {
          return event.which <= 0 || // arrow keys
            event.which === 8 || // delete key
            event.metaKey; // cmd/ctrl
        },

        isNumeric: function(char) {
          return /[0-9]/.test(char); // + key
        },

        isLetter: function(char) {
          return /[A-Za-z\u00C0-\u017F]/.test(char); // alphabetic characters + special accent chars
        },

        /**
         * Validate new number with typed char at specified position
         * @param initialValue
         * @param position
         * @param typedChar
         * @param min
         * @param max
         * @returns {boolean}
         */
        validateNumber: function(initialValue, position, typedChar, min, max) {
          var newVal = "";
          if (position === 0) {
            newVal = typedChar + initialValue;
          } else {
            newVal = initialValue.substr(0, position) + typedChar + initialValue.substr(position);
          }
          if (newVal === '-' || newVal === '+') {
            return true;
          } else {
            var newNumber = parseInt(newVal, 10);
            return !isNaN(newVal) && (!min || newNumber >= min) && (!max || newNumber <= max);
          }
        }
      };
    });
  });
