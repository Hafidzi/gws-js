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

modulum('DialogController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DialogController
     * @extends classes.ControllerBase
     */
    cls.DialogController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.DialogController.prototype */
      return {
        __name: "DialogController",
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
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.MenuEnabledVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.VisibleMenuVMBehavior(this, anchor));

          // 4ST styles
          this._addBehavior(new cls.ActionPanelPosition4STBehavior(this, anchor));
          this._addBehavior(new cls.ActionPanelButtonTextAlign4STBehavior(this, anchor));
          this._addBehavior(new cls.ActionPanelButtonTextHidden4STBehavior(this, anchor));
          //this._addBehavior(new cls.RingMenuPosition4STBehavior(this, anchor));
        },
        _createWidget: function() {
          return cls.WidgetFactory.create('Dialog', this.getAnchorNode().attribute('style'));
        },
        attachUI: function() {
          if (this._widget) {
            this.getAnchorNode().getAncestor('Window').getController().getWidget().addMenu(this._widget);
          }
        }
      };
    });
    cls.ControllerFactory.register("Dialog", cls.DialogController);

  });
