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

modulum('ScrollBarsVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ScrollBarsVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ScrollBarsVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ScrollBarsVMBehavior.prototype */
      return {
        __name: "ScrollBarsVMBehavior",

        /** @type {classes.NodeBase} */
        _scrollBarNode: null,

        /**
         * @constructs {classes.ScrollBarsVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} scrollBarNode
         */
        constructor: function(controller, scrollBarNode) {
          $super.constructor.call(this, controller);
          this._scrollBarNode = scrollBarNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setSrollBars) {
            var scollBars = this._scrollBarNode.attribute('scrollbars');
            var horizontal = false;
            var vertical = false;

            if (scollBars && scollBars.toLowerCase() === "both") {
              horizontal = true;
              vertical = true;
            } else if (scollBars && scollBars.toLowerCase() === "horizontal") {
              horizontal = true;
            } else if (scollBars && scollBars.toLowerCase() === "vertical") {
              vertical = true;
            }
            widget.setSrollBars(horizontal, vertical);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._scrollBarNode,
            attribute: 'scrollbars'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._scrollBarNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
