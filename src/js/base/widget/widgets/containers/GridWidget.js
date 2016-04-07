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

modulum('GridWidget', ['WidgetGridLayoutBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Grid widget.
     * @class classes.GridWidget
     * @extends classes.WidgetGridLayoutBase
     */
    cls.GridWidget = context.oo.Class(cls.WidgetGridLayoutBase, function($super) {
      /** @lends classes.GridWidget.prototype */
      return {
        __name: "GridWidget",
        _scrollWidget: null,
        _pageSize: null,
        _size: null,

        setEnabled: function(state) {
          $super.setEnabled.call(this, state);
          this.getScrollWidget().setEnabled(state);
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

        getScrollWidget: function() {
          return this._scrollWidget;
        },
        getScrollableArea: function() {
          return this.getElement();
        }

      };
    });
    cls.WidgetFactory.register('Screen', cls.GridWidget);
    cls.WidgetFactory.register('Grid', cls.GridWidget);
  });
