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

modulum('PageController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.PageController
     * @extends classes.ControllerBase
     */
    cls.PageController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.PageController.prototype */
      return {
        __name: "PageController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var uiNode = anchor.getApplication().uiNode();

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // ui behaviors
          this._addBehavior(new cls.OnClickUIBehavior(this, anchor, anchor, null, uiNode));
          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          // vm behaviors
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextVMBehavior(this, anchor));
          this._addBehavior(new cls.ImageVMBehavior(this, anchor));
        },

        _createWidget: function() {
          return cls.WidgetFactory.create('Page', this.getAnchorNode().attribute('style'));
        },

        /**
         * @inheritDoc
         */
        ensureVisible: function() {
          var folderWidget = this.getAnchorNode().getParentNode().getController().getWidget();
          folderWidget.setCurrentPage(this.getWidget());
          $super.ensureVisible.call(this);
        }
      };
    });
    cls.ControllerFactory.register("Page", cls.PageController);

  });
