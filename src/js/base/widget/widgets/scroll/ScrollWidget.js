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

modulum('ScrollWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * HBox or VBox widget.
     * @class classes.ScrollWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ScrollWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.BoxWidget.prototype */
      return {
        __name: "ScrollWidget",
        _lineHeight: 0,
        _pageSize: 0,
        _size: 0,
        _offset: 0,
        _spacer: null,
        _lastPosition: 0,
        _handlingScrollBar: false,

        //override default
        _initElement: function() {
          $super._initElement.call(this);

          this._element.on('mousedown.ScrollWidget', function(event) {
            this._handlingScrollBar = true;
          }.bind(this));
          this._element.on('mouseup.ScrollWidget', function(event) {
            this._handlingScrollBar = false;
          }.bind(this));
          this._element.on('scroll.ScrollWidget', function(event) {
            if (this.isEnabled() && this._handlingScrollBar) {
              this.emit(context.constants.widgetEvents.scroll, event, this._lineHeight);
            }
          }.bind(this));

          this._spacer = this.getElement().getElementsByTagName("div")[0];
        },

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.ScrollLayoutEngine(this);
        },

        setThinScrollBar: function(displayTime) {
          $(this._element).niceScroll({
            background: "#f4f4f4",
            cursorborder: "none",
            hidecursordelay: displayTime * 1000
          });
        },

        setParentWidget: function(widget) {
          this._detachScrollBar();
          $super.setParentWidget.call(this, widget);
          this._attachScrollBar();
        },

        setEnabled: function(state) {
          $super.setEnabled.call(this, state);
          if (!state) {
            this.setTotalHeight(0);
          }
          //this.setThinScrollBar(1);
        },

        setPageSize: function(pageSize) {
          this._pageSize = pageSize;
        },

        setSize: function(size) {
          this._size = size;
        },

        setLineHeight: function(lineHeight) {
          this._lineHeight = lineHeight;
        },

        setOffset: function(offset) {
          this._offset = offset;
        },

        // Refresh the scrollBar
        refresh: function() {
          if (this._lastPosition !== this._offset && !this._handlingScrollBar) {
            var pixelOffset = this._lineHeight * this._offset;
            this._lastPosition = this._offset;
            this.getElement().scrollTop = pixelOffset;
          }
          /*          window.requestAnimationFrame(function() {
                      //            var top = this.getElement().scrollTop;
                      //            if (top !== pixelOffset){
                      this.getElement().scrollTop = pixelOffset;
                      //            }
                    }.bind(this));*/
        },

        /**
         * Will set the visible height of the scroll Area
         * @param {Number} height visible
         */
        setVisibleHeight: function(height) {
          this.setStyle({
            "height": Number.discrete(height) + "px"
          });
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
        },

        /**
         * Will add a scrollbar to parent container
         * */
        _attachScrollBar: function() {
          var parentElement = this.getParentWidget().getScrollableArea();
          parentElement.appendChild(this.getElement());

          // Add a listener on parent scroll
          window.requestAnimationFrame(function() {

            var mouseWheelFunc = function(event) {
              if (this.isEnabled()) {
                this.emit(context.constants.widgetEvents.mousewheel, event, this._lineHeight);
              }
            }.bind(this);

            parentElement.on('wheel.ScrollWidget', mouseWheelFunc);

            // Add mousewheel also on additional scrollable areas
            if (this.getParentWidget().getAdditionalScrollableAreas) {
              this.getParentWidget().getAdditionalScrollableAreas().forEach(function(area) {
                area.on('wheel.ScrollWidget', mouseWheelFunc);
              }.bind(this));
            }

          }.bind(this));

        },

        /**
         * Will remove scrollbar to parent container
         * */
        _detachScrollBar: function() {
          if (this.getParentWidget()) {
            var parentElement = this.getParentWidget().getScrollableArea();
            parentElement.off('wheel.ScrollWidget');
          }
        }

      };
    });
    cls.WidgetFactory.register('Scroll', cls.ScrollWidget);
  });
