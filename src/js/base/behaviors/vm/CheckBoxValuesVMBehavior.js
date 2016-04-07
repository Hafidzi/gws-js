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

modulum('CheckBoxValuesVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.CheckBoxValuesVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.CheckBoxValuesVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.CheckBoxValuesVMBehavior.prototype */
      return {
        __name: "CheckBoxValuesVMBehavior",
        /** @type {classes.NodeBase} */
        _valueCheckedNode: null,
        /** @type {classes.NodeBase} */
        _valueUncheckedNode: null,
        /**
         * @constructs {classes.CheckBoxValuesVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} valueCheckedAttributeNode
         * @param {classes.NodeBase} valueUncheckedAttributeNode
         */
        constructor: function(controller, valueCheckedAttributeNode, valueUncheckedAttributeNode) {
          $super.constructor.call(this, controller);
          this._valueCheckedNode = valueCheckedAttributeNode;
          this._valueUncheckedNode = valueUncheckedAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setCheckedValue) {
            var checkedValue = this._valueCheckedNode.attribute('valueChecked');
            widget.setCheckedValue(checkedValue);
          } else {
            this._failed("could not set checkedValue");
          }
          if (widget && widget.setUncheckedValue) {
            var uncheckedValue = this._valueUncheckedNode.attribute('valueUnchecked');
            widget.setUncheckedValue(uncheckedValue);
          } else {
            this._failed("could not set uncheckedValue");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._valueCheckedNode,
            attribute: 'valueChecked'
          }, {
            node: this._valueUncheckedNode,
            attribute: 'valueUnchecked'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._valueCheckedNode = null;
          this._valueUncheckedNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
