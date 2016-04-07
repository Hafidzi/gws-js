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

modulum('TableController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableController
     * @extends classes.ControllerBase
     */
    cls.TableController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.TableController.prototype */
      return {
        __name: "TableController",

        // specific variables used for multirow selection // TODO is it really the right place
        _multiRowSelectionRoot: -1,
        _updateMultiRowSelectionRoot: false,

        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // pseudo-selector behaviors
          this._addBehavior(new cls.OffsetPseudoSelectorBehavior(this, anchor));
          // vm behaviors
          this._addBehavior(new cls.TableDialogTypeVMBehavior(this, anchor));
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.EnabledVMBehavior(this, anchor));
          this._addBehavior(new cls.HiddenVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorVMBehavior(this));
          this._addBehavior(new cls.BackgroundColorVMBehavior(this));
          this._addBehavior(new cls.FontWeightVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this));
          this._addBehavior(new cls.FontFamilyVMBehavior(this, anchor));
          this._addBehavior(new cls.CurrentRowVMBehavior(this, anchor, anchor));
          this._addBehavior(new cls.CurrentColumnVMBehavior(this, anchor));
          this._addBehavior(new cls.VisibleRowsVMBehavior(this, anchor));
          this._addBehavior(new cls.MultiRowSelectionVMBehavior(this, anchor));
          this._addBehavior(new cls.SortVMBehavior(this, anchor));
          this._addBehavior(new cls.ScrollVMBehavior(this, anchor, anchor, anchor));
          // ui behaviors
          this._addBehavior(new cls.ScrollUIBehavior(this, anchor, anchor, anchor));
          this._addBehavior(new cls.OnLayoutUIBehavior(this, anchor));
          this._addBehavior(new cls.RowAndSelectionUIBehavior(this, anchor));
          // 4st behaviors
          this._addBehavior(new cls.TableType4STBehavior(this, anchor));
          this._addBehavior(new cls.FrozenColumns4STBehavior(this, anchor));
          this._addBehavior(new cls.TableHeader4STBehavior(this, anchor));
          this._addBehavior(new cls.ShowGrid4STBehavior(this, anchor));
          this._addBehavior(new cls.TableHighlight4STBehavior(this, anchor));
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));

        },
        _createWidget: function() {
          this._widget = cls.WidgetFactory.create('Table', this.getAnchorNode().attribute('style'));
          this._widget.setScrollWidget();
          return this._widget;
        },

        getScrollableWidget: function() {
          return this.getWidget();
        },

        /**
         * Build row selection event
         * @param {number} row - row selected
         * @param {boolean} ctrlKey - true if ctrl key is pressed
         * @param {boolean} shiftKey - true if shift key is pressed
         * @returns {object} row selection event
         */
        buildRowSelectionEvent: function(row, ctrlKey, shiftKey) {

          var node = this.getNodeBindings().anchor;
          var startIndex = row;
          var endIndex = row;
          var mode = "set";

          if (shiftKey) {
            if (this._multiRowSelectionRoot === -1) {
              this._multiRowSelectionRoot = node.attribute('currentRow');
            }

            startIndex = this._multiRowSelectionRoot;
            endIndex = row;
            mode = ctrlKey ? "exset" : "set";

            this._updateMultiRowSelectionRoot = false;
          } else if (ctrlKey) {
            var rowInfoListNode = node.getChildren().last();
            var rowInfoNode = rowInfoListNode.getChildren()[row - node.attribute('offset')];
            mode = rowInfoNode.attribute('selected') === 1 ? "unset" : "exset";
          }

          return new cls.VMRowSelectionEvent(node.getId(), {
            startIndex: startIndex,
            endIndex: endIndex,
            selectionMode: mode
          });
        },

        /**
         * @param {string} bufferedText text that has been buffered before the widget got the actual focus
         */
        setFocus: function(bufferedText) {
          var tableNode = this.getAnchorNode();
          var valueNode = tableNode.getCurrentValueNode();
          if (valueNode) {
            var controller = valueNode.getController();
            if (controller) {
              var widget = controller.getWidget();
              if (widget && widget.setFocus) {
                widget.setFocus(bufferedText);
              }
            }
          } else {
            this.getWidget().setFocus();
          }
        }
      };
    });
    cls.ControllerFactory.register("Table", cls.TableController);

  });
