/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('WindowController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowController
     * @extends classes.ControllerBase
     */
    cls.WindowController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.WindowController.prototype */
      return {
        __name: "WindowController",
        constructor: function(bindings) {
          $super.constructor.call(this, bindings);
        },
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var ui = anchor.getApplication().model.getNode(0);

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // vm behaviors
          this._addBehavior(new cls.WindowHiddenVMBehavior(this, ui));
          this._addBehavior(new cls.WindowTitleVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.FontWeightVMBehavior(this, anchor));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, anchor));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.ImageVMBehavior(this, anchor));
          this._addBehavior(new cls.WindowTypeVMBehavior(this, anchor));
          this._addBehavior(new cls.WindowCloseUIBehavior(this, anchor));
          this._addBehavior(new cls.CurrentTitleVMBehavior(this, anchor));
          // 4st behaviors
          this._addBehavior(new cls.WindowOptionClose4STBehavior(this, anchor));
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));

        },
        _createWidget: function() {
          return cls.WidgetFactory.create('Window', this.getAnchorNode().attribute('style'));
        }
      };
    });
    cls.ControllerFactory.register("Window", cls.WindowController);

  });
