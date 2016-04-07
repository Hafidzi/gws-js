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

modulum('DragDropInfoController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DragDropInfoController
     * @extends classes.ControllerBase
     */
    cls.DragDropInfoController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.DragDropInfoController.prototype */
      return {
        __name: "DragDropInfoController",

        /**
         * @constructs
         * @param {classes.ControllerBindings} bindings
         */
        constructor: function(bindings) {
          $super.constructor.call(this, bindings);

          var anchor = this.getNodeBindings().anchor;
          // vm behaviors
          this._addBehavior(new cls.DndAcceptedVMBehavior(this, anchor));

          context.DndService.dragDropInfoNode = anchor;
          context.DndService.dndAccepted = false;
        },

        /**
         *
         */
        destroy: function() {
          $super.destroy.call(this);

          context.DndService.dragDropInfoNode = null;
          context.DndService.dndAccepted = false;
        },

        createWidget: function() {
          // DragDropInfo don't create own widgets
          return null;
        }
      };
    });
    cls.ControllerFactory.register("DragDropInfo", cls.DragDropInfoController);
  });
