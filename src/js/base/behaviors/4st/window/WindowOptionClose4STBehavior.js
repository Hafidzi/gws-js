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

modulum('WindowOptionClose4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowOptionClose4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.WindowOptionClose4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.WindowOptionClose4STBehavior.prototype */
      return {
        __name: "WindowOptionClose4STBehavior",
        /** @type {classes.NodeBase} */
        _windowNode: null,

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} windowNode
         */
        constructor: function(controller, windowNode) {
          $super.constructor.call(this, controller);
          this._windowNode = windowNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._windowNode._controller.getWidget();

          var windowOptionClose = this._windowNode.getStyleAttribute("windowOptionClose");
          if (widget && widget._closeHostMenuWidget) {
            if (this.isSAYesLike(windowOptionClose)) {
              widget._closeHostMenuWidget.setActive(true);
            } else if (windowOptionClose !== null) {
              widget._closeHostMenuWidget.setActive(false);
            }

          } else {
            this._failed("Could not apply behavior");
          }
        },

        /**
         *
         */
        destroy: function() {
          this._windowNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
