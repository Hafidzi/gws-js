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

modulum('TitleVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TabIndexVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TabIndexVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TabIndexVMBehavior.prototype */
      return {
        __name: "TabIndexVMBehavior",
        /** @type {classes.NodeBase} */
        _tabIndexNode: null,
        /**
         * @constructs {classes.TabIndexVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tabIndexAttributeNode
         */
        constructor: function(controller, tabIndexAttributeNode) {
          $super.constructor.call(this, controller);
          this._tabIndexNode = tabIndexAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setOrder) {
            var text = this._tabIndexNode.attribute('tabIndex');
            widget.setOrder(text);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._tabIndexNode,
            attribute: 'tabIndex'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._tabIndexNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
