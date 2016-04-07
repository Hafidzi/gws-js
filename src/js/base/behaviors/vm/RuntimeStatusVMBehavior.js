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

modulum('RuntimeStatusVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RuntimeStatusVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.RuntimeStatusVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.RuntimeStatusVMBehavior.prototype */
      return {
        __name: "RuntimeStatusVMBehavior",
        /** @type {classes.NodeBase} */
        _runtimeStatusNode: null,
        /**
         * @constructs {classes.RuntimeStatusVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} runtimeStatusAttributeNode
         */
        constructor: function(controller, runtimeStatusAttributeNode) {
          $super.constructor.call(this, controller);
          this._runtimeStatusNode = runtimeStatusAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var app = this._runtimeStatusNode.getApplication();
          if (!!app) {
            var runtimeStatus = this._runtimeStatusNode.attribute('runtimeStatus');
            if (runtimeStatus === "childstart") {
              app.newTask();
            } else if (runtimeStatus !== "processing") {
              app.setIdle();
            }
          } else {
            this._failed();
          }
        },
        _getWatchedAttributes: function() {
          var node = this._runtimeStatusNode;
          return [{
            node: this._runtimeStatusNode,
            attribute: 'runtimeStatus',
            onChange: function() {
              var runtimeStatus = node.attribute('runtimeStatus');
              if (runtimeStatus === "childstart") {
                var app = node.getApplication();
                app.newTask();
              }
            }
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._runtimeStatusNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
