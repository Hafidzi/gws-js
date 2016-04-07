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

modulum('TableColumnTitleWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Table column title widget.
     * @class classes.TableColumnTitleWidget
     * @extends classes.WidgetBase
     */
    cls.TableColumnTitleWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.TableColumnTitleWidget.prototype */
      return {
        __name: "TableColumnTitleWidget",

        _resizerDragX: null,
        _contextMenu: null,
        _autoAlignment: false,

        _sortIcon: null,
        _sortGlyph: null,
        _initElement: function() {
          $super._initElement.call(this);

          this._sortIcon = this._element.querySelector(".sortIcon");
          this.getHeaderText().on('click', function(evt) {
            this.getParentWidget().emit(context.constants.widgetEvents.tableHeaderClick);
          }.bind(this));
          this.getSortIcon().on('click', function(evt) {
            this.getParentWidget().emit(context.constants.widgetEvents.tableHeaderClick);
          }.bind(this));

          // Context menu
          var onContextMenu = function(e) {
            e.preventDefault();
            this._buildContextMenu();
          };
          this._element.on('contextmenu.TableColumnTitleWidget', onContextMenu.bind(this));

          // Handle column resizing
          var resizer = this.getResizer()[0];

          resizer.setAttribute("draggable", "true");
          resizer.on("dblclick.TableColumnTitleWidget", this._onResizerDoubleClick.bind(this));
          resizer.on("dragstart.TableColumnTitleWidget", this._onResizerDragStart.bind(this));
          resizer.on("dragend.TableColumnTitleWidget", this._onResizerDragEnd.bind(this));
          resizer.on("drag.TableColumnTitleWidget", this._onResizerDrag.throttle(5).bind(this));
          var preventDefault = function(event) {
            if (!!this._dndMode) {
              event.preventDefault();
            }
          }.bind(this);
          resizer.on("dragover.TableColumnTitleWidget", preventDefault);
          this.getHeaderText().on("dragover", preventDefault);
          this.getSortIcon().on("dragover", preventDefault);
          this._element.on("dragover.TableColumnTitleWidget", preventDefault);

          // Handle column reordering
          this.getHeaderText()[0].setAttribute("draggable", "true");
          this.getHeaderText().on("dragstart", this._onReorderingDragStart.bind(this));
          this.getHeaderText().on("dragend", this._onReorderingDragEnd.bind(this));
          this._element.on("dragover.TableColumnTitleWidget", this._onReorderingDragOver.bind(this));
          this._element.on("drop.TableColumnTitleWidget", this._onReorderingDrop.bind(this));
          this._element.on("dragleave.TableColumnTitleWidget", this._onReorderingDragLeave.bind(this));
        },

        /**
         * Add a context menu to the table
         * @private
         */
        _buildContextMenu: function() {
          if (this._contextMenu && this._contextMenu.isVisible()) {
            this._contextMenu.show(false);
          }
          var table = this.getTableWidget();
          if (table) {
            this._contextMenu = cls.WidgetFactory.create("ChoiceDropDown");
            this._contextMenu.autoSize = false;
            this._contextMenu.alignToLeft = false;
            this._contextMenu.setParentWidget(this);
            this._contextMenu.getElement().addClass("menu");

            var columns = table.getColumns();
            var tableColumn = this.getParentWidget();

            // Hide/show columns
            var hideShowFunc = function(columnTitle) {
              columnTitle._contextMenu.destroy();
              this.emit(gbc.constants.widgetEvents.tableShowHideCol);
            };

            for (var i = 0; i < columns.length; i++) {
              var tc = columns[i];
              if (!tc.isUnhidable()) {
                var check = cls.WidgetFactory.create("CheckBox");
                check.setText(tc.getTitleWidget().getText());
                check.setValue(!tc.isHidden());
                this._contextMenu.addChildWidget(check, hideShowFunc.bind(tc, this));
              }
            }

            this._contextMenu.addChildWidget(cls.WidgetFactory.create("HLine"));

            // Show all columns action
            var showAllColumnsLabel = cls.WidgetFactory.create("Label");
            showAllColumnsLabel.setValue(i18n.t("contextMenu.showAllColumns"));
            this._contextMenu.addChildWidget(showAllColumnsLabel, function() {
              this._contextMenu.destroy();
              var columns = this.getTableWidget().getColumns();
              for (var i = 0; i < columns.length; i++) {
                var tc = columns[i];
                if (!tc.isUnhidable()) {
                  tc.emit(gbc.constants.widgetEvents.tableShowHideCol, true);
                }
              }
            }.bind(this));

            // hide other columns action
            var hideOtherColumnsLabel = cls.WidgetFactory.create("Label");
            hideOtherColumnsLabel.setValue(i18n.t("contextMenu.hideAllButSelected"));
            this._contextMenu.addChildWidget(hideOtherColumnsLabel, function() {
              this._contextMenu.destroy();
              var columns = this.getTableWidget().getColumns();
              for (var i = 0; i < columns.length; i++) {
                var tc = columns[i];
                if (!tc.isUnhidable() && tc !== this.getParentWidget()) {
                  tc.emit(gbc.constants.widgetEvents.tableShowHideCol, false);
                }
              }
            }.bind(this));

            // Reset sort order action
            var resetLabel = cls.WidgetFactory.create("Label");
            resetLabel.setValue(i18n.t("contextMenu.restoreColumnSort"));
            this._contextMenu.addChildWidget(resetLabel, function() {
              this._contextMenu.destroy();
              tableColumn.emit(context.constants.widgetEvents.tableHeaderClick, "reset");
            }.bind(this));

            //Frozen columns
            if (table.isFrozenTable()) {
              this._contextMenu.addChildWidget(cls.WidgetFactory.create("HLine"));

              var leftFrozenLabel = cls.WidgetFactory.create("Label");
              var rightFrozenLabel = cls.WidgetFactory.create("Label");
              var unfreezeLabel = cls.WidgetFactory.create("Label");
              var freezeIndex = 0;
              var columnCount = 0;

              leftFrozenLabel.setValue(i18n.t("contextMenu.freezeLeft"));
              rightFrozenLabel.setValue(i18n.t("contextMenu.freezeRight"));
              unfreezeLabel.setValue(i18n.t("contextMenu.unfreezeAll"));

              this._contextMenu.addChildWidget(leftFrozenLabel, function() {
                this._contextMenu.destroy();
                freezeIndex = tableColumn.getColumnIndex() + 1;
                table.setLeftFrozenColumns(freezeIndex);
              }.bind(this));
              this._contextMenu.addChildWidget(rightFrozenLabel, function() {
                this._contextMenu.destroy();
                columnCount = columns.length;
                freezeIndex = tableColumn.getColumnIndex();
                table.setRightFrozenColumns(columnCount - freezeIndex);
              }.bind(this));
              this._contextMenu.addChildWidget(unfreezeLabel, function() {
                this._contextMenu.destroy();
                table.setLeftFrozenColumns(0);
                table.setRightFrozenColumns(0);
              }.bind(this));
            }

            this._element.focus();
            cls.KeyboardHelper.bindKeyboardNavigation(this._element, this._contextMenu);
            context.keyboard(this._element).bind(['esc'], function(evt) {
              this._contextMenu.emit(context.constants.widgetEvents.esc, evt);
            }.bind(this));
            this._contextMenu.show(true, true);
          }
        },

        /**
         * @returns {*|jQuery} the resizer element
         */
        getResizer: function() {
          return this.$(".resizer");
        },

        /**
         * @returns {*|jQuery} the headerText element
         */
        getHeaderText: function() {
          return this.$(".headerText");
        },

        /**
         * @returns {*|jQuery} the sortIcon element
         */
        getSortIcon: function() {
          return this.$(".sortIcon");
        },

        /**
         * @returns {classes.WidgetBase} the resizer element
         */
        getTableWidget: function() {
          return this.getParentWidget().getParentWidget();
        },

        /**
         * Handle resizer double click event
         * @param evt
         * @private
         */
        _onResizerDoubleClick: function() {
          this.getParentWidget().autoSetWidth();
        },

        /**
         * Handle resizer dragStart event
         * @param evt
         * @private
         */
        _onResizerDragStart: function(evt) {
          if (window.browserInfo.isFirefox) { // Firefox 1.0+
            try {
              evt.dataTransfer.setData('text/plain', ''); // for Firefox compatibility
            } catch (ex) {
              console.error("evt.dataTransfer.setData('text/plain', ''); not supported");
            }
          }
          this.getTableWidget()._dndMode = "columnResizing";
          this.getParentWidget().getElement().addClass("resizing");
          this._resizerDragX = evt.screenX;
        },

        /**
         * Handle resizer drag event
         * @param evt
         * @private
         */
        _onResizerDrag: function(evt) {

          if (this.getTableWidget()._dndMode === "columnResizing") {
            if (!this._resizerDragX) {
              return;
            }

            var size = this.getTableWidget()._dndMouseDragX - this._resizerDragX;
            var initialWidth = this.getParentWidget().getWidthNumber();

            if (initialWidth + size > 30) {
              this._resizerDragX = this.getTableWidget()._dndMouseDragX;
              this.getParentWidget().setWidth(initialWidth + size);
            }
          }
        },

        /**
         * Handle resizer dragEnd event
         * @param evt
         * @private
         */
        _onResizerDragEnd: function(evt) {
          this.getParentWidget()._element.removeClass("resizing");

          this._resizerDragX = null;
          evt.preventDefault();

          this.getTableWidget()._dndMode = null;
        },

        /**
         * Handle reordering dragStart event
         * @param evt
         * @private
         */
        _onReorderingDragStart: function(evt) {
          if (window.browserInfo.isFirefox) { // Firefox 1.0+
            try {
              evt.originalEvent.dataTransfer.setData('text/plain', ''); // for Firefox compatibility
            } catch (ex) {
              console.error("evt.originalEvent.dataTransfer.setData('text/plain', ''); not supported");
            }
          }
          this.getTableWidget()._dndMode = "columnReordering";
          this.getTableWidget()._dndDraggedColumnWidget = this.getParentWidget();
        },

        /**
         * Handle reordering dragEnd event
         * @param evt
         * @private
         */
        _onReorderingDragEnd: function(evt) {
          if (this.getTableWidget()._dndReorderingDragOverWidget !== null) {
            this.getTableWidget()._dndReorderingDragOverWidget.getElement()
              .removeClass("reordering_left").removeClass("reordering_right");
            this.getTableWidget()._dndReorderingDragOverWidget = null;
          }
          this.getTableWidget()._dndMode = null;
          this.getTableWidget()._dndDraggedColumnWidget = null;
        },

        /**
         * Handle reordering drop event
         * @param evt
         * @private
         */
        _onReorderingDrop: function(evt) {
          if (this.getTableWidget()._dndMode === "columnReordering") {
            if (this.getTableWidget()._dndReorderingDragOverWidget && this.getTableWidget()._dndDraggedColumnWidget !== this.getTableWidget()
              ._dndReorderingDragOverWidget) {

              this.reorderColumns(this.getTableWidget()._dndDraggedColumnWidget, this.getTableWidget()._dndReorderingDragOverWidget);
            }
          }
        },

        /**
         *
         * @param draggedColumn
         * @param dropColumn
         */
        reorderColumns: function(draggedColumn, dropColumn) {

          var orderedColumns = this.getTableWidget().getOrderedColumns();
          var newOrderedColumns = orderedColumns.clone();

          var dragColIndex = newOrderedColumns.indexOf(draggedColumn);
          var dropColIndex = newOrderedColumns.indexOf(dropColumn);

          newOrderedColumns.removeAt(dragColIndex);
          newOrderedColumns.insert(this.getTableWidget()._dndDraggedColumnWidget, dropColIndex);

          for (var i = 0; i < newOrderedColumns.length; i++) {
            var col = newOrderedColumns[i];
            var oldCol = orderedColumns[i];

            if (col.getOrder() !== oldCol.getOrder()) {
              col.emit(context.constants.widgetEvents.tableOrderColumn, oldCol.getOrder());
            }
          }
        },

        /**
         * Handle reordering dragOver event
         * @param evt
         * @private
         */
        _onReorderingDragOver: function(evt) {

          if (this.getTableWidget()._dndMode === "columnReordering") {

            var lastReorderingDragOverColumnWidget = this.getTableWidget()._dndReorderingDragOverWidget;
            if (lastReorderingDragOverColumnWidget !== this.getParentWidget()) {

              if (lastReorderingDragOverColumnWidget !== null) {
                lastReorderingDragOverColumnWidget.getElement()
                  .removeClass("reordering_left").removeClass("reordering_right");
              }
              this.getTableWidget()._dndReorderingDragOverWidget = this.getParentWidget();
            }

            var overIndex = this.getParentWidget().getOrderedColumnIndex();
            var startIndex = this.getTableWidget()._dndDraggedColumnWidget.getOrderedColumnIndex();
            this.getParentWidget().getElement().addClass(overIndex >= startIndex ? "reordering_right" : "reordering_left");
          }
        },

        /**
         * Handle reordering dragLeave event
         * @param evt
         * @private
         */
        _onReorderingDragLeave: function(evt) {

          if (this.getTableWidget()._dndMode === "columnReordering") {
            this.getParentWidget().getElement().removeClass("reordering_left").removeClass("reordering_right");
            this.getTableWidget()._dndReorderingDragOverWidget = null;
          }
        },

        /**
         * @param {string} text the text to display
         */
        setText: function(text) {
          this._element.querySelector(".headerText").textContent = text;
        },

        /**
         * @returns {string} the text to display
         */
        getText: function() {
          return this._element.querySelector(".headerText").textContent;
        },

        /**
         * @param {number} width title width (pixels)
         */
        setWidth: function(width) {
          this.setStyle({
            "width": width + "px"
          });
        },

        /**
         * @returns {string} title width (ex:"42px")
         */
        getWidth: function() {
          return this.getStyle("width");
        },

        /**
         * Sets the sort decorator caret.
         * @param sortType "asc", "desc" or ""
         */
        setSortDecorator: function(sortType) {

          var glyphClass = "hidden";
          if (sortType === "asc") {
            glyphClass = "caret-up";
          }
          if (sortType === "desc") {
            glyphClass = "caret-down";
          }

          this._sortIcon.classList.remove(this._sortGlyph);
          this._sortIcon.classList.add(glyphClass);
          this._sortGlyph = glyphClass;
        },

        /**
         * @param {number} index order index
         */
        setOrder: function(index) {
          this.setStyle({
            "order": index
          });
        },

        hasFocus: function() {
          return true;
        },

        /**
         * Set text alignment
         * @param alignment (left, center, right, auto)
         */
        setTextAlign: function(alignment) {
          if (alignment === "auto") {
            this._autoAlignment = true;
          } else {
            this.setStyle(" .headerText", {
              "text-align": alignment
            });
          }
        }
      };
    });
    cls.WidgetFactory.register('TableColumnTitle', cls.TableColumnTitleWidget);
  });
