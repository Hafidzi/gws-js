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

modulum('LabelController', ['ValueContainerControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.LabelController
     * @extends classes.ValueContainerControllerBase
     */
    cls.LabelController = context.oo.Class(cls.ValueContainerControllerBase, function($super) {
      /** @lends classes.LabelController.prototype */
      return {
        __name: "LabelController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var decorator = this.getNodeBindings().decorator;
          var container = this.getNodeBindings().container;
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
          // vm behaviors
          if (!isStatic && container.getTag() !== 'FormField') {
            this._addBehavior(new cls.FocusCurrentCellPseudoSelectorBehavior(this, container));
          }
          this._addBehavior(new cls.EnabledVMBehavior(this, container, container));
          this._addBehavior(new cls.HiddenVMBehavior(this, container));
          this._addBehavior(new cls.ColorVMBehavior(this, decorator, decorator, valueNode, valueNode));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, decorator, decorator, valueNode, valueNode));
          this._addBehavior(new cls.FontWeightVMBehavior(this, decorator, valueNode));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, decorator));
          this._addBehavior(new cls.TextAlignVMBehavior(this, decorator, isStatic ? null : container));
          this._addBehavior(new cls.TextTransformVMBehavior(this, decorator));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, decorator, valueNode));
          this._addBehavior(new cls.TitleVMBehavior(this, decorator));
          if (isStatic) {
            this._addBehavior(new cls.TextLabelVMBehavior(this, anchor));
          } else {
            this._addBehavior(new cls.ValueVMBehavior(this, anchor));
            this._addBehavior(new cls.RequestFocusUIBehavior(this, container));
          }
          // ui behaviors
          if (container.getTag() === 'TableColumn') {
            this._addBehavior(new cls.TableImageVMBehavior(this, anchor));
            this._addBehavior(new cls.TableColumnDialogTypeVMBehavior(this, container));
            this._addBehavior(new cls.RowSelectionUIBehavior(this, anchor, container.getParentNode()));
            this._addBehavior(new cls.TableItemCurrentRowVMBehavior(this, container.getParentNode()));
          }

          //Put this 4st Behavior at the end since it's reformatting the value content
          this._addBehavior(new cls.TextFormat4STBehavior(this));

        },
        _createWidget: function() {
          var styleNode = this.getNodeBindings().decorator ? this.getNodeBindings().decorator : this.getAnchorNode();
          return cls.WidgetFactory.create('Label', styleNode.attribute('style'));
        }
      };
    });
    cls.ControllerFactory.register("Label", cls.LabelController);

  });
