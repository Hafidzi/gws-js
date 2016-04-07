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

modulum('ScrollLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ScrollLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.ScrollLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function() {
      /** @lends classes.ScrollLayoutEngine.prototype */
      return {
        __name: "ScrollLayoutEngine",

        prepare: function() {
          var parentWidget = this._widget.getParentWidget();
          var parentLayoutInfo = this._getLayoutInfo(parentWidget);
          // widget => scroll Widget

          // Calculate needed values
          var widgetHeight = parentWidget.getDataAreaHeight ? parentWidget.getDataAreaHeight() : parentLayoutInfo.getAllocated()._height;
          var lineHeight = parentWidget.getRowHeight ? parentWidget.getRowHeight() : (parseFloat(widgetHeight, 10) / this._widget._pageSize) ||
            0;

          this._widget.setLineHeight(lineHeight);
          this._widget.setTotalHeight(lineHeight * this._widget._size);

          this._widget.setVisibleHeight(widgetHeight);
          this._widget.refresh();
        }
      };
    });
  });
