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

modulum('TextEditRowsVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TextEditRowsVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TextEditRowsVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TextEditRowsVMBehavior.prototype */
      return {
        __name: "TextEditRowsVMBehavior",
        /** @type {classes.NodeBase} */
        _gridHeightNode: null,
        /**
         * @constructs {classes.TextEditRowsVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} gridHeightAttributeNode
         */
        constructor: function(controller, gridHeightAttributeNode) {
          $super.constructor.call(this, controller);
          this._gridHeightNode = gridHeightAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setRows) {
            var gridHeight = this._gridHeightNode.attribute('gridHeight');
            widget.setRows(gridHeight);
          } else {
            this._failed("Could not apply behavior");
          }

        },
        _getWatchedAttributes: function() {
          return [{
            node: this._gridHeightNode,
            attribute: 'gridHeight'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._gridHeightNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
