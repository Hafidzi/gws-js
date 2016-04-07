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

modulum('DndAcceptedVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DndAcceptedVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.DndAcceptedVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DndAcceptedVMBehavior.prototype */
      return {
        __name: "DndAcceptedVMBehavior",
        /** @type {classes.NodeBase} */
        _dndNode: null,
        _count: 0,
        /**
         * @constructs {classes.DndAcceptedVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} dndNode
         */
        constructor: function(controller, dndNode) {
          $super.constructor.call(this, controller);
          this._dndNode = dndNode;
        },
        /**
         *
         */
        _apply: function() {

          var dndAccepted = this._dndNode.attribute('dndAccepted');
          // to avoid flickering, ignore first dndAccepted return by the VM just after the DragStart event
          if (this._count > 0) {
            context.DndService.dndAccepted = dndAccepted;
          } else {
            context.DndService.dndAccepted = false;
          }
          this._count++;

        },
        _getWatchedAttributes: function() {
          return [{
            node: this._dndNode,
            attribute: 'dndAccepted'
          }, {
            node: this._dndNode,
            attribute: 'dndIdRef'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._dndNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
