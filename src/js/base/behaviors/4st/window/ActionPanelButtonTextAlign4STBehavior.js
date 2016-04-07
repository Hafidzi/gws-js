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

modulum('ActionPanelButtonTextAlign4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionPanelButtonTextAlign4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.ActionPanelButtonTextAlign4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.ActionPanelButtonTextAlign4STBehavior.prototype */
      return {
        __name: "ActionPanelButtonTextAlign4STBehavior",
        /** @type {classes.NodeBase} */
        _panelNode: null,

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} panelNode
         */
        constructor: function(controller, panelNode) {
          $super.constructor.call(this, controller);
          this._panelNode = panelNode;
        },

        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          var actionPanelButtonTextAlign = this._panelNode.getStyleAttribute("actionPanelButtonTextAlign");
          actionPanelButtonTextAlign = actionPanelButtonTextAlign ? actionPanelButtonTextAlign : this._panelNode.getStyleAttribute(
            "ringMenuButtonTextAlign");

          if (widget && widget.setActionPanelButtonTextAlign && actionPanelButtonTextAlign && ["left", "right"].indexOf(
              actionPanelButtonTextAlign) >= 0) {
            widget.setActionPanelButtonTextAlign(actionPanelButtonTextAlign);
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
