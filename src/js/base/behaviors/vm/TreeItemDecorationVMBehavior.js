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

modulum('TreeItemDecorationVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TreeItemDecorationVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TreeItemDecorationVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TreeItemDecorationVMBehavior.prototype */
      return {
        __name: "TreeItemDecorationVMBehavior",
        /** @type {classes.NodeBase} */
        _treeItemNode: null,
        /** @type {classes.NodeBase} */
        _treeViewColumnNode: null,
        /** @type {number} */
        _depth: 0,

        /**
         * @constructs {classes.TreeItemDecorationVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} treeItemNode
         * @param {classes.NodeBase} treeViewColumnNode
         */
        constructor: function(controller, treeItemNode, treeViewColumnNode) {
          $super.constructor.call(this, controller);
          this._treeItemNode = treeItemNode;
          this._treeViewColumnNode = treeViewColumnNode;

          this._depth = 0;
          var n = treeItemNode.getParentNode();
          while (n && n.getTag() === 'TreeItem') {
            n = n.getParentNode();
            ++this._depth;
          }
        },
        /**
         *
         */
        _apply: function() {
          var row = this._treeItemNode.attribute('row');
          if (row !== -1) {
            var hasChildren = this._treeItemNode.attribute('hasChildren') !== 0;
            var isExpanded = hasChildren && this._treeItemNode.attribute('expanded') !== 0;
            var treeViewColumnWidget = this._treeViewColumnNode.getController().getWidget(),
              cellWidget = treeViewColumnWidget.getColumnItem(row);
            if (cellWidget) {
              cellWidget.setDepth(this._depth);
              cellWidget.setLeaf(!hasChildren);
              if (hasChildren) {
                cellWidget.setExpanded(isExpanded);
              }
            }
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._treeItemNode,
            attribute: 'expanded'
          }, {
            node: this._treeItemNode,
            attribute: 'hasChildren'
          }, {
            node: this._treeItemNode,
            attribute: 'row'
          }];
        },
        /**
         * @returns {classes.TableColumnWidget}
         * @private
         */
        _getTreeViewColumnWidget: function() {
          var treeViewColumnController = this._treeViewColumnNode.getController();
          if (treeViewColumnController) {
            return treeViewColumnController.getWidget();
          }
          return null;
        },
        /**
         *
         */
        destroy: function() {
          this._treeItemNode = null;
          this._treeViewColumnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
