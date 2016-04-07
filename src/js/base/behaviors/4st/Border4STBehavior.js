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

modulum('Border4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.Border4STBehavior
     * @extends classes.StyleBehaviorBase
     */
    cls.Border4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.Border4STBehavior.prototype */
      return {
        __name: "Border4STBehavior",
        /**
         * @constructs {classes.Border4STBehavior}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget) {
            var element = widget.getElement();
            var border = this._controller.getAnchorNode().getStyleAttribute('border');
            element.toggleClass("gbc_NoBorder", this.isSANoLike(border));
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
