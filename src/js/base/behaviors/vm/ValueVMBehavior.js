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

modulum('ValueVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ValueVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ValueVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ValueVMBehavior.prototype */
      return {
        __name: "ValueVMBehavior",
        /** @type {classes.NodeBase} */
        _valueNode: null,
        /**
         * @constructs {classes.ValueVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} valueAttributeNode
         */
        constructor: function(controller, valueAttributeNode) {
          $super.constructor.call(this, controller);
          this._valueNode = valueAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setValue) {
            var value = this._valueNode.attribute('value');
            widget.setValue(value);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._valueNode,
            attribute: 'value'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._valueNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
