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

modulum('MatrixCurrentRowVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MatrixCurrentRowVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.MatrixCurrentRowVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.MatrixCurrentRowVMBehavior.prototype */
      return {
        __name: "MatrixCurrentRowVMBehavior",
        /** @type {classes.NodeBase} */
        _valueNode: null,
        /** @type {classes.NodeBase} */
        _matrixNode: null,
        /**
         * @constructs {classes.MatrixCurrentRowVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} currentRowAttributeNode
         */
        constructor: function(controller, valueNode, matrixNode) {
          $super.constructor.call(this, controller);
          this._valueNode = valueNode;
          this._matrixNode = matrixNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget) {
            var currentRow = this._matrixNode.attribute("currentRow");
            var offset = this._matrixNode.attribute("offset");
            var size = this._matrixNode.attribute("size");
            if (currentRow < size && currentRow - offset === this._valueNode.getIndex()) {
              widget.addClass("currentRow");
            } else {
              widget.removeClass("currentRow");
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._matrixNode,
            attribute: 'currentRow'
          }, {
            node: this._matrixNode,
            attribute: 'offset'
          }, {
            node: this._matrixNode,
            attribute: 'size'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._matrixNode = null;
          this._valueNode = null;
          $super.destroy.call(this);
        }
      };
    });
  }
);
