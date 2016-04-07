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

modulum('MultiRowSelectionVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MultiRowSelectionVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.MultiRowSelectionVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.MultiRowSelectionVMBehavior.prototype */
      return {
        __name: "MultiRowSelectionVMBehavior",
        /** @type {classes.NodeBase} */
        _multiRowSelectionNode: null,
        /**
         * @constructs {classes.MultiRowSelectionVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} multiRowSelectionNode
         */
        constructor: function(controller, multiRowSelectionNode) {
          $super.constructor.call(this, controller);
          this._multiRowSelectionNode = multiRowSelectionNode;
        },
        /**
         *
         */
        _apply: function() {
          var tableWidget = this._controller.getWidget();
          if (tableWidget && tableWidget.setMultiRowSelectionEnabled) {
            tableWidget.setMultiRowSelectionEnabled(this._multiRowSelectionNode.attribute('multiRowSelection') !== 0);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._multiRowSelectionNode,
            attribute: 'multiRowSelection'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._multiRowSelectionNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
