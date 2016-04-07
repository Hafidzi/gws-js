/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum("Gravity", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * gravity information
     * @class classes.Gravity
     */
    cls.Gravity = context.oo.Class(function() {
      /** @lends classes.Gravity.prototype */
      return {
        __name: "Gravity",
        /**
         * @type {Object}
         */
        vertical: null,
        /**
         * @type {Object}
         */
        horizontal: null,
        constructor: function(params) {
          if (params instanceof cls.Gravity || (params && params.vertical)) {
            this.vertical = params.vertical || cls.Gravities.FILL;
          } else {
            this.vertical = cls.Gravities.FILL;
          }
          if (params instanceof cls.Gravity || (params && params.horizontal)) {
            this.horizontal = params.horizontal || cls.Gravities.FILL;
          } else {
            this.horizontal = cls.Gravities.FILL;
          }
        },
        reset: function() {
          this.vertical = cls.Gravities.FILL;
          this.horizontal = cls.Gravities.FILL;
        },
        verticalText: function() {
          var result = "";
          switch (this.vertical) {
            case cls.Gravities.START:
              result = "top";
              break;
            case cls.Gravities.CENTER:
              result = "center_vertical";
              break;
            case cls.Gravities.END:
              result = "bottom";
              break;
            default:
              result = "fill_vertical";
              break;
          }
          return result;
        },
        horizontalText: function() {
          var result = "";
          switch (this.horizontal) {
            case cls.Gravities.START:
              result = "left";
              break;
            case cls.Gravities.CENTER:
              result = "center_horizontal";
              break;
            case cls.Gravities.END:
              result = "right";
              break;
            default:
              result = "fill_horizontal";
              break;
          }
          return result;
        }
      };
    });
  });
