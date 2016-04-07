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

modulum('DBDateVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DBDateVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.DBDateVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DBDateVMBehavior.prototype */
      return {
        __name: "DBDateVMBehavior",
        /** @type {classes.NodeBase} */
        _dbDateNode: null,
        /**
         * @constructs {classes.DBDateVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} dbDateNode
         */
        constructor: function(controller, dbDateNode) {
          $super.constructor.call(this, controller);
          this._dbDateNode = dbDateNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setDbDateFormat) {
            if (this._dbDateNode && this._dbDateNode.isAttributesSetByVM('dbDate')) {
              var dbDate = this._dbDateNode.attribute('dbDate');
              widget.setDbDateFormat(dbDate);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._dbDateNode,
            attribute: 'dbDate'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._dbDateNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
