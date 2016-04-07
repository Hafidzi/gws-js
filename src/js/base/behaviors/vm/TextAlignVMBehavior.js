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

modulum('TextAlignVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextAlignVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextAlignVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextAlignVMBehavior.prototype */
      return {
        __name: "TextAlignVMBehavior",
        /** @type {classes.NodeBase} */
        _justifyNode: null,
        /** @type {classes.NodeBase} */
        _numAlignNode: null,
        /**
         * @constructs {classes.TextAlignVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} justifyAttributeNode
         * @param {classes.NodeBase=} numAlignAttributeNode
         */
        constructor: function(controller, justifyAttributeNode, numAlignAttributeNode) {
          $super.constructor.call(this, controller);
          this._justifyNode = justifyAttributeNode;
          this._numAlignNode = numAlignAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.__name === "TableColumnWidget") {
            widget = widget.getTitleWidget();
          }
          if (widget && widget.setTextAlign) {
            var textAlign = null;
            if (this._numAlignNode && this._numAlignNode.attribute('numAlign') === 1) {
              textAlign = 'right';
            } else {
              textAlign = this._justifyNode.attribute('justify');
            }
            if (widget.__name === "TableColumnTitleWidget") {
              if (widget._autoAlignment === true) {
                widget.setTextAlign(textAlign);
              }
            } else {
              widget.setTextAlign(textAlign);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._numAlignNode,
            attribute: 'numAlign',
            optional: true
          }, {
            node: this._justifyNode,
            attribute: 'justify'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._justifyNode = null;
          this._numAlignNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
