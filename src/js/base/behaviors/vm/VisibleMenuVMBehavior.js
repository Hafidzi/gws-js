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

modulum('VisibleMenuVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's visibility
     * @class classes.HiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.VisibleMenuVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.HiddenVMBehavior.prototype */
      return {
        __name: "VisibleMenuVMBehavior",
        /** @type {classes.NodeBase} */
        _activeNode: null,

        /**
         * @constructs {classes.VisibleMenuVMBehavior}
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
          if (widget && widget.setHidden) {
            var activeValue = false;
            if (!!this._activeNode) {
              activeValue = this._activeNode.attribute('active');
            }
            var uiNode = this._activeNode.getAncestor("UserInterface");

            if (!activeValue) {
              var hasDialogStyle = uiNode.getChildrenWithAttribute("Window", "style", "dialog").length > 0;
              if (hasDialogStyle) {
                widget.setHidden(false);
              }
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
