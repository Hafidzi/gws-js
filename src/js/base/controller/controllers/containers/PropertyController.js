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

modulum('PropertyController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.PropertyController
     * @extends classes.ControllerBase
     */
    cls.PropertyController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.PropertyController.prototype */
      return {
        __name: "PropertyController",

        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          // vm behaviors
          this._addBehavior(new cls.PropertyVMBehavior(this, anchor));
          // ui behaviors
        },

        _createWidget: function() {
          return null;
        }
      };
    });
    cls.ControllerFactory.register("Property", cls.PropertyController);

  });
