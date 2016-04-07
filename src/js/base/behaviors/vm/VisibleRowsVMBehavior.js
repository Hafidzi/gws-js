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

modulum('VisibleRowsVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.VisibleRowsVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.VisibleRowsVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.VisibleRowsVMBehavior.prototype */
      return {
        __name: "VisibleRowsVMBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,
        /**
         * @constructs {classes.VisibleRowsVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, tableNode) {
          $super.constructor.call(this, controller);
          this._tableNode = tableNode;
        },
        /**
         *
         */
        _apply: function() {
          var size = this._tableNode.attribute('size');
          var offset = this._tableNode.attribute('offset');
          var bufferSize = this._tableNode.attribute('bufferSize');
          var tableWidget = this._controller.getWidget();
          var visibleRows = Math.min(bufferSize, size - offset);
          var dialogType = this._tableNode.attribute('dialogType');
          if (dialogType === "Construct" && visibleRows === 0) {
            visibleRows = 1;
          }
          if (tableWidget.getVisibleRows() !== visibleRows) {
            tableWidget.setVisibleRows(visibleRows);
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._tableNode,
            attribute: 'size'
          }, {
            node: this._tableNode,
            attribute: 'offset'
          }, {
            node: this._tableNode,
            attribute: 'bufferSize'
          }, {
            node: this._tableNode,
            attribute: 'dialogType'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._tableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
