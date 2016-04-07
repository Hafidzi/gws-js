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

modulum('FirstDayOfWeek4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FirstDayOfWeek4STBehavior
     * @extends classes.StyleBehaviorBase
     */
    cls.FirstDayOfWeek4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.FirstDayOfWeek4STBehavior.prototype */
      return {
        __name: "FirstDayOfWeek4STBehavior",
        /**
         * @constructs {classes.FirstDayOfWeek4STBehavior}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFirstDayOfWeek) {
            var font = this._controller.getAnchorNode().getStyleAttribute('firstDayOfWeek');
            if (font) {
              widget.setFirstDayOfWeek(font);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        /**
         *
         */
        destroy: function() {
          $super.destroy.call(this);
        }
      };
    });
  });
