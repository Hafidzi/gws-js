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

modulum('MatrixNode', ['StandardNode', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MatrixNode
     * @extends classes.StandardNode
     */
    cls.MatrixNode = context.oo.Class(cls.StandardNode, function() {
      /** @lends classes.MatrixNode.prototype */
      return {
        /**
         *
         * @protected
         */
        _createChildrenControllers: function() {
          for (var i = 1; i < this._children.length; i++) {
            this._children[i].createController();
          }
        },

        /**
         * Will get current child in matrix
         * @returns {*}
         */
        getCurrentChild: function() {
          var currentRow = this.attribute("currentRow") || 0;
          var offset = this.attribute("offset");
          var valueIndex = currentRow - offset;
          if (this._children[1]._children[valueIndex]) {
            return this._children[1]._children[valueIndex];
          } else {
            return null;
          }
        }
      };
    });
    cls.NodeFactory.register("Matrix", cls.MatrixNode);
  });
