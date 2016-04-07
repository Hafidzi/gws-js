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

modulum('TopMenuController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TopMenuController
     * @extends classes.ControllerBase
     */
    cls.TopMenuController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.TopMenuController.prototype */
      return {
        __name: "TopMenuController",
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
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));

        },
        _createWidget: function() {
          return cls.WidgetFactory.create('TopMenu', this.getAnchorNode().attribute('style'));
        },
        attachUI: function() {
          var parentNode = this.getAnchorNode().getParentNode();
          while (parentNode) {
            var controller = parentNode.getController();
            if (controller) {
              var widget = controller.getWidget();
              if (widget && widget.addTopMenu) {
                var containerWidget = widget;
                if (!parentNode.isModal || !parentNode.isModal()) {
                  containerWidget = this.getAnchorNode().getAncestor('UserInterface').getController().getWidget();
                }
                var order = this.getAnchorNode().getParentNode().getTag() === 'Form' ? 2 : 1;
                widget.addTopMenu(this.getWidget(), order, containerWidget);
                break;
              }
            }
            parentNode = parentNode.getParentNode();
          }
        }
      };
    });
    cls.ControllerFactory.register("TopMenu", cls.TopMenuController);

  });
