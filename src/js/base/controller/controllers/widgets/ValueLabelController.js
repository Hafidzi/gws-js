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

modulum('ValueLabelController', ['ValueContainerControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ValueLabelController
     * @extends classes.ValueContainerControllerBase
     */
    cls.ValueLabelController = context.oo.Class(cls.ValueContainerControllerBase, function($super) {
      /** @lends classes.ValueLabelController.prototype */
      return {
        __name: "ValueLabelController",
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

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, decorator, container));
          // END WARNING

          // vm behaviors
          this._addBehavior(new cls.EnabledVMBehavior(this, container, container));
          this._addBehavior(new cls.HiddenVMBehavior(this, container));
          this._addBehavior(new cls.ColorVMBehavior(this, decorator, decorator));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this, decorator, decorator));
          this._addBehavior(new cls.FontWeightVMBehavior(this, decorator));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, decorator));
          this._addBehavior(new cls.TextAlignVMBehavior(this, decorator, isStatic ? null : container));
          this._addBehavior(new cls.TextTransformVMBehavior(this, decorator));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, decorator));
          this._addBehavior(new cls.TitleVMBehavior(this, decorator));
          if (isStatic) {
            this._addBehavior(new cls.TextLabelVMBehavior(this, anchor));
          } else {
            this._addBehavior(new cls.ValueVMBehavior(this, anchor));
            this._addBehavior(new cls.RequestFocusUIBehavior(this, container));
          }
          // ui behaviors
          if (container.getTag() === 'TableColumn') {
            this._addBehavior(new cls.RowSelectionUIBehavior(this, anchor, container.getParentNode()));
          }
        },
        _createWidget: function() {
          return cls.WidgetFactory.create('ValueLabel');
        }
      };
    });
    cls.ControllerFactory.register("ValueLabel", cls.ValueLabelController);

  });
