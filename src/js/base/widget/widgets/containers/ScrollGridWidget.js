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

modulum('ScrollGridWidget', ['WidgetGridLayoutBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Grid widget.
     * @class classes.ScrollGridWidget
     * @extends classes.WidgetGridLayoutBase
     */
    cls.ScrollGridWidget = context.oo.Class(cls.GridWidget, function($super) {
      /** @lends classes.ScrollGridWidget.prototype */
      return {
        __name: "ScrollGridWidget",
        __templateName: "GridWidget",
        _scrollWidget: null,
        _pageSize: null,
        _size: null,

        _initLayout: function() {
          $super._initLayout.call(this, true);
          this._layoutEngine = new cls.ScrollGridLayoutEngine(this);
        },

        /**
         * Will add a scrollbar to the grid
         */
        setScrollWidget: function(state) {
          if ((typeof(state) === "undefined") || state) {
            if (!this._scrollWidget) {
              this._scrollWidget = cls.WidgetFactory.create("Scroll");
              this.addChildWidget(this._scrollWidget, {
                noDOMInsert: true
              });
              this._element.appendChild(this._scrollWidget.getElement());
            }
          } else if (this._scrollWidget) {
            this._scrollWidget._element.remove();
            this._scrollWidget = null;
          }
        },

        setFixedPageSize: function(state) {
          if (!state) {
            this.emit(gbc.constants.widgetEvents.pageSize);
          }
        },

        getScrollWidget: function() {
          return this._scrollWidget;
        },
        getScrollableArea: function() {
          return this.getElement();
        },

        setPageSize: function(pageSize) {
          this._pageSize = pageSize;

          if (this.getScrollWidget()) {
            this.getScrollWidget().setPageSize(pageSize);
          }
        },

        setSize: function(size) {
          this._size = size;
          if (this.getScrollWidget()) {
            this.getScrollWidget().setSize(size);
          }
        },

        /**
         * @param {number} row current row
         */
        setCurrentRow: function(row) {
          console.log(row);

        },

        /**
         * redifined destroy to remove the scrollWidgetBefore
         */
        destroy: function() {
          this.setScrollWidget(false);
          $super.destroy.call(this);
        }

      };
    });
    cls.WidgetFactory.register('ScrollGrid', cls.ScrollGridWidget);
  });
