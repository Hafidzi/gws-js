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

modulum('Alignment4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.Alignment4STBehavior
     * @extends classes.StyleBehaviorBase
     */
    cls.Alignment4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.Alignment4STBehavior.prototype */
      return {
        __name: "Alignment4STBehavior",
        /**
         * @constructs {classes.Alignment4STBehavior}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setAlignment) {
            var pos = this._controller.getAnchorNode().getStyleAttribute('alignment');
            if (pos) {
              if (pos === "center") {
                pos = "horizontalCenter verticalCenter";
              }
              var positions = pos.split(" ");
              var x = positions[0];
              var y = positions.length === 2 ? positions[1] : null;
              widget.setAlignment(x, y);
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
