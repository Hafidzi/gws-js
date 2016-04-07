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

modulum('WindowCanCloseVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowCanCloseVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.WindowCanCloseVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.WindowCanCloseVMBehavior.prototype */
      return {
        /** @type {string} */
        __name: "WindowCanCloseVMBehavior",

        /** @type {classes.NodeBase} */
        _actionCloseNode: null,

        /**
         * @constructs {classes.WindowCanCloseVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} actionCloseNode
         */
        constructor: function(controller, actionCloseNode) {
          $super.constructor.call(this, controller);
          this._actionCloseNode = actionCloseNode;
        },
        _apply: function() {
          var windowWidget = this._actionCloseNode.getAncestor('Window').getController().getWidget();
          if (windowWidget && windowWidget.setClosable) {
            var activeValue = false;
            if (!!this._actionCloseNode) {
              activeValue |= this._actionCloseNode.attribute('active');
            }
            windowWidget.setClosable(activeValue);
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._actionCloseNode,
            attribute: 'active'
          }];
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._actionCloseNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
