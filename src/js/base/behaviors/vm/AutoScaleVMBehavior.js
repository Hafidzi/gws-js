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

modulum('AutoScaleVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.AutoScaleVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.AutoScaleVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.AutoScaleVMBehavior.prototype */
      return {
        __name: "AutoScaleVMBehavior",
        /** @type {classes.NodeBase} */
        _autoScaleNode: null,
        /**
         * @constructs {classes.AutoScaleVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} imageAttributeNode
         */
        constructor: function(controller, autoScaleAttributeNode) {
          $super.constructor.call(this, controller);
          this._autoScaleNode = autoScaleAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setAutoScale) {
            var autoScale = this._autoScaleNode.attribute('autoScale');
            widget.setAutoScale(autoScale);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._autoScaleNode,
            attribute: 'autoScale'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._autoScaleNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
