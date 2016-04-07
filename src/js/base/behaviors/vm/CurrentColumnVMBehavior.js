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

modulum('CurrentColumnVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.CurrentColumnVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.CurrentColumnVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.CurrentColumnVMBehavior.prototype */
      return {
        __name: "CurrentColumnVMBehavior",
        /** @type {classes.NodeBase} */
        _currentColumnNode: null,

        /**
         * @constructs {classes.CurrentRowVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} currentColumnAttributeNode
         */
        constructor: function(controller, currentColumnAttributeNode) {
          $super.constructor.call(this, controller);
          this._currentColumnNode = currentColumnAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setCurrentColumn) {
            var currentColumn = this._currentColumnNode.attribute('currentColumn');
            widget.setCurrentColumn(currentColumn);

          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._currentColumnNode,
            attribute: 'currentColumn'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._currentColumnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
