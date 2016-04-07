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

modulum('ActionPanelButtonTextHidden4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionPanelButtonTextHidden4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.ActionPanelButtonTextHidden4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.ActionPanelButtonTextHidden4STBehavior.prototype */
      return {
        __name: "ActionPanelButtonTextHidden4STBehavior",
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

          var actionPanelButtonTextHidden = this.isSAYesLike(this._panelNode.getStyleAttribute("actionPanelButtonTextHidden"));
          actionPanelButtonTextHidden = actionPanelButtonTextHidden ? actionPanelButtonTextHidden : this._panelNode.getStyleAttribute(
            "ringMenuButtonTextHidden");

          if (widget && widget.setActionPanelButtonTextHidden) {
            if (actionPanelButtonTextHidden) {
              widget.setActionPanelButtonTextHidden(actionPanelButtonTextHidden);
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
