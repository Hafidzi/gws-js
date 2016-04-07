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

modulum('StartMenuController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.StartMenuController
     * @extends classes.ControllerBase
     */
    cls.StartMenuController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.StartMenuController.prototype */
      return {
        __name: "StartMenuController",
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
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
        },

        _createWidget: function(kind) {
          var widget = null;
          var uiWidget = this.getAnchorNode().getAncestor('UserInterface').getController().getWidget();
          switch (kind) {
            case "poptree":
              // poptree isn't implemented, using tree instead
              /* falls through */
            case "tree":
              widget = cls.WidgetFactory.create('StartMenu', this.getAnchorNode().attribute('style'));
              break;
            case "menu":
              widget = cls.WidgetFactory.create('TopMenu', this.getAnchorNode().attribute('style'));
              break;
          }
          return widget;
        },

        attachUI: function() {
          var uiWidget = this.getAnchorNode().getAncestor('UserInterface').getController().getWidget();
          switch (this._widgetKind) {
            case "poptree":
              // poptree isn't implemented, using tree instead
              /* falls through */
            case "tree":
              uiWidget.addStartMenu(this.getWidget());
              break;
            case "menu":
              uiWidget.addTopMenu(this.getWidget(), 0, uiWidget);
              break;
          }
        },

        _detachWidgetRecursive: function(node) {
          var children = node.getChildren();
          for (var c = 0; c < children.length; c++) {
            this._detachWidgetRecursive(children[c]);
          }
          node.getController()._detachWidget();
        },

        _attachWidgetRecursive: function(node) {
          node.getController()._attachWidget();
          var children = node.getChildren();
          for (var c = 0; c < children.length; c++) {
            this._attachWidgetRecursive(children[c]);
          }
        },

        _createWidgetRecursive: function(node, kind) {
          node.getController()._widget = node.getController()._createWidget(kind);
          var children = node.getChildren();
          for (var c = 0; c < children.length; c++) {
            this._createWidgetRecursive(children[c], kind);
          }
        },

        _detachUIRecursive: function(node) {
          var children = node.getChildren();
          for (var c = 0; c < children.length; c++) {
            this._detachUIRecursive(children[c]);
          }
          node.getController().detachUI();
        },

        _attachUIRecursive: function(node) {
          node.getController().attachUI();
          var children = node.getChildren();
          for (var c = 0; c < children.length; c++) {
            this._attachUIRecursive(children[c]);
          }
        },

        changeWidgetKind: function(kind) {
          if (kind !== this._widgetKind) {
            this._widgetKind = kind;
            var anchor = this.getAnchorNode();
            this._detachWidgetRecursive(anchor);
            this._detachUIRecursive(anchor);
            this._createWidgetRecursive(anchor, kind);
            this._attachUIRecursive(anchor);
            this._attachWidgetRecursive(anchor);
            anchor.applyBehaviors(true, true);
          }
        }
      };
    });
    cls.ControllerFactory.register("StartMenu", cls.StartMenuController);

  });
