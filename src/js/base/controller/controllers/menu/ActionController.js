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

modulum('ActionController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionController
     * @extends classes.ControllerBase
     */
    cls.ActionController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.ActionController.prototype */
      return {
        __name: "ActionController",

        constructor: function(bindings) {
          $super.constructor.call(this, bindings);
        },

        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var parentNode = anchor.getParentNode();
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
          this._addBehavior(new cls.EnabledButtonVMBehavior(this, anchor, uiNode));
          this._addBehavior(new cls.ActionEnabledVMBehavior(this, anchor, parentNode));
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextActionVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.ImageVMBehavior(this, anchor));
          this._addBehavior(new cls.TitleVMBehavior(this, anchor));
          if (anchor.attribute('name') === 'close') {
            this._addBehavior(new cls.WindowCanCloseVMBehavior(this, anchor));
          }

          // ScaleIcon requires that the image is already present
          this._addBehavior(new cls.ScaleIcon4STBehavior(this, true));

          // ui behaviors
          this._addBehavior(new cls.OnClickUIBehavior(this, anchor, null, anchor, uiNode));

        },
        _createWidget: function() {
          return cls.WidgetFactory.create('Action', this.getAnchorNode().attribute('style'));
        },

        destroy: function() {
          var anchor = this.getNodeBindings().anchor;
          $super.destroy.call(this);
        }

      };
    });
    cls.ControllerFactory.register("Action", cls.ActionController);

  });
