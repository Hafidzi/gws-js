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

modulum('TreeItemController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TreeItemController
     * @extends classes.ControllerBase
     */
    cls.TreeItemController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.TreeItemController.prototype */
      return {
        __name: "TreeItemController",

        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var treeViewColumnNode = anchor.getAncestor('Table').getFirstChild('TableColumn');
          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          // vm behaviors
          this._addBehavior(new cls.TreeItemDecorationVMBehavior(this, anchor, treeViewColumnNode));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
        },

        createWidget: function() {
          // TreeItems don't create own widgets, they simply act on the corresponding table column
          return null;
        }
      };
    });
    cls.ControllerFactory.register("TreeItem", cls.TreeItemController);
  });
