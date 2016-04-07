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

modulum('MenuController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MenuController
     * @extends classes.ControllerBase
     */
    cls.MenuController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.MenuController.prototype */
      return {
        __name: "MenuController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // pseudo-selector behaviors
          this._addBehavior(new cls.ActivePseudoSelectorBehavior(this, anchor));
          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          // vm behaviors
          this._addBehavior(new cls.MenuEnabledVMBehavior(this, anchor));
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextActionVMBehavior(this, anchor));
          this._addBehavior(new cls.ImageVMBehavior(this, anchor));
          this._addBehavior(new cls.TitleVMBehavior(this, anchor));
          this._addBehavior(new cls.WindowTypeVMBehavior(this, anchor));
          this._addBehavior(new cls.SendAllKeyVMBehavior(this, anchor));

          this._addBehavior(new cls.WindowCloseUIBehavior(this, anchor.getParentNode()));

          // 4ST styles
          this._addBehavior(new cls.ActionPanelButtonTextAlign4STBehavior(this, anchor));
          this._addBehavior(new cls.ActionPanelButtonTextHidden4STBehavior(this, anchor));
          this._addBehavior(new cls.RingMenuPosition4STBehavior(this, anchor));

        },
        _createWidget: function() {
          return cls.WidgetFactory.create('Menu', this.getAnchorNode().attribute('style'));
        },
        attachUI: function() {
          if (this._widget) {
            this.getAnchorNode().getAncestor('Window').getController().getWidget().addMenu(this._widget);
          }
        }
      };
    });
    cls.ControllerFactory.register("Menu", cls.MenuController);

  });
