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

modulum('ScrollAreaWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * ScrollArea Widget.
     * Use to catch scrolling event and forward them to a Matrix
     * @class classes.ScrollAreaWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ScrollAreaWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.BoxWidget.prototype */
      return {
        __name: "ScrollAreaWidget",

        _size: 0,
        _pageSize: 0,
        _lineHeight: 15,
        _scrollWidget: null,

        _initElement: function() {
          $super._initElement.call(this);

          this._scrollWidget = this;

          this._element.on("wheel.ScrollAreaWidget", function(event) {
            this.emit(context.constants.widgetEvents.mousewheel, event);
            event.preventDefault();
            //this.refresh();
          }.bind(this));

          this._element.on("scroll.ScrollAreaWidget", function(event) {
            this.emit(context.constants.widgetEvents.scroll, event, this._lineHeight);
          }.bind(this));

          this._element.on("click.ScrollAreaWidget", function(e) {
            e.preventDefault();
            var gridElement = this.$().parents(".g_GridElement");
            // Hide the scrollArea layer
            gridElement.addClass("hidden");
            // Create a click event that will be triggered to the div beyond
            var target = document.elementFromPoint(e.clientX, e.clientY);
            // Focus event is needed to trigger a VM focus request (InputArray)
            var event = document.createEvent('HTMLEvents');
            event.initEvent('focus', true, false);
            target.dispatchEvent(event);
            // Click event is needed to trigger a VM row selection event (DisplayArray)
            event = document.createEvent('HTMLEvents');
            event.initEvent('click', true, false);
            target.dispatchEvent(event);
            // Show back the scrollArea layer
            gridElement.removeClass("hidden");
          }.bind(this));

        },

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this.getLayoutInformation()._extraGap = {
            afterX: window.scrollBarSize
          };
        },

        getScrollWidget: function() {
          return this;
        },

        setSize: function(size) {
          if (size !== this._size) {
            this._size = size;
            this.setTotalHeight(this._lineHeight * this._size);
          }
        },

        setPageSize: function(pageSize) {
          if (this._pageSize !== pageSize) {
            this._pageSize = pageSize;
            var lineHeight = this._element.clientHeight / pageSize;
            this.setLineHeight(lineHeight);
          }
        },

        setOffset: function(offset) {
          this._offset = offset;
        },

        setLineHeight: function(lineHeight) {
          this._lineHeight = lineHeight;
        },

        /**
         * Will set the total height of the scrollArea
         * @param {Number} height total
         */
        setTotalHeight: function(height) {
          if (!this.isEnabled()) {
            height = 0;
          }
          this.setStyle(".spacer", {
            "height": Math.max(0, Number.discrete(height)) + "px"
          });
          this.refresh();
        },

        // Refresh the scrollBar
        refresh: function() {
          var pixelOffset = this._lineHeight * this._offset;
          this._lastPosition = pixelOffset;
          if (this._element) {
            this._element.scrollTop = pixelOffset;
          }
        },

        destroy: function() {
          $super.destroy.call(this);
        }

      };
    });
    cls.WidgetFactory.register('ScrollArea', cls.ScrollAreaWidget);
  });
