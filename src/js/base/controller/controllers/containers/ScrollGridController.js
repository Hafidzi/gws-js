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

modulum('ScrollGridController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ScrollGridController
     * @extends classes.ControllerBase
     */
    cls.ScrollGridController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.ScrollGridController.prototype */
      return {
        __name: "ScrollGridController",
        _scrollWidget: null,

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
          this._addBehavior(new cls.EnabledVMBehavior(this, anchor));
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, anchor));
          this._addBehavior(new cls.ScrollVMBehavior(this, anchor, anchor, anchor));
          this._addBehavior(new cls.ScrollUIBehavior(this, anchor, anchor, anchor));
          this._addBehavior(new cls.WantFixedPageSizeVMBehavior(this, anchor));
          this._addBehavior(new cls.OnPageSizeUIBehavior(this, anchor));
        },

        _createWidget: function() {
          this._scrollWidget = cls.WidgetFactory.create('ScrollGrid', this.getAnchorNode().attribute('style'));
          this._scrollWidget.setScrollWidget();
          return this._scrollWidget;
        },

        getScrollableWidget: function() {
          return this.getWidget();
        },

        destroy: function() {
          this._scrollWidget.destroy();
          $super.destroy.call(this);
        }
      };
    });
    cls.ControllerFactory.register("ScrollGrid", cls.ScrollGridController);

  });
