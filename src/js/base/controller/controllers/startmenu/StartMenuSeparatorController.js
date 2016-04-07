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

modulum('StartMenuSeparatorController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.StartMenuSeparatorController
     * @extends classes.ControllerBase
     */
    cls.StartMenuSeparatorController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.StartMenuSeparatorController.prototype */
      return {
        __name: "StartMenuSeparatorController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          // vm behaviors
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
        },
        _createWidget: function(kind) {
          var widget = null;
          switch (kind) {
            case "poptree":
              // poptree isn't implemented, using tree instead
              /* falls through */
            case "tree":
              widget = cls.WidgetFactory.create('StartMenuSeparator', this.getAnchorNode().attribute('style'));
              break;
            case "menu":
              widget = cls.WidgetFactory.create('TopMenuSeparator', this.getAnchorNode().attribute('style'));
              break;
          }
          return widget;
        }
      };
    });
    cls.ControllerFactory.register("StartMenuSeparator", cls.StartMenuSeparatorController);

  });
