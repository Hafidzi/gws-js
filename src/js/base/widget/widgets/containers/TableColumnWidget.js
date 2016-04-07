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

modulum('TableColumnWidget', ['WidgetGroupBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Table column widget.
     * @class classes.TableColumnWidget
     * @extends classes.WidgetGroupBase
     */
    cls.TableColumnWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.TableColumnWidget.prototype */
      return {
        __name: "TableColumnWidget",

        /**
         * the title widget
         * @type {classes.TableColumnTitleWidget}
         */
        _title: null,

        /**
         * the aggregate widget
         * @type {classes.TableColumnTitleWidget}
         */
        _aggregate: null,

        _isTreeView: false,

        _isUnhidable: false,

        /**
         * @constructs {classes.TableColumnWidget}
         */
        constructor: function(isTreeView) {
          this._isTreeView = isTreeView;
          $super.constructor.call(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._title = cls.WidgetFactory.create("TableColumnTitle");
          this._title.setParentWidget(this);

          this.$().on('dblclick', function(evt) {
            this.emit(context.constants.widgetEvents.doubleClick);
          }.bind(this));
        },

        /**
         * @inheritDoc
         */
        addChildWidget: function(widget, options) {
          var tableColumnItem = cls.WidgetFactory.create("TableColumnItem", null, this._isTreeView);
          if (this._isTreeView) {
            tableColumnItem.on(context.constants.widgetEvents.click, function(event, sender) {
              var index = sender.getItemIndex();
              this.emit(context.constants.widgetEvents.click, index);
            }.bind(this));
          }
          tableColumnItem.addChildWidget(widget);
          var isHidden = false;
          var parent = this.getParentWidget();
          if (parent) {
            isHidden = this.getChildren().length + 1 >= parent.getVisibleRows();
          }
          tableColumnItem.setHidden(isHidden);
          $super.addChildWidget.call(this, tableColumnItem, options);
        },
        /**
         * @inheritDoc
         */
        removeChildWidget: function(widget) {
          var item = widget.getParentWidget();
          $super.removeChildWidget(item);
        },

        /**
         * Set/add an aggregate cell
         * @param text aggregate text & value
         */
        setAggregate: function(text) {

          var tableWidget = this.getParentWidget();
          if (text !== "") {
            if (!this._aggregate) {
              this._aggregate = cls.WidgetFactory.create("TableColumnAggregate");
              this._aggregate.setParentWidget(this);
              tableWidget.getColumnsFooter().append(this._aggregate.getElement());
            }

            this._aggregate.setText(text);

            var columns = tableWidget.getOrderedColumns();
            var aggregateWidth = this.getWidthNumber();
            for (var i = this.getOrderedColumnIndex() - 1; i >= 0; i--) {
              var col = columns[i];
              if (col._aggregate === null) {
                aggregateWidth += col.getWidthNumber();
              } else {
                break;
              }
            }
            this._aggregate.setWidth(aggregateWidth);

          } else {
            if (this._aggregate) {
              this._aggregate.getElement().remove();
            }
            this._aggregate = null;
          }
        },

        /**
         * Returns true if column is a treeview
         * @returns {boolean} treeview ?
         */
        isTreeView: function() {
          return this._isTreeView;
        },

        /**
         * Sets if the column can be hidden by the user
         * @param {boolean}
         */
        setUnhidable: function(b) {
          this._isUnhidable = b;
        },

        /**
         * Returns true if column is unhidable
         * @returns {boolean}
         */
        isUnhidable: function() {
          return this._isUnhidable;
        },

        /**
         * Update aggregate width
         */
        updateAggregateWidth: function() {

          // search column which contain an aggregate
          var tableWidget = this.getParentWidget();
          if (!!tableWidget) {
            var columns = tableWidget.getOrderedColumns();
            for (var i = this.getOrderedColumnIndex(); i < columns.length; i++) {
              var col = columns[i];
              if (!!col._aggregate) {
                col.setAggregate(col._aggregate.getText());
                break;
              }
            }
          } else if (!!this._aggregate) {
            this.setAggregate(this._aggregate.getText());
          }
        },

        /**
         * Update all aggregates width
         */
        updateAllAggregateWidth: function() {

          // search column which contain an aggregate
          var tableWidget = this.getParentWidget();
          var columns = tableWidget.getOrderedColumns();

          for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            if (!!col._aggregate) {
              col.setAggregate(col._aggregate.getText());
            }
          }
        },

        /**
         * Global text for aggregates
         * @param text
         */
        setAggregateGlobalText: function(text) {
          this.getParentWidget().getColumnsFooter().find(".gbc_TableAggregateGlobalText").text(text);
        },

        /**
         * Returns index of the column in the parent table
         * @returns {number} index of the column in the table
         */
        getColumnIndex: function() {
          var parent = this.getParentWidget();
          if (!!parent) {
            return parent.getColumns().indexOf(this);
          }
          return -1;
        },

        /**
         * Returns index of the column in the parent table
         * @returns {number} index of the column in the table
         */
        getOrderedColumnIndex: function() {
          var parent = this.getParentWidget();
          if (!!parent) {
            return parent.getOrderedColumns().indexOf(this);
          }
          return -1;
        },

        /**
         * @param {number} height row height (pixels)
         */
        setRowHeight: function(height) {
          var parent = this.getParentWidget();
          if (!!parent && height > parent.getRowHeight()) {
            parent.setRowHeight(height);
          }
        },

        /**
         *
         * @param {number} index
         * @returns {classes.TableColumnItemWidget}
         */
        getColumnItem: function(index) {
          return this._children[index];
        },
        /**
         * @returns {classes.TableColumnTitleWidget} the title widget
         */
        getTitleWidget: function() {
          return this._title;
        },

        /**
         * @param {string} text the text to display
         */
        setText: function(text) {
          this.getTitleWidget().setText(text);
        },

        /**
         * @returns {string} the text to display
         */
        getText: function() {
          return this.getTitleWidget().getText();
        },

        /**
         * @param {number} width column width (pixels)
         */
        setWidth: function(width) {
          this.setStyle({
            "width": width + "px"
          });
          this.getTitleWidget().setWidth(width);
          this.updateAggregateWidth();
        },

        /**
         * @returns {number} column width
         */
        getWidthNumber: function() {
          return parseFloat(this.getWidth());
        },

        /**
         * @returns {string} column width (ex:"42px")
         */
        getWidth: function() {
          return this.getStyle("width");
        },

        /**
         * @param {number} index order index
         */
        setOrder: function(index) {
          this.setStyle({
            "order": index
          });

          this.getTitleWidget().setOrder(index);
          if (!!this._aggregate) {
            this._aggregate.setOrder(index + 1);
          }
          this.updateAllAggregateWidth();
        },

        /**
         * @returns {number} order index
         */
        getOrder: function() {
          return parseInt(this.getStyle("order"));
        },

        /**
         * @param {number} row current row
         */
        setCurrentRow: function(row) {
          var children = this.getChildren();
          var length = children.length;
          for (var i = 0; i < length; ++i) {
            var tableColumnItem = children[i];
            tableColumnItem.setCurrent(i === row);
          }
        },

        /**
         * @param {boolean} current true if the column is the current one, false otherwise
         */
        setCurrent: function(current) {
          this.getElement().toggleClass("currentColumn", !!current);
        },

        /**
         * Updates rows visibility depending on the number of visible rows defined in the parent TableWidget
         */
        updateRowsVisibility: function() {
          var visibleRows = this.getParentWidget().getVisibleRows();
          var children = this.getChildren();
          for (var i = 0; i < children.length; ++i) {
            var tableColumnItemWidget = children[i];
            tableColumnItemWidget.setHidden(i >= visibleRows);
          }
        },

        /**
         *
         * @param {number} row index of the row
         * @param {boolean} selected true if the row should be selected, false otherwise
         */
        setRowSelected: function(row, selected) {
          var children = this.getChildren();
          if (row < children.length) {
            children[row].setSelected(selected);
          }
        },

        /**
         * @param {number} row index of the row
         * @returns {boolean} true if the row is selected, false otherwise
         */
        isRowSelected: function(row) {
          var children = this.getChildren();
          if (row < children.length) {
            return children[row].isSelected();
          }
          return false;
        },

        /**
         * setHidden
         * @param {boolean} state
         */
        setHidden: function(state) {
          $super.setHidden.call(this, state);
          //hide title as well
          this.getTitleWidget().setHidden(state);
        },

        /**
         * Returns lastItemDropZone element
         * @returns {object} lastItemDropZone jquery element
         */
        getAfterLastItemDropZone: function() {
          return this.$(".gbc_TableAfterLastItemDropZone");
        },

        /**
         * @param {number} row
         * @returns {object} item widget
         */
        getItemWidget: function(row) {
          return this.getChildren()[row].getChildren()[0];
        },

        /**
         * Auto set width according to max length of column values
         */
        autoSetWidth: function() {
          var maxWidth = 30;
          var children = this.getChildren();
          for (var i = 0; i < children.length; ++i) {
            var tableColumnItemWidget = children[i];

            var widget = tableColumnItemWidget.getChildren()[0];

            this.getParentWidget().getElement().addClass("g_measuring").removeClass("g_measured");
            widget._layoutInformation.invalidateMeasure();
            widget._layoutEngine.measure();
            this.getParentWidget().getElement().removeClass("g_measuring").addClass("g_measured");

            var width = widget._layoutInformation.getMeasured().getWidth();
            if (width > maxWidth) {
              maxWidth = width;
            }
          }
          this.setWidth(maxWidth);
        }
      };
    });
    cls.WidgetFactory.register('TableColumn', cls.TableColumnWidget);
  });
