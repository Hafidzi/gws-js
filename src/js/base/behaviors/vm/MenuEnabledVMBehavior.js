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

modulum('MenuEnabledVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's Menu
     * @class classes.HiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.MenuEnabledVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.MenuEnabledVMBehavior.prototype */
      return {
        __name: "MenuEnabledVMBehavior",
        /** @type {classes.NodeBase} */
        _activeNode: null,

        /**
         * @constructs {classes.MenuEnabledVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         */
        constructor: function(controller, activeAttributeNode) {
          $super.constructor.call(this, controller);
          this._activeNode = activeAttributeNode;

        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var widget = this._controller.getWidget();

          var nextSibling = this._activeNode.getNextSibling("Menu");
          nextSibling = nextSibling ? nextSibling : this._activeNode.getNextSibling("Dialog");

          var activeValue = false;
          if (!!this._activeNode) {
            activeValue = this._activeNode.attribute('active');
          }

          if (nextSibling && (nextSibling._tag === "Menu" || nextSibling._tag === "Dialog")) {
            var actionPanelPosition = nextSibling.getStyleAttribute("actionPanelPosition") || "right";
            var ringMenuPosition = nextSibling.getStyleAttribute("ringMenuPosition") || "right";

            if (widget && widget.setEnabled) {
              widget.setEnabled(activeValue);
              // If both are on the same panel, show only the last
              if (actionPanelPosition === ringMenuPosition) {
                if (widget && widget.setHidden) {
                  widget.setHidden(!activeValue);
                }
              }

            } else {
              if (this._activeNode._tag === "Menu" || this._activeNode._tag === "Dialog") {
                if (widget && widget.setHidden) {
                  widget.setHidden(!activeValue);
                }
              }
            }
          } else {
            if (widget && widget.setHidden) {
              widget.setHidden(!activeValue);
            }
            if (widget && widget.setEnabled) {
              widget.setEnabled(activeValue);
            }
          }

        },
        _getWatchedAttributes: function() {
          return [{
            node: this._activeNode,
            attribute: 'active'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._activeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
