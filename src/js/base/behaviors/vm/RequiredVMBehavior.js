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

modulum('RequiredVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RequiredVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.RequiredVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.RequiredVMBehavior.prototype */
      return {
        __name: "RequiredVMBehavior",
        /** @type {classes.NodeBase} */
        _requiredNode: null,
        /**
         * @constructs {classes.RequiredVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} requiredAttributeNode
         */
        constructor: function(controller, requiredAttributeNode) {
          $super.constructor.call(this, controller);
          this._requiredNode = requiredAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setRequired) {
            var required = this._requiredNode.attribute('required');
            widget.setRequired(required);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._requiredNode,
            attribute: 'required'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._requiredNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
