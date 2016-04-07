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

modulum('FocusHelper', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Helpers for time related widgets.
     * @class classes.FocusHelper
     */
    cls.FocusHelper = context.oo.Singleton(function() {
      /** @lends classes.FocusHelper */
      return {
        __name: "FocusHelper",

        /**
         * @param {Element} input a text input element
         * @param {string} bufferedText the buffered text to insert
         */
        setInputFocus: function(input, bufferedText) {
          input.domFocus();
          if (bufferedText && bufferedText.length !== 0) {
            var selectionStart = input.selectionStart;
            var selectionEnd = input.selectionEnd;
            var value = input.value;
            value = value.substr(0, selectionStart) + bufferedText + value.substr(selectionEnd);
            input.value = value;
            input.setCursorPosition(selectionStart + bufferedText.length);
          }
        }
      };
    });
  });
