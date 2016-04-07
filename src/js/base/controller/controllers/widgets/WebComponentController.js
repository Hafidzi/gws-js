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

modulum('WebComponentController', ['ValueContainerControllerBase', 'ControllerFactory', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WebComponentController
     * @extends classes.ValueContainerControllerBase
     */
    cls.WebComponentController = context.oo.Class(cls.ValueContainerControllerBase, function($super) {
      /** @lends classes.WebComponentController.prototype */
      return {
        __name: "WebComponentController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var container = this.getNodeBindings().container;
          var decorator = this.getNodeBindings().decorator;

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, decorator, container));
          this._addBehavior(new cls.StyleVMBehavior(this, decorator));
          // END WARNING

          // pseudo-selector behaviors
          this._addBehavior(new cls.ActivePseudoSelectorBehavior(this, anchor));
          this._addBehavior(new cls.DialogTypePseudoSelectorBehavior(this, anchor));
          if (container.getTag() === 'Matrix') {
            this._addBehavior(new cls.OffsetPseudoSelectorBehavior(this, container));
            this._addBehavior(new cls.MatrixCurrentRowVMBehavior(this, anchor, container));
          }
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          // vm behaviors
          if (container.getTag() !== 'FormField') {
            this._addBehavior(new cls.FocusCurrentCellPseudoSelectorBehavior(this, container));
          }
          this._addBehavior(new cls.ValueVMBehavior(this, anchor));
          this._addBehavior(new cls.ComponentTypeVMBehavior(this, decorator));
          this._addBehavior(new cls.EnabledVMBehavior(this, decorator));
          this._addBehavior(new cls.HiddenVMBehavior(this, decorator));
          this._addBehavior(new cls.PropertyVMBehavior(this, decorator));
          this._addBehavior(new cls.ColorVMBehavior(this, decorator, decorator));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, decorator, decorator));
          this._addBehavior(new cls.FontWeightVMBehavior(this, decorator));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, decorator));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, decorator));
          this._addBehavior(new cls.TitleVMBehavior(this, decorator));
          this._addBehavior(new cls.ScrollBarsVMBehavior(this, decorator));
          // ui behaviors
          this._addBehavior(new cls.RequestFocusUIBehavior(this, container));
          this._addBehavior(new cls.OnActionUIBehavior(this, container));
          this._addBehavior(new cls.OnDataUIBehavior(this, container));

        },
        _createWidget: function() {
          return cls.WidgetFactory.create('WebComponent', this.getNodeBindings().decorator.attribute('style'));
        }
      };
    });
    cls.ControllerFactory.register("WebComponent", cls.WebComponentController);

  });
