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

modulum('RowSelectedVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RowSelectedVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.RowSelectedVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.RowSelectedVMBehavior.prototype */
      return {
        __name: "RowSelectedVMBehavior",

        /** @type {classes.NodeBase} */
        _rowInfoNode: null,
        /** @type {classes.NodeBase} */
        _tableNode: null,

        /**
         * @constructs {classes.RowSelectedVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} rowInfoNode
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, rowInfoNode, tableNode) {
          $super.constructor.call(this, controller);
          this._rowInfoNode = rowInfoNode;
          this._tableNode = tableNode;
        },
        /**
         *
         */
        _apply: function() {
          var tableWidget = this._tableNode.getController().getWidget();
          if (tableWidget && tableWidget.setRowSelected) {
            var multiRowSelection = this._tableNode.attribute('multiRowSelection');
            var selected = multiRowSelection && this._rowInfoNode.attribute('selected');
            tableWidget.setRowSelected(this._rowInfoNode.getIndex(), selected);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._rowInfoNode,
            attribute: 'selected'
          }, {
            node: this._tableNode,
            attribute: 'multiRowSelection'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._rowInfoNode = null;
          this._tableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
