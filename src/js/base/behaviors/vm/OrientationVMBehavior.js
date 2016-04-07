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

modulum('OrientationVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OrientationVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.OrientationVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.OrientationVMBehavior.prototype */
      return {
        __name: "OrientationVMBehavior",
        /** @type {classes.NodeBase} */
        _orientationNode: null,
        /**
         * @constructs {classes.OrientationVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} orientationAttributeNode
         */
        constructor: function(controller, orientationAttributeNode) {
          $super.constructor.call(this, controller);
          this._orientationNode = orientationAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setOrientation) {
            var orientation = this._orientationNode.attribute('orientation');
            widget.setOrientation(orientation);
          } else {
            this._failed();
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._orientationNode,
            attribute: 'orientation'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._orientationNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
