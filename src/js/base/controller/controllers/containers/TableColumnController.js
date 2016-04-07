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

modulum('TableColumnController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnController
     * @extends classes.ControllerBase
     */
    cls.TableColumnController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.TableColumnController.prototype */
      return {
        __name: "TableColumnController",
        _isTreeViewColumn: false,
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          var tableNode = anchor.getParentNode();

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          // vm behaviors
          this._addBehavior(new cls.EnabledVMBehavior(this, anchor));
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextVMBehavior(this, anchor));
          this._addBehavior(new cls.TableColumnWidthVMBehavior(this, anchor.getFirstChild()));
          this._addBehavior(new cls.TableRowHeightVMBehavior(this, anchor.getFirstChild()));
          this._addBehavior(new cls.AggregateVMBehavior(this, anchor, anchor, tableNode));
          this._addBehavior(new cls.TabIndexVMBehavior(this, anchor));
          this._addBehavior(new cls.TextAlignVMBehavior(this, this.getNodeBindings().decorator, anchor));

          // ui behaviors
          this._addBehavior(new cls.OnDoubleClickUIBehavior(this, tableNode, tableNode, tableNode));
          this._addBehavior(new cls.TableColumnSortUIBehavior(this, anchor));
          this._addBehavior(new cls.TableColumnHideUIBehavior(this, anchor));
          this._addBehavior(new cls.TableColumnOrderUIBehavior(this, anchor));
          this._addBehavior(new cls.TableColumnDndUIBehavior(this, anchor));
          if (this._isTreeViewColumn) {
            this._addBehavior(new cls.TreeItemKeyExpandUIBehavior(this, anchor));
            this._addBehavior(new cls.TreeItemToggleUIBehavior(this, anchor));
          }
        },
        _createWidget: function() {
          var tableColumnNode = this.getNodeBindings().anchor;
          var tableNode = tableColumnNode.getParentNode();
          this._isTreeViewColumn = !!tableNode.getFirstChild('TreeInfo') && tableNode.getFirstChild('TableColumn') ===
            tableColumnNode;
          return cls.WidgetFactory.create('TableColumn', this.getAnchorNode().attribute('style'), this._isTreeViewColumn);
        }
      };
    });
    cls.ControllerFactory.register("TableColumn", cls.TableColumnController);

  });
