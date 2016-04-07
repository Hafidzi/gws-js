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

modulum('ButtonController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ButtonController
     * @extends classes.ControllerBase
     */
    cls.ButtonController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.ButtonController.prototype */
      return {
        __name: "ButtonController",

        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var uiNode = anchor.getApplication().uiNode();

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // pseudo-selector behaviors
          this._addBehavior(new cls.ActivePseudoSelectorBehavior(this, anchor));
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));

          // vm behaviors
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.EnabledButtonVMBehavior(this, anchor, uiNode, anchor));
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.FontWeightVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, anchor));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, anchor));
          this._addBehavior(new cls.ImageVMBehavior(this, anchor));
          this._addBehavior(new cls.TextActionVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.TitleVMBehavior(this, anchor));

          // ScaleIcon requires that the image is already present
          this._addBehavior(new cls.ScaleIcon4STBehavior(this, false));

          // ui behaviors
          this._addBehavior(new cls.OnClickUIBehavior(this, anchor, anchor, null, uiNode));
          this._addBehavior(new cls.InterruptUIBehavior(this, anchor));
        },
        _createWidget: function() {
          return cls.WidgetFactory.create('Button', this.getAnchorNode().attribute('style'));
        }
      };
    });
    cls.ControllerFactory.register("Button", cls.ButtonController);

  });
