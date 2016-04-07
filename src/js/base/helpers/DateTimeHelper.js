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

modulum('DateTimeHelper', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Helpers for time related widgets.
     * @class classes.DateTimeHelper
     */
    cls.DateTimeHelper = context.oo.Singleton(function() {
      /** @lends classes.DateTimeHelper */
      return {
        __name: "DateTimeHelper",

        /**
         * Transform Informix DBDATE Format (ex : MDY4/) to traditional format
         * @param dbformat
         */
        parseDbDateFormat: function(dbformat) {
          // supported DBDATE separators are '-', '/', '.' and '0'. Default is '/'. '0' means no separator
          var sep = dbformat.match(/[\.\/\-0]/) || '/';
          sep = sep.toString();
          if (sep === '0') {
            sep = "";
          }
          var format = "";
          for (var i = 0; i < 4; i++) {
            var c = dbformat[i];
            // add separator & duplicate char if 'D' or 'M'. if 'Y', multiply by its next number.
            format += (i !== 0 ? sep : "") + new Array((c === "Y" ? ~~dbformat[++i] : 2) + 1).join(c);
          }
          return format;
        },

        /**
         * Convert Date time to ISO format
         * @param datetimestring
         * @returns {*|string}
         */
        toISOFormat: function(datetimestring) {
          var currentISODateTime = "";
          if (datetimestring) {
            var split = datetimestring.split(" ");
            var d = moment(split[0], "L");
            if (!d.isValid()) {
              return datetimestring;
            }
            var dISO = d.format("YYYY-MM-DD");
            split.shift();
            var hpart = split.join(" ");
            var hasSec = hpart.split(":").length === 3;
            var h = moment(hpart, (hasSec ? "LTS" : "LT"));
            if (!h.isValid()) {
              return datetimestring;
            }
            var hISO = h.format(hasSec ? "HH:mm:ss" : "HH:mm");

            currentISODateTime = dISO + " " + hISO;

          }
          return currentISODateTime;
        },

        /**
         * Convert Date time to Locale format
         * @param datetimestring
         * @param seconds
         * @returns {string}
         */
        toLocaleFormat: function(datetimestring, seconds) {
          var localDateTime = moment(datetimestring);
          return localDateTime.format("L") + " " + localDateTime.format((seconds ? "LTS" : "LT"));
        },

        /**
         * Get client locale format
         * @param seconds
         * @returns {string}
         */
        getLocaleFormat: function(seconds) {
          var localData = moment.localeData();
          return localData.longDateFormat("L") + " " + localData.longDateFormat((seconds ? "LTS" : "LT"));
        },

        /**
         * Builds a time fragment handling object.
         * Ex: For minutes: group(60) increments from 0 to 59 and wraps.
         * @param {number} highLimit upper limit
         * @returns {{fromText: Function, increaseValue: Function, decreaseValue: Function, getText: Function}}
         */
        timeFragment: function(highLimit) {
          var limit = highLimit;
          var maxChars = String(highLimit).length;
          var value = 0;
          return {
            /**
             * @param {string} text
             * @param {boolean} force
             * @returns {boolean}
             */
            fromText: function(text, force) {
              var isComplete = true;
              var intValue = parseInt(text, 10);
              if (text.length > maxChars) {
                value = limit - 1;
              } else if (text.length === limit) {
                if (intValue >= limit) {
                  value = limit - 1;
                } else {
                  value = intValue;
                }
              } else {
                if ((intValue * 10) >= limit || force) {
                  value = intValue;
                } else {
                  isComplete = false;
                }
              }
              return isComplete;
            },
            /**
             * @returns {boolean} true if the value has wrapped.
             */
            increaseValue: function() {
              if ((value + 1) === limit) {
                value = 0;
                return true;
              } else {
                value++;
                return false;
              }
            },
            /**
             * @returns {boolean} true if the value has wrapped
             */
            decreaseValue: function() {
              if (value === 0) {
                value = limit - 1;
                return true;
              } else {
                value--;
                return false;
              }
            },
            /**
             * @returns {string} the current value
             */
            getText: function() {
              return value.pad(2);
            }
          };
        },

        /**
         * Convert traditional year of date to Ming guo year format
         * @param {String} datestring
         * @returns {String} return ming guo year
         */
        mingGuoToGregorianYears: function(datestring) {
          var str = datestring.match(/\d{3}/);
          if (str) {
            var year = str.toString();
            return datestring.replace(year, "" + (~~year + 1911));
          } else {
            return datestring;
          }
        },

        gregorianToMingGuoYears: function(date) {
          return date.getFullYear() - 1911;
        }
      };
    });
  });
