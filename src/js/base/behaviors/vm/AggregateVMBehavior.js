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

modulum('AggregateVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.AggregateVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.AggregateVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.AggregateVMBehavior.prototype */
      return {
        __name: "AggregateVMBehavior",
        /** @type {classes.NodeBase} */
        _textNode: null,
        /** @type {classes.NodeBase} */
        _valueNode: null,
        /** @type {classes.NodeBase} */
        _globalTextNode: null,

        /**
         * @constructs {classes.AggregateVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} textAttributeNode
         * @param {classes.NodeBase} valueAttributeNode
         * * @param {classes.NodeBase} globalTextAttributeNode
         */
        constructor: function(controller, textAttributeNode, valueAttributeNode, globalTextAttributeNode) {
          $super.constructor.call(this, controller);
          this._textNode = textAttributeNode;
          this._valueNode = valueAttributeNode;
          this._globalTextNode = globalTextAttributeNode;
        },

        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setAggregate) {
            var text = this._textNode.attribute('aggregateText');
            var value = this._valueNode.attribute('aggregateValue');

            if (text !== "") {
              text = text + " ";
            }

            widget.setAggregate(text + value);

            if (widget.getColumnIndex() === 0) {
              var globalText = this._globalTextNode.attribute('aggregateText');
              widget.setAggregateGlobalText(globalText);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._textNode,
            attribute: 'aggregateText'
          }, {
            node: this._valueNode,
            attribute: 'aggregateValue'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._textNode = null;
          this._valueNode = null;
          this._globalTextNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
