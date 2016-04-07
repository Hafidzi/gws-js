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

modulum('TableWidget', ['WidgetGroupBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Table widget.
     * @class classes.TableWidget
     * @extends classes.WidgetGroupBase
     */
    cls.TableWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.TableWidget.prototype */
      return {
        __name: "TableWidget",
        /** @lends classes.TableWidget */
        $static: {
          defaultRowHeight: 24,
          minPageSize: 2
        },

        _scrollAreaElement: null,
        _rowHeight: 0,
        _currentRow: 0,
        _currentColumn: 0,
        _decorateHeight: 0,
        _inputMode: false,

        /** @type {number} */
        _visibleRows: 0,
        /** frozen table attributes */
        _frozenTable: false,
        _leftFrozenColumns: 0,
        _rightFrozenColumns: 0,

        /** scroll attributes */
        _scrollWidget: null,
        _pageSize: null,
        _size: null,
        _firstPageSize: null,

        /** Dnd attributes */
        _dndMode: null,
        _dndMouseDragX: null, // mouse X position when dragging (ugly hack for FF because drag event does not contain mouse coordinates)
        _dndReorderingDragOverWidget: null,
        _dndDraggedColumnWidget: null,

        /** styles */
        _highlightColor: null,
        _highlightTextColor: null,
        _highlightCurrentCell: null,
        _highlightCurrentRow: null,
        _showGrid: null,
        _headerAlignment: null,
        _headerHidden: null,

        _initElement: function() {
          $super._initElement.call(this);
          this._scrollAreaElement = this._element.querySelector(".gbc_TableScrollArea");
          this.setFocusable(true);
          this.setRowHeight(cls.TableWidget.defaultRowHeight);

          this._keyboardHelper(['ctrl+up', 'shift+up', 'ctrl+shift+up'], context.constants.widgetEvents.keyUp);
          this._keyboardHelper(['ctrl+down', 'shift+down', 'ctrl+shift+down'], context.constants.widgetEvents.keyDown);
          this._keyboardHelper(['pageup', 'ctrl+pageup', 'shift+pageup', 'ctrl+shift+pageup'], context.constants.widgetEvents.keyPageUp);
          this._keyboardHelper(['pagedown', 'ctrl+pagedown', 'shift+pagedown', 'ctrl+shift+pagedown'], context.constants.widgetEvents
            .keyPageDown);
          this._keyboardHelper(['home', 'ctrl+home', 'shift+home', 'ctrl+shift+home'], context.constants.widgetEvents.keyHome);
          this._keyboardHelper(['end', 'ctrl+end', 'shift+end', 'ctrl+shift+end'], context.constants.widgetEvents.keyEnd);
          this._keyboardHelper(['space', 'ctrl+space', 'ctrl+shift+space'], context.constants.widgetEvents.keySpace);
          this._keyboardHelper(['ctrl+a'], context.constants.widgetEvents.selectAll);

          this._keyboardHelper(['right'], context.constants.widgetEvents.keyRight);
          this._keyboardHelper(['left'], context.constants.widgetEvents.keyLeft);

          this.getColumnsContainer().scroll(function(event) {
            // Synchronize Columns headers horizontal scroll
            this.getColumnsHeaders().scrollLeft(event.target.scrollLeft);
          }.bind(this));

          // Prevent default on dragover, to remove forbidden icon on drag
          var preventDefault = function(event) {
            this._dndMouseDragX = event.originalEvent.screenX; // Fix for FF
            if (!!this._dndMode) {
              event.preventDefault();
            }
          }.bind(this);
          this.getColumnsHeaders().on("dragover", preventDefault);
          this.getLeftColumnsHeaders().on("dragover", preventDefault);
          this.getRightColumnsHeaders().on("dragover", preventDefault);

          this.getColumnsHeaders().on("drop", this._onHeaderDrop.bind(this));
        },

        /**
         * Handle reordering drop event
         * @param evt
         * @private
         */
        _onHeaderDrop: function(evt) {
          if (this._dndMode === "columnReordering") {
            if (this._dndReorderingDragOverWidget === null) { // it means user drop column on the header but after the last column
              var orderedColumns = this.getOrderedColumns();
              this._dndDraggedColumnWidget.getTitleWidget().reorderColumns(this._dndDraggedColumnWidget, orderedColumns[
                orderedColumns.length - 1]);
            }
          }
        },

        /**
         * Helper to call keyboard
         * @param keyboardKeys
         * @param widgetEvent
         * @private
         */
        _keyboardHelper: function(keyboardKeys, widgetEvent) {
          context.keyboard(this._element).bind(keyboardKeys, function(evt) {
            this.emit(widgetEvent, evt);
            return false;
          }.bind(this));
        },

        /**
         * Init Layout
         * @private
         */
        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.TableLayoutEngine(this);

          this._layoutEngine.onLayoutApplied(this.emit.bind(this, context.constants.widgetEvents.layout));
          this._layoutInformation._stretched.setDefaultX(true);
          this._layoutInformation._stretched.setDefaultY(true);
        },

        /**
         * @param {classes.TableColumnWidget} tableColumn the child table column
         */
        addChildWidget: function(tableColumn, options) {
          if (tableColumn.__name === "ScrollWidget") {
            $super.addChildWidget.call(this, tableColumn, options);
            return;
          }

          if (tableColumn.__name !== "TableColumnWidget") {
            throw "Only TableColumnWidgets can be added in TableWidgets";
          }
          $super.addChildWidget.call(this, tableColumn, options);

          // Set Table as parent
          tableColumn.setParentWidget(this);
          this.getColumnsHeaders().append(tableColumn.getTitleWidget().getElement());
          tableColumn.setCurrentRow(this._currentRow);

          this.updateFrozenColumns();
        },

        /**
         * Set sorted column an type
         * @param sortType sort type "asc" or "desc" (empty string for no sort)
         * @param sortColumn column sorted (-1 for no sort)
         */
        setSort: function(sortType, sortColumn) {
          var columns = this.getColumns();

          for (var i = 0; i < columns.length; i++) {
            if (i === sortColumn) {
              columns[i].getTitleWidget().setSortDecorator(sortType);
            } else {
              if (columns[i].getTitleWidget) {
                columns[i].getTitleWidget().setSortDecorator("");
              }
            }
          }
        },

        /**
         * Update frozen columns.
         */
        updateFrozenColumns: function() {

          var showLeftColumns = false;
          var showRightColumns = false;

          if (this._frozenTable) {
            this._renderFrozenColumns();

            showLeftColumns = (this._leftFrozenColumns > 0);
            showRightColumns = (this._rightFrozenColumns > 0);
          }

          this.getLeftContainer()[0].toggleClass("hidden", !showLeftColumns);
          this.getRightContainer()[0].toggleClass("hidden", !showRightColumns);

          if (this._scrollWidget) {
            if (showRightColumns) {
              this.getRightScrollableArea().append(this._scrollWidget.getElement());
            } else {
              this.getScrollableArea().appendChild(this._scrollWidget.getElement());
            }
          }
        },

        /**
         * Render frozen columns.
         */
        _renderFrozenColumns: function() {

          if (this._frozenTable) {
            var columns = this.getColumns();

            for (var i = 0; i < columns.length; i++) {

              if (i < this._leftFrozenColumns) {
                this.getLeftColumnsContainer().append(columns[i].getElement());
                this.getLeftColumnsHeaders().append(columns[i].getTitleWidget().getElement());
              } else if (columns.length - i <= this._rightFrozenColumns) {
                this.getRightColumnsContainer().append(columns[i].getElement());
                this.getRightColumnsHeaders().append(columns[i].getTitleWidget().getElement());
              } else {
                this.getColumnsContainer().append(columns[i].getElement());
                this.getColumnsHeaders().append(columns[i].getTitleWidget().getElement());
              }
            }
          }
        },

        /**
         * Returns true if table is a treeview
         * @returns {boolean} treeview ?
         */
        isTreeView: function() {
          var firstColumn = this.getColumns().first();
          return firstColumn && firstColumn._isTreeView;
        },

        /**
         * Sets if table is in "input" mode.
         * @param {boolean} input mode
         */
        setInputMode: function(b) {
          if (this._inputMode !== b) {
            this._inputMode = b;
            this._element.toggleClass("inputMode", !!b);
          }
        },
        /**
         * Returns true if table can have frozen columns
         * @returns {boolean} frozen table ?
         */
        isFrozenTable: function() {
          return this._frozenTable;
        },

        /**
         * Sets if table can contains frozen table.
         * @param {boolean} frozen
         */
        setFrozenTable: function(frozen) {
          if (this._frozenTable !== frozen) {
            this._frozenTable = frozen;
            this.updateFrozenColumns();
          }
        },

        /**
         * Sets the number of left frozen columns.
         * @param {number} n number of left frozen columns
         */
        setLeftFrozenColumns: function(n) {
          if (this._leftFrozenColumns !== n) {
            this._leftFrozenColumns = n;
            this.updateFrozenColumns();
          }
        },

        /**
         * Sets the number of right frozen columns.
         * @param {number} n number of right frozen columns
         */
        setRightFrozenColumns: function(n) {
          if (this._rightFrozenColumns !== n) {
            this._rightFrozenColumns = n;
            this.updateFrozenColumns();
          }
        },

        /**
         * Returns number of left frozen columns
         * @returns {number} number of left frozen columns
         */
        getLeftFrozenColumns: function() {
          return this._leftFrozenColumns;
        },

        /**
         * Returns number of right frozen columns
         * @returns {number} number of right frozen columns
         */
        getRightFrozenColumns: function() {
          return this._rightFrozenColumns;
        },

        /**
         * Returns columnsContainer element
         * @returns {object} columnsContainer jquery element
         */
        getColumnsContainer: function() {
          return this.$(".gbc_TableColumnsContainer");
        },

        /**
         * Returns table left container element
         * @returns {object} table left container jquery element
         */
        getLeftContainer: function() {
          return this.$(".gbc_TableLeftContainer");
        },

        /**
         * Returns table right container element
         * @returns {object} table right container jquery element
         */
        getRightContainer: function() {
          return this.$(".gbc_TableRightContainer");
        },

        /**
         * Returns leftFrozenColumns container element
         * @returns {object} leftFrozenColumns container jquery element
         */
        getLeftColumnsContainer: function() {
          return this.$(".gbc_TableLeftColumnsContainer");
        },

        /**
         * Returns rightFrozenColumns container element
         * @returns {object} rightFrozenColumns container jquery element
         */
        getRightColumnsContainer: function() {
          return this.$(".gbc_TableRightColumnsContainer");
        },

        /**
         * Returns columnsHeaders element
         * @returns {object} columnsHeaders jquery element
         */
        getColumnsHeaders: function() {
          return this.$(".gbc_TableColumnsHeaders");
        },

        /**
         * Returns columnsFooter element
         * @returns {object} columnsFooter jquery element
         */
        getColumnsFooter: function() {
          return this.$(".gbc_TableColumnsFooter");
        },

        /**
         * Returns columns widgets
         * @returns {object} columns widget
         */
        getColumns: function() {
          var columns = this.getChildren().clone();
          if (this._scrollWidget && columns.length > 0 && columns[0].__name === "ScrollWidget") {
            columns.shift();
          }
          return columns;
        },

        /**
         * Returns columns widgets (ordered)
         * @returns {object} columns widget
         */
        getOrderedColumns: function() {

          var children = this.getColumns();
          children.sort(function(a, b) {
            return a.getOrder() > b.getOrder();
          });

          return children;
        },

        /**
         * Returns leftFrozenColumns headers element
         * @returns {object} leftFrozenColumns headers jquery element
         */
        getLeftColumnsHeaders: function() {
          return this.$(".gbc_TableLeftColumnsHeaders");
        },

        /**
         * Returns rightFrozenColumns headers element
         * @returns {object} rightFrozenColumns headers jquery element
         */
        getRightColumnsHeaders: function() {
          return this.$(".gbc_TableRightColumnsHeaders");
        },

        /**
         * @param {number} height row height (pixels)
         */
        setRowHeight: function(height) {
          this._rowHeight = height;
          this.setStyle(" .gbc_TableColumnItemWidget", {
            "height": height + "px"
          });
          if (this._scrollWidget) {
            this._scrollWidget.setLineHeight(height);
          }
        },

        /**
         * @returns {string} row height (ex:"42px")
         */
        getRowHeightString: function() {
          return this.getStyle(" .gbc_TableColumnItemWidget", "height");
        },

        /**
         * @returns {number} row height
         */
        getRowHeight: function() {
          return this._rowHeight;
        },

        /**
         * @returns {number} table date area height
         */
        getDataAreaHeight: function() {
          return parseInt(this.getLayoutInformation().getAllocated().getHeight() - this._decorateHeight - window.scrollBarSize, 10);
        },

        /**
         * @param {number} row current row
         */
        setCurrentRow: function(row) {
          this._currentRow = row;
          var columns = this.getColumns();
          for (var i = 0; i < columns.length; i++) {
            if (columns[i].setCurrentRow) {
              columns[i].setCurrentRow(row);
            }
          }
        },

        /**
         * @param {number} col current column
         */
        setCurrentColumn: function(col) {
          this._currentColumn = col;
          var columns = this.getColumns();
          for (var i = 0; i < columns.length; i++) {
            if (columns[i].setCurrent) {
              columns[i].setCurrent(i === col);
            }
          }
        },

        /**
         * @returns {object} current item widget
         */
        getCurrentItemWidget: function() {
          return this.getItemWidget(this._currentColumn, this._currentRow);
        },

        /**
         * @param {number} column
         * @param {number} row
         * @returns {object} item widget
         */
        getItemWidget: function(column, row) {
          return this.getColumns()[column].getItemWidget(row);
        },

        /**
         * Sets the number of visible rows
         * @param {number} visibleRows
         */
        setVisibleRows: function(visibleRows) {
          this._visibleRows = visibleRows;
          var columns = this.getColumns();
          for (var i = 0; i < columns.length; i++) {
            var tableColumn = columns[i];
            if (tableColumn.updateRowsVisibility) {
              tableColumn.updateRowsVisibility();
            }
          }
        },

        /**
         * @returns {number} the size of the columns row buffers
         */
        getVisibleRows: function() {
          return this._visibleRows;
        },

        /**
         * @param {boolean} enable true if the table should allow multi-row selection, false otherwise
         */
        setMultiRowSelectionEnabled: function(enable) {
          this._element.toggleClass("multiRowSelection", !!enable);
        },

        /**
         * @returns {boolean} true if the table should allow multi-row selection, false otherwise
         */
        isMultiRowSelectionEnabled: function() {
          return this._element.hasClass("multiRowSelection");
        },

        /**
         *
         * @param {number} row index of the row
         * @param {boolean} selected true if the row should be selected, false otherwise
         */
        setRowSelected: function(row, selected) {
          var columns = this.getColumns();
          for (var i = 0; i < columns.length; i++) {
            var tableColumn = columns[i];
            tableColumn.setRowSelected(row, selected);
          }
        },

        /**
         * @param {number} row index of the row
         * @returns {boolean} true if the row is selected, false otherwise
         */
        isRowSelected: function(row) {
          var columns = this.getColumns();
          if (!!columns.length) {
            return columns[row].isRowSelected(row);
          }
          return false;
        },

        /**
         * scroll functions
         * */
        /**
         * Defines if table is scrollable or not
         * @param state true if scrollable, false otherwise
         */
        setScrollWidget: function(state) {
          if ((typeof(state) === "undefined") || state) {
            this._scrollWidget = cls.WidgetFactory.create("Scroll");
            this.addChildWidget(this._scrollWidget, {
              noDOMInsert: true
            });
            this.getScrollableArea().appendChild(this._scrollWidget.getElement());
          } else if (this._scrollWidget) {
            this._scrollWidget.$().remove();
            this._scrollWidget = null;
          }
        },

        /**
         * @returns {object} the scrollWidget
         */
        getScrollWidget: function() {
          return this._scrollWidget;
        },

        /**
         * @returns {*|jQuery} the scrollable Zone
         */
        getScrollableArea: function() {
          return this._scrollAreaElement;
        },

        /**
         * @returns {*|jQuery} the right scrollable Zone
         */
        getRightScrollableArea: function() {
          return this.$(".gbc_TableRightScrollArea");
        },

        /**
         * @returns {[]} the additionalscrollable Zone [array}
         */
        getAdditionalScrollableAreas: function() {
          return [this.getRightScrollableArea(), this.getLeftColumnsContainer()];
        },

        /**
         * Defines the table pageSize
         * @param pageSize
         */
        setPageSize: function(pageSize) {
          this._setFirstPageSize(pageSize);
          this._pageSize = pageSize;
          if (this.getScrollWidget()) {
            this.getScrollWidget().setPageSize(pageSize);
          }
        },
        _setFirstPageSize: function(pageSize) {
          if (this._firstPageSize === null) {
            this._firstPageSize = pageSize;
          }
        },
        /**
         * Define the table size
         * @param size
         */
        setSize: function(size) {
          this._size = size;
          if (this.getScrollWidget()) {
            this.getScrollWidget().setSize(size);
          }
        },

        /**
         * Hide/Show column headers
         * @param {boolean} hidden true if header must be hidden
         */
        setHeaderHidden: function(hidden) {
          if (this._headerHidden !== hidden) {
            this._headerHidden = hidden;
            this.getColumnsHeaders()[0].toggleClass("hidden", !!hidden);
            this.getLeftColumnsHeaders()[0].toggleClass("hidden", !!hidden);
            this.getRightColumnsHeaders()[0].toggleClass("hidden", !!hidden);
          }
        },

        /**
         * Show/hide table grid
         * @param {boolean} showGrid if true always show grid
         */
        setShowGrid: function(showGrid) {
          if (this._showGrid !== showGrid) {
            this._showGrid = showGrid;
            this._element.toggleClass("showGrid", !!showGrid);
          }
        },

        /**
         * Set header columns alignment
         * @param alignment (default, left, center, right, auto)
         */
        setHeaderAlignment: function(alignment) {

          if (this._headerAlignment !== alignment) {
            this._headerAlignment = alignment;
            var columns = this.getColumns();
            for (var i = 0; i < columns.length; i++) {
              var col = columns[i];
              col.getTitleWidget().setTextAlign(alignment);
            }
          }

        },

        /**
         * Defines the highlight color of rows for the table, used for selected rows
         * @param color
         */
        setHighlightColor: function(color) {

          if (this._highlightColor !== color) {
            this._highlightColor = color;

            color = (color === null ? null : color + " !important");

            this.setStyle({
              selector: ":not(.disabled) .highlightRow > .currentRow *",
              appliesOnRoot: true
            }, {
              "background-color": color
            });
          }

        },

        /**
         * Defines the highlighted text color of rows for the table, used for selected rows
         * @param color
         */
        setHighlightTextColor: function(color) {

          if (this._highlightTextColor !== color) {
            this._highlightTextColor = color;

            this.setStyle({
              selector: ":not(.disabled) .highlightRow > .currentRow *",
              appliesOnRoot: true
            }, {
              "color": color === null ? null : color + " !important"
            });
          }
        },

        /**
         * Indicates if the current cell must be highlighted in a table
         * @param {boolean} b
         */
        setHighlightCurrentCell: function(b) {

          if (this._highlightCurrentCell !== b) {
            this._highlightCurrentCell = b;
            var columns = this.getColumns();
            for (var i = 0; i < columns.length; i++) {
              columns[i]._element.toggleClass("highlightCell", !!b);
            }

            var color = b ? this._highlightColor : null;
            this.setStyle({
              selector: ":not(.disabled) .currentColumn.highlightCell > .currentRow *",
              appliesOnRoot: true
            }, {
              "background-color": color === null ? null : color + " !important"
            });

            color = b ? this._highlightTextColor : null;
            this.setStyle({
              selector: ":not(.disabled) .currentColumn.highlightCell > .currentRow *",
              appliesOnRoot: true
            }, {
              "color": color === null ? null : color + " !important"
            });
          }
        },

        /**
         * Indicates if the current row must be highlighted in a table.
         * @param {boolean} b
         */
        setHighlightCurrentRow: function(b) {
          if (this._highlightCurrentRow !== b) {
            this._highlightCurrentRow = b;
            var columns = this.getColumns();
            for (var i = 0; i < columns.length; i++) {
              columns[i]._element.toggleClass("highlightRow", !!b);
            }

            var bg = null;
            if (!b) {
              bg = "inherit !important";
              this.setHighlightColor(null);
              this.setHighlightTextColor(null);
            }
            this.setStyle(
              ".currentRow", {
                "background-color": bg
              });
          }

        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._element.domFocus();
          $super.setFocus.call(this, bufferedText);
        }
      };
    });
    cls.WidgetFactory.register('Table', cls.TableWidget);
  });
