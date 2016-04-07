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

modulum('TextPosition4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextPosition4STBehavior
     * @extends classes.StyleBehaviorBase
     */
    cls.TextPosition4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.TextPosition4STBehavior.prototype */
      return {
        __name: "TextPosition4STBehavior",
        /**
         * @constructs {classes.TextPosition4STBehavior}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.getElement) {
            var format = this._controller.getAnchorNode().getStyleAttribute('toolBarTextPosition');
            if (format === "textBesideIcon") {
              var element = widget.getElement();
              if (element) {
                element.addClass("flex-row");
              }
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
