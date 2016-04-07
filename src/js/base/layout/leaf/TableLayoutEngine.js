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

modulum('TableLayoutEngine', ['LeafLayoutEngine'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableLayoutEngine
     * @extends classes.LeafLayoutEngine
     */
    cls.TableLayoutEngine = context.oo.Class(cls.LeafLayoutEngine, function($super) {
      /** @lends classes.TableLayoutEngine.prototype */
      return {
        __name: "TableLayoutEngine",
        _hintWidth: null,
        _hintHeight: null,
        setHint: function(widthHint, heightHint) {
          this._hintWidth = widthHint;
          this._hintHeight = heightHint;
        },

        measure: function() {
          $super.measure.call(this);
          var layoutInfo = this._widget.getLayoutInformation();
          var hint = layoutInfo.getPreferred();
          if (!hint.hasWidth()) {
            hint.setWidth(cls.Size.translate(this._widget, this._hintWidth || 1));
          }

          // Search row height, foreach column search the height of first widget
          var maxHeight = this._widget.getRowHeight();
          var columns = this._widget.getColumns();
          var minWidth = 0;
          for (var i = 0; i < columns.length; i++) {
            var columnWidget = columns[i];
            var columnItemWidget = columnWidget.getChildren().length > 0 ? columnWidget.getChildren()[0] : null;
            if (columnItemWidget) {
              var widget = columnItemWidget.getChildren().length > 0 ? columnItemWidget.getChildren()[0] : null;
              if (widget) {
                widget.getElement().addClass("g_measuring").removeClass("g_measured");
                widget._layoutEngine.measure();
                widget.getElement().removeClass("g_measuring").addClass("g_measured");
                var height = widget._layoutInformation.getMeasured().getHeight();
                if (height > maxHeight) {
                  maxHeight = height;
                }
              }
            }
            if (!columnWidget.isHidden()) {
              minWidth += columnWidget.getWidthNumber();
            }
          }
          this._widget.setRowHeight(maxHeight);

          if (!hint.hasHeight()) {
            if (!!this._hintHeight) {
              hint.setHeight(cls.Size.translate(this._widget, this._hintHeight));
            } else {
              hint.setHeight(this._widget._firstPageSize ? this._widget._firstPageSize * (this._widget.getRowHeight() || cls.TableWidget
                .defaultRowHeight) : 1);
            }
          }

          var footerElement = this._widget.getColumnsFooter();
          var scrollAreaElement = this._widget.getElement().querySelector(".gbc_TableScrollArea");

          this._widget._decorateHeight = this._widget.getElement().offsetHeight - scrollAreaElement.offsetHeight + (footerElement.length ?
            footerElement[0].offsetHeight : 0);
          this._widget._decorateWidth = this._widget.getElement().offsetWidth - scrollAreaElement.offsetWidth;

          var parentModalElement = this._widget.getElement().parent("gbc_ModalWidget");
          var isInModal = !!parentModalElement;

          // Set minimal table size
          var minimalPageSize = null;
          if (isInModal) {
            var applicationElement = parentModalElement.parent("gbc_ApplicationWidget");
            var maximalWidth = applicationElement.clientWidth - 200; // Hack 200 (get padding of the modal)
            var calculateWidth = Math.ceil(minWidth) + this._widget._decorateWidth + window.scrollBarSize + 1;
            layoutInfo.getMinimal().setWidth(Math.min(calculateWidth, maximalWidth));

            minimalPageSize = this._widget._firstPageSize ? Math.max(this._widget._firstPageSize, cls.TableWidget.minPageSize) :
              cls.TableWidget.minPageSize;
          } else {
            minimalPageSize = this._widget._firstPageSize ? Math.min(this._widget._firstPageSize, cls.TableWidget.minPageSize) :
              cls.TableWidget.minPageSize;
          }
          layoutInfo.getMinimal().setHeight(minimalPageSize * (this._widget.getRowHeight() || cls.TableWidget.defaultRowHeight) +
            this._widget
            ._decorateHeight + window.scrollBarSize);

        },

        canFollowChildren: function() {
          return "filter";
        },

        getChildren: function() {
          var children = this._widget.getChildren(),
            result = [];
          for (var i = 0; i < children.length; i++) {
            if (children[i].__name === "ScrollWidget") {
              result.push(children[i]);
            }
          }
          return result;

        }
      };
    });
  });
