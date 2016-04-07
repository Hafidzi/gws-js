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

modulum('PageLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.PageLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.PageLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function($super) {
      /** @lends classes.PageLayoutEngine.prototype */
      return {
        __name: "PageLayoutEngine",
        measure: function() {
          this._getLayoutInfo().setMeasured(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setPreferred(0, 0);
          this._getLayoutInfo().setAllocated(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setAvailable(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setMinimal(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setMaximal(cls.Size.undef, cls.Size.undef);
        },
        ajust: function() {
          var layoutInfo = this._getLayoutInfo(),
            child = this._widget.getChildren()[0];
          if (child) {
            var widgetInfo = this._getLayoutInfo(child);
            layoutInfo.setMeasured(widgetInfo.getMeasured().getWidth(), widgetInfo.getMeasured().getHeight());
            layoutInfo.setMinimal(widgetInfo.getMinimal().getWidth(), widgetInfo.getMinimal().getHeight());
            layoutInfo.setMaximal(widgetInfo.getMaximal().getWidth(), widgetInfo.getMaximal().getHeight());
            layoutInfo.setPreferred(widgetInfo.getPreferred().getWidth(), widgetInfo.getPreferred().getHeight());
          }
        },
        prepare: function() {
          var layoutInfo = this._getLayoutInfo(),
            child = this._widget.getChildren()[0];
          if (child) {
            var widgetInfo = this._getLayoutInfo(child);
            widgetInfo.setAvailable(
              layoutInfo.getAvailable().getWidth(),
              layoutInfo.getAvailable().getHeight()
            );
            widgetInfo.setAllocated(
              layoutInfo.getAvailable().getWidth(),
              layoutInfo.getAvailable().getHeight()
            );
          }
        }
      };
    });
  });
