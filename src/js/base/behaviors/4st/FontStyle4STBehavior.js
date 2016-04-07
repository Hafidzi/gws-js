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

modulum('FontStyle4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FontStyle4STBehavior
     * @extends classes.StyleBehaviorBase
     */
    cls.FontStyle4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.FontStyle4STBehavior.prototype */
      return {
        __name: "FontStyle4STBehavior",
        /**
         * @constructs {classes.FontStyle4STBehavior}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFontStyle) {
            var font = this._controller.getAnchorNode().getStyleAttribute('fontStyle');
            if (font) {
              widget.setFontStyle(font);
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
