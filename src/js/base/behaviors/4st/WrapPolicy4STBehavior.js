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

modulum('WrapPolicy4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WrapPolicy4STBehavior
     * @extends classes.StyleBehaviorBase
     */
    cls.WrapPolicy4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.WrapPolicy4STBehavior.prototype */
      return {
        __name: "WrapPolicy4STBehavior",
        /**
         * @constructs {classes.WrapPolicy4STBehavior}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setWrapPolicy) {
            var format = this._controller.getAnchorNode().getStyleAttribute('wrapPolicy');
            widget.setWrapPolicy(format);
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
