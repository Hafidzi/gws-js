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

modulum('SplitterWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Splitter widget.
     * @class classes.SplitterWidget
     * @extends classes.WidgetBase
     */
    cls.SplitterWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.SplitterWidget.prototype */
      return {
        __name: "SplitterWidget",

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutInformation.setMaximal(8, 8);
          this._layoutInformation.setMinimal(8, 8);
          this._layoutInformation.setMeasured(8, 8);
        },

        _initElement: function() {
          $super._initElement.call(this);
          // This is a really ugly hack to avoid firefox to display unwanted shitty icon
          this._dragHandle = this._element.querySelector("div.firefox_placekeeper");
          this._element.setAttribute("draggable", "true");
          this._element.on("dragstart.SplitterWidget", this._onDragStart.bind(this));
          this._element.on("dragend.SplitterWidget", this._onDragEnd.bind(this));
          this._element.on("drag.SplitterWidget", this._onDrag.throttle(5).bind(this));
          if (window.browserInfo.isIE || window.browserInfo.isEdge) {
            this._element.on("mousedown.SplitterWidget", function() {
              this._element.style.opacity = 0;
            }.bind(this));
            this._element.on("mouseup.SplitterWidget", function() {
              this._element.style.opacity = "";
            }.bind(this));
          }
        },
        _onDragOver: function(evt) {
          this._pageX = evt.pageX;
          this._pageY = evt.pageY;
          evt.preventDefault();
        },
        _onDragStart: function(evt) {
          if (this._canSplit) {
            this.getParentWidget().getElement().on("dragover.SplitterWidget", this._onDragOver.bind(this));
            this._isDragging = true;
            if (window.browserInfo.isFirefox) {
              evt.dataTransfer.setData('text', ''); // for Firefox compatibility
            }
            if (evt.dataTransfer.setDragImage) {
              evt.dataTransfer.setDragImage(this._dragHandle, 0, 0);
            }
            evt.dataTransfer.effectAllowed = "move";
            this.prepareSplits();
            this._resizerDragX = evt.pageX;
            this._resizerDragY = evt.pageY;
          } else {
            evt.preventDefault();
          }
          return false;
        },
        _onDragEnd: function(evt) {
          this.getParentWidget().getElement().off("dragover.SplitterWidget");
          this._isDragging = false;
          if (window.browserInfo.isIE || window.browserInfo.isEdge) {
            this._element.style.opacity = "";
          }
        },
        _onDrag: function(evt) {
          if (this._isDragging) {
            var deltaX = this._pageX - this._resizerDragX;
            var deltaY = this._pageY - this._resizerDragY;
            this.updateSplits(deltaX, deltaY);
          }
          //evt.preventDefault();
        },
        setSplitter: function(hasSplitters) {
          this._canSplit = !!hasSplitters;
          this._element.toggleClass("canSplit", !!hasSplitters);
        },
        prepareSplits: function() {
          this._splitInfo = this.getParentWidget().getSplitInfo(this);
        },
        updateSplits: function(deltaX, deltaY) {
          if (!Number.isNaN(deltaX) && !Number.isNaN(deltaY)) {
            var s = this._splitInfo.splitIndex;
            this._splitInfo[s].deltaX = deltaX;
            this._splitInfo[s].deltaY = deltaY;
            this._splitInfo[s + 1].deltaX = deltaX;
            this._splitInfo[s + 1].deltaY = deltaY;
            this.getParentWidget().updateSplitInfo(this._splitInfo);
          }
        }
      };
    });
    cls.WidgetFactory.register('Splitter', cls.SplitterWidget);
  });
