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

modulum('UserInterfaceController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.UserInterfaceController
     * @extends classes.ControllerBase
     */
    cls.UserInterfaceController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.UserInterfaceController.prototype */
      return {
        __name: "UserInterfaceController",
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
          this._addBehavior(new cls.FocusPseudoSelectorBehavior(this, anchor));
          this._addBehavior(new cls.RuntimeStatusVMBehavior(this, anchor));
          this._addBehavior(new cls.ApplicationTitleVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.CurrentWindowVMBehavior(this, anchor));
          this._addBehavior(new cls.StartMenuPositionUIBehavior(this, anchor));
          this._addBehavior(new cls.ImageVMBehavior(this, anchor));
          this._addBehavior(new cls.DBDateVMBehavior(this, anchor));
          this._addBehavior(new cls.CurrentTitleVMBehavior(this, anchor));

        },
        _createWidget: function() {
          var widget = cls.WidgetFactory.create('UserInterface', this.getAnchorNode().attribute('style'));
          widget.setSidebarWidget(this.getNodeBindings().anchor.getApplication().getUI().getWidget().getSidebarWidget());
          return widget;
        }
      };
    });
    cls.ControllerFactory.register("UserInterface", cls.UserInterfaceController);

  });
