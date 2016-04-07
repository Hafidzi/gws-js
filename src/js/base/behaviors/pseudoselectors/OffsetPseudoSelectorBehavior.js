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

modulum('OffsetPseudoSelectorBehavior', ['PseudoSelectorBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OffsetPseudoSelectorBehavior
     * @extends classes.PseudoSelectorBehaviorBase
     */
    cls.OffsetPseudoSelectorBehavior = context.oo.Class(cls.PseudoSelectorBehaviorBase, function($super) {
      /** @lends classes.OffsetPseudoSelectorBehavior.prototype */
      return {
        __name: "OffsetPseudoSelectorBehavior",
        /** @type {classes.NodeBase} */
        _node: null,

        /**
         * @constructs {classes.OffsetPseudoSelectorBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} node
         */
        constructor: function(controller, node) {
          $super.constructor.call(this, controller);
          this._node = node;
        },

        /**
         *
         */
        offsetChanged: function(event, data) {
          this.setStyleBasedBehaviorsDirty(this._node);
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._node,
            attribute: 'offset',
            onChange: this.offsetChanged.bind(this)
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
