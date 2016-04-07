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

modulum('FormController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FormController
     * @extends classes.ControllerBase
     */
    cls.FormController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.FormController.prototype */
      return {
        __name: "FormController",
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
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.FontWeightVMBehavior(this, anchor));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, anchor));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextVMBehavior(this, anchor));
          this._addBehavior(new cls.VisibleIdVmBehavior(this, anchor));

          // ui behaviors
        },
        _createWidget: function() {
          return cls.WidgetFactory.create('Form', this.getAnchorNode().attribute('style'));
        }
      };
    });
    cls.ControllerFactory.register("Form", cls.FormController);

  });
