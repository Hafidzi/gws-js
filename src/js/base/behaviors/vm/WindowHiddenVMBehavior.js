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

modulum('WindowHiddenVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's visibility
     * @class classes.WindowHiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.WindowHiddenVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.WindowHiddenVMBehavior.prototype */
      return {
        __name: "WindowHiddenVMBehavior",
        /** @type {classes.NodeBase} */
        _currentWindowNode: null,
        /**
         * @constructs {classes.WindowHiddenVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} currentWindowAttributeNode
         */
        constructor: function(controller, currentWindowAttributeNode) {
          $super.constructor.call(this, controller);
          this._currentWindowNode = currentWindowAttributeNode;
        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget) {
            var currentWindow = this._currentWindowNode.attribute('currentWindow');
            var isCurrent = currentWindow === this._controller.getAnchorNode().getId();
            if (isCurrent) {
              widget.unfreeze();
            } else {
              widget.freeze();
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._currentWindowNode,
            attribute: 'currentWindow'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._currentWindowNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
