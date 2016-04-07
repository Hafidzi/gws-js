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

modulum('ActionPanelPosition4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionPanelPosition4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.ActionPanelPosition4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.ActionPanelPosition4STBehavior.prototype */
      return {
        __name: "ActionPanelPosition4STBehavior",
        /** @type {classes.NodeBase} */
        _panelNode: null,

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} windowNode
         */
        constructor: function(controller, panelNode) {
          $super.constructor.call(this, controller);
          this._panelNode = panelNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._panelNode._controller.getWidget();

          var actionPanelPosition = this._panelNode.getStyleAttribute("actionPanelPosition");
          //actionPanelPosition = actionPanelPosition ? actionPanelPosition : this._panelNode.getStyleAttribute("ringMenuPosition");
          if (widget && widget.setActionPanelPosition) {
            if (actionPanelPosition) {
              widget.setActionPanelPosition(actionPanelPosition);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },

        /**
         *
         */
        destroy: function() {
          this._panelNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
