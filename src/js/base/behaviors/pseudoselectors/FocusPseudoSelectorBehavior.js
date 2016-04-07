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

modulum('FocusPseudoSelectorBehavior', ['PseudoSelectorBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FocusPseudoSelectorBehavior
     * @extends classes.PseudoSelectorBehaviorBase
     */
    cls.FocusPseudoSelectorBehavior = context.oo.Class(cls.PseudoSelectorBehaviorBase, function($super) {
      /** @lends classes.FocusPseudoSelectorBehavior.prototype */
      return {
        __name: "FocusPseudoSelectorBehavior",
        /** @type {classes.NodeBase} */
        _uiNode: null,

        /**
         * @constructs {classes.FocusPseudoSelectorBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} uiNode
         */
        constructor: function(controller, uiNode) {
          $super.constructor.call(this, controller);
          this._uiNode = uiNode;
        },

        /**
         *
         */
        focusChanged: function(event, data) {
          if (!!data.old) {
            var oldFocusedNode = this._uiNode.getApplication().getNode(data.old);
            // Previously focused node may have been removed from the AUI tree.
            if (!!oldFocusedNode) {
              this.setStyleBasedBehaviorsDirty(oldFocusedNode);
            }
          }
          var newFocusedWidget = this._uiNode.getApplication().getNode(data.new);
          this.setStyleBasedBehaviorsDirty(newFocusedWidget);
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._uiNode,
            attribute: 'focus',
            onChange: this.focusChanged.bind(this)
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._uiNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
