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

modulum('DisabledVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the StartMenuCommand's 'Disable' state
     * @class classes.DisabledBehavior
     * @extends classes.BehaviorBase
     */
    cls.DisabledVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DisabledBehavior.prototype */
      return {
        __name: "DisabledVMBehavior",
        /** @type {classes.NodeBase} */
        disabledNode: null,

        /**
         * @constructs {classes.DisabledVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} disabledAttributeNode
         */
        constructor: function(controller, disabledAttributeNode) {
          $super.constructor.call(this, controller);
          this.disabledNode = disabledAttributeNode;
        },
        /**
         * Sets the widget 'enabled' or  'disabled' depending on the AUI tree state.
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (!!widget && widget.setEnabled) {
            var disabled = this.disabledNode.attribute('disabled');
            widget.setEnabled(!disabled);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this.disabledNode,
            attribute: 'disabled'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this.disabledNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
