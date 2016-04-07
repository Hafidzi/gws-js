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

modulum('ImageController', ['ValueContainerControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ImageController
     * @extends classes.ValueContainerControllerBase
     */
    cls.ImageController = context.oo.Class(cls.ValueContainerControllerBase, function($super) {
      /** @lends classes.ImageController.prototype */
      return {
        __name: "ImageController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var decorator = this.getNodeBindings().decorator;
          var container = this.getNodeBindings().container;
          var uiNode = anchor.getApplication().uiNode();

          var isStatic = !decorator && !container;
          if (isStatic) {
            // Static label case (no parent FormField)
            decorator = anchor;
            container = anchor;
          }
          var valueNode = anchor.getTag() === "Value" ? anchor : null;

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, decorator, container));
          this._addBehavior(new cls.StyleVMBehavior(this, decorator));
          // END WARNING

          // pseudo-selector behaviors
          if (!isStatic) {
            this._addBehavior(new cls.ActivePseudoSelectorBehavior(this, anchor));
            this._addBehavior(new cls.DialogTypePseudoSelectorBehavior(this, anchor));
            if (container.getTag() === 'Matrix') {
              this._addBehavior(new cls.OffsetPseudoSelectorBehavior(this, container));
              this._addBehavior(new cls.MatrixCurrentRowVMBehavior(this, anchor, container));
            }
          }
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          this._addBehavior(new cls.Alignment4STBehavior(this));

          // vm behaviors
          if (!isStatic && container.getTag() !== 'FormField') {
            this._addBehavior(new cls.FocusCurrentCellPseudoSelectorBehavior(this, container));
          }
          this._addBehavior(new cls.EnabledVMBehavior(this, container, container));
          this._addBehavior(new cls.HiddenVMBehavior(this, container));
          this._addBehavior(new cls.ColorVMBehavior(this, decorator, decorator, valueNode, valueNode));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, decorator, decorator, valueNode, valueNode));
          this._addBehavior(new cls.FontWeightVMBehavior(this, decorator, valueNode));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, decorator, valueNode));
          this._addBehavior(new cls.TitleVMBehavior(this, decorator));
          this._addBehavior(new cls.AutoScaleVMBehavior(this, decorator));

          this._addBehavior(new cls.DefaultTTFColor4STBehavior(this));

          if (isStatic) {
            this._addBehavior(new cls.ImageVMBehavior(this, anchor));
          } else {
            this._addBehavior(new cls.RequestFocusUIBehavior(this, container));
            this._addBehavior(new cls.ValueVMBehavior(this, anchor));
          }
          // ui behaviors
          if (isStatic) {
            this._addBehavior(new cls.OnClickUIBehavior(this, anchor, decorator, null, uiNode));
          } else {
            this._addBehavior(new cls.OnClickUIBehavior(this, decorator, decorator, null, uiNode));
          }
          if (container.getTag() === 'TableColumn') {
            this._addBehavior(new cls.TableImageVMBehavior(this, anchor));
            this._addBehavior(new cls.TableColumnDialogTypeVMBehavior(this, container));
            this._addBehavior(new cls.RowSelectionUIBehavior(this, anchor, container.getParentNode()));
            this._addBehavior(new cls.TableItemCurrentRowVMBehavior(this, container.getParentNode()));
          }
        },
        _createWidget: function() {
          var styleNode = this.getNodeBindings().decorator ? this.getNodeBindings().decorator : this.getAnchorNode();
          var imgWidget = cls.WidgetFactory.create('Image', styleNode.attribute('style'));
          imgWidget.getElement().addClass("gbc_withBorder");
          imgWidget.getElement().addClass("gbc_selfImage");
          return imgWidget;
        }
      };
    });
    cls.ControllerFactory.register("Image", cls.ImageController);

  });
