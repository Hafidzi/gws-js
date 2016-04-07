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

modulum('RingMenuPosition4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RingMenuPosition4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.RingMenuPosition4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.RingMenuPosition4STBehavior.prototype */
      return {
        __name: "RingMenuPosition4STBehavior",
        /** @type {classes.NodeBase} */
        _ringMenuNode: null,

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} windowNode
         */
        constructor: function(controller, panelNode) {
          $super.constructor.call(this, controller);
          this._ringMenuNode = panelNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._ringMenuNode._controller.getWidget();

          var ringMenuPosition = this._ringMenuNode.getStyleAttribute("ringMenuPosition");
          if (widget && widget.setActionPanelPosition) {
            if (!!ringMenuPosition) {
              widget.setActionPanelPosition(ringMenuPosition);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },

        /**
         *
         */
        destroy: function() {
          this._ringMenuNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
