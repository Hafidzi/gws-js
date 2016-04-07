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

modulum('SortVMBehavior', ['BehaviorBase'],
  /**
   * Manage "sortType" & "sortColumn" attribute
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.SortVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.SortVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.SortVMBehavior.prototype */
      return {
        __name: "SortVMBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,

        /**
         * @constructs {classes.SortVMBehavior}
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
          var widget = this._controller.getWidget();
          if (widget && widget.setSort) {
            var sortType = this._tableNode.attribute('sortType');
            var sortColumn = this._tableNode.attribute('sortColumn');

            widget.setSort(sortType, sortColumn);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._tableNode,
            attribute: 'sortType'
          }, {
            node: this._tableNode,
            attribute: 'sortColumn'
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
