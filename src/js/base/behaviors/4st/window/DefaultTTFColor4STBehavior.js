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

modulum('DefaultTTFColor4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DefaultTTFColor4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.DefaultTTFColor4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.DefaultTTFColor4STBehavior.prototype */
      return {
        __name: "DefaultTTFColor4STBehavior",

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} windowNode
         */
        constructor: function(controller) {
          $super.constructor.call(this, controller);
        },

        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setDefaultColor) {
            var color = this._controller.getAnchorNode().getStyleAttribute('defaultTTFColor');
            widget.setDefaultColor(color);
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
