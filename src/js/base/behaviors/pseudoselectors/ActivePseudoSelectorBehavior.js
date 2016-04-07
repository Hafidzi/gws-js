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

modulum('ActivePseudoSelectorBehavior', ['PseudoSelectorBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActivePseudoSelectorBehavior
     * @extends classes.PseudoSelectorBehaviorBase
     */
    cls.ActivePseudoSelectorBehavior = context.oo.Class(cls.PseudoSelectorBehaviorBase, function($super) {
      /** @lends classes.ActivePseudoSelectorBehavior.prototype */
      return {
        __name: "ActivePseudoSelectorBehavior",
        /** @type {classes.NodeBase} */
        _node: null,

        /**
         * @constructs {classes.ActivePseudoSelectorBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         */
        constructor: function(controller, activeAttributeNode) {
          $super.constructor.call(this, controller);
          this._node = activeAttributeNode;
        },

        /**
         *
         */
        activeChanged: function(event, data) {
          this.setStyleBasedBehaviorsDirty(this._node);
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._node,
            attribute: 'active',
            onChange: this.activeChanged.bind(this)
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._node = null;
          $super.destroy.call(this);
        }
      };
    });
  });
