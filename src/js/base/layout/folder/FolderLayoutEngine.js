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

modulum('FolderLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FolderLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.FolderLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function($super) {
      /** @lends classes.FolderLayoutEngine.prototype */
      return {
        __name: "FolderLayoutEngine",
        measure: function() {
          this._getLayoutInfo().setMeasured(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setPreferred(0, 0);
          this._getLayoutInfo().setAllocated(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setAvailable(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setMinimal(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setMaximal(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setDecorating(
            this._widget.getElement().clientWidth - this._widget.getContainerElement().clientWidth,
            this._widget.getElement().clientHeight - this._widget.getContainerElement().clientHeight
          );
          this._getLayoutInfo().setDecoratingOffset(
            this._widget.getContainerElement().offsetLeft - this._widget.getElement().offsetLeft,
            this._widget.getContainerElement().offsetTop - this._widget.getElement().offsetTop
          );
        },
        ajust: function() {
          var layoutInfo = this._getLayoutInfo(),
            measureX = 0,
            measureY = 0,
            minX = 0,
            minY = 0,
            maxX = 0,
            maxY = 0,
            decorateX = layoutInfo.getDecorating().getWidth(),
            decorateY = layoutInfo.getDecorating().getHeight(),
            preferredX = 0,
            preferredY = 0;

          var children = this._widget.getChildren();
          for (var i = 0; i < children.length; i++) {
            if (!children[i].isHidden()) {
              var widgetInfo = this._getLayoutInfo(children[i]);
              measureX = Math.max(measureX, widgetInfo.getMeasured().getWidth());
              measureY = Math.max(measureY, widgetInfo.getMeasured().getHeight());
              minX = Math.max(minX, widgetInfo.getMinimal().getWidth());
              minY = Math.max(minY, widgetInfo.getMinimal().getHeight());
              maxX = (maxX === cls.Size.undef || widgetInfo.getMaximal().getWidth() === cls.Size.undef) ? cls.Size.undef : Math.max(
                maxX, widgetInfo.getMaximal().getWidth());
              maxY = (maxY === cls.Size.undef || widgetInfo.getMaximal().getHeight() === cls.Size.undef) ? cls.Size.undef : Math.max(
                maxY, widgetInfo.getMaximal().getHeight());
              preferredX = Math.max(preferredX, widgetInfo.getPreferred().getWidth());
              preferredY = Math.max(preferredY, widgetInfo.getPreferred().getHeight());
            }
          }
          layoutInfo.setMeasured(measureX + decorateX, measureY + decorateY);
          layoutInfo.setMinimal(minX + decorateX, minY + decorateY);
          layoutInfo.setMaximal(
            maxX === cls.Size.undef ? cls.Size.undef : (maxX + decorateX),
            maxY === cls.Size.undef ? cls.Size.undef : (maxY + decorateY)
          );
          layoutInfo.setPreferred(preferredX, preferredY);
        },
        prepare: function() {
          var layoutInfo = this._getLayoutInfo(),
            decorateX = layoutInfo.getDecorating().getWidth(),
            decorateY = layoutInfo.getDecorating().getHeight(),
            children = this._widget.getChildren(),
            minx = Math.max(layoutInfo.getAvailable().getWidth(), layoutInfo.getMinimal().getWidth()),
            miny = Math.max(layoutInfo.getAvailable().getHeight(), layoutInfo.getMinimal().getHeight());
          for (var i = 0; i < children.length; i++) {
            if (!children[i].isHidden()) {
              var widgetInfo = this._getLayoutInfo(children[i]);
              widgetInfo.setAvailable(
                minx - decorateX,
                miny - decorateY
              );
            }
          }
          layoutInfo.setAllocated(minx, miny);
          this._styleRules["#w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
            height: Number.discrete(layoutInfo.getAllocated().getHeight()) + "px",
            width: Number.discrete(layoutInfo.getAllocated().getWidth()) + "px"
          };
          this._styleRules["#w_" + this._widget.getUniqueIdentifier() + ".g_measured>.containerElement"] = {
            height: Number.discrete(layoutInfo.getAllocated().getHeight() - decorateY) + "px",
            width: Number.discrete(layoutInfo.getAllocated().getWidth() - decorateX) + "px"
          };
        },
        apply: function() {
          styler.appendStyleSheet(this._styleRules, "folderLayout_" + this._widget.getUniqueIdentifier());
        }
      };
    });
  });
