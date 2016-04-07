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

modulum('DateEditController', ['ValueContainerControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DateEditController
     * @extends classes.ValueContainerControllerBase
     */
    cls.DateEditController = context.oo.Class(cls.ValueContainerControllerBase, function($super) {
      /** @lends classes.DateEditController.prototype */
      return {
        __name: "DateEditController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var container = this.getNodeBindings().container;
          var decorator = this.getNodeBindings().decorator;
          var valueNode = anchor.getTag() === "Value" ? anchor : null;

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.DialogTypeVMBehavior(this, container));
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
          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          this._addBehavior(new cls.FirstDayOfWeek4STBehavior(this));
          this._addBehavior(new cls.DaysOff4STBehavior(this));

          // vm behaviors
          if (container.getTag() !== 'FormField') {
            this._addBehavior(new cls.FocusCurrentCellPseudoSelectorBehavior(this, container));
          }
          this._addBehavior(new cls.EnabledVMBehavior(this, container, container));
          this._addBehavior(new cls.HiddenVMBehavior(this, container));
          this._addBehavior(new cls.ColorVMBehavior(this, decorator, decorator, valueNode, valueNode));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, decorator, decorator, valueNode, valueNode));
          this._addBehavior(new cls.FontWeightVMBehavior(this, decorator, valueNode));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, decorator));
          this._addBehavior(new cls.TextAlignVMBehavior(this, decorator, container));
          this._addBehavior(new cls.TextTransformVMBehavior(this, decorator));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, decorator, valueNode));
          this._addBehavior(new cls.CursorsVMBehavior(this, container));
          this._addBehavior(new cls.TitleVMBehavior(this, decorator));

          /* WARNING : Format & Picture have to be set before value */
          this._addBehavior(new cls.FormatVMBehavior(this, decorator));
          this._addBehavior(new cls.PictureVMBehavior(this, decorator));
          this._addBehavior(new cls.ValueVMBehavior(this, anchor));

          // ui behaviors
          this._addBehavior(new cls.SendValueUIBehavior(this, anchor));
          this._addBehavior(new cls.RequestFocusUIBehavior(this, container));
          if (container.getTag() === 'TableColumn') {
            this._addBehavior(new cls.TableImageVMBehavior(this, anchor));
            this._addBehavior(new cls.TableColumnDialogTypeVMBehavior(this, container));
            this._addBehavior(new cls.RowSelectionUIBehavior(this, anchor, container.getParentNode()));
            this._addBehavior(new cls.TableItemCurrentRowVMBehavior(this, container.getParentNode()));
          }
        },
        _createWidget: function(kind) {

          var container = this.getNodeBindings().container;
          var isInTable = (container.getTag() === 'TableColumn');

          var resultId = "DateEdit";
          if (kind === "Construct") {
            resultId = "DummyEdit";
          } else if (isInTable && kind.startsWith("Display")) {
            resultId = "Label";
          }
          return cls.WidgetFactory.create(resultId, this.getNodeBindings().decorator.attribute('style'));
        }
      };
    });
    cls.ControllerFactory.register("DateEdit", cls.DateEditController);

  });
