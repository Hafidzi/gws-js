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

modulum('RangeVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RangeVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.RangeVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.RangeVMBehavior.prototype */
      return {
        __name: "RangeVMBehavior",
        /** @type {classes.NodeBase} */
        _valueMaxNode: null,
        /** @type {classes.NodeBase} */
        _valueMinNode: null,
        /** @type {classes.NodeBase} */
        _stepNode: null,
        /**
         * @constructs {classes.RangeVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} valueMaxAttributeNode
         * @param {classes.NodeBase} valueMinAttributeNode
         * @param {classes.NodeBase} stepAttributeNode
         */
        constructor: function(controller, valueMaxAttributeNode, valueMinAttributeNode, stepAttributeNode) {
          $super.constructor.call(this, controller);
          this._valueMaxNode = valueMaxAttributeNode;
          this._valueMinNode = valueMinAttributeNode;
          this._stepNode = stepAttributeNode;
        },

        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setMax) {
            var valueMax = this._valueMinNode.attribute('valueMax');
            widget.setMax(valueMax);
          } else {
            this._failed("Could not apply behavior");
          }
          if (widget && widget.setMin) {
            var valueMin = this._valueMinNode.attribute('valueMin');
            widget.setMin(valueMin);
          } else {
            this._failed("Could not apply behavior");
          }
          if (widget && widget.setStep) {
            var step = this._stepNode.attribute('step');
            widget.setStep(step);
          }
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._valueMaxNode,
            attribute: 'valueMax'
          }, {
            node: this._valueMinNode,
            attribute: 'valueMin'
          }, {
            node: this._stepNode,
            attribute: 'step'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._valueMaxNode = null;
          this._valueMinNode = null;
          this._stepNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
