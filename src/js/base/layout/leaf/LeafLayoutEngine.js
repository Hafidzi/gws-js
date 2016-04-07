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

modulum('LeafLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.LeafLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.LeafLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function($super) {
      /** @lends classes.LeafLayoutEngine.prototype */
      return {
        __name: "LeafLayoutEngine",
        /**
         * @type Element
         */
        _dataContentPlaceholder: null,
        /**
         * @type Element
         */
        _dataContentMeasure: null,
        _textSample: null,
        _reservedDecorationSpace: 0,
        setHint: function(widthHint, heightHint) {
          this._widget.getLayoutInformation().setSizeHint(
            ((typeof(widthHint) === "undefined") || widthHint === null || widthHint === "") ? 1 : widthHint, ((typeof(heightHint) ===
              "undefined") || heightHint === null || heightHint === "") ? 1 : heightHint
          );
        },
        constructor: function(widget) {
          $super.constructor.call(this, widget);
          if (widget.__dataContentPlaceholderSelector) {
            var element = this._widget.getElement();
            this._dataContentPlaceholder = widget.__dataContentPlaceholderSelector === cls.WidgetBase.selfDataContent ? element :
              element.querySelector(widget.__dataContentPlaceholderSelector);
            if (this._dataContentPlaceholder) {
              this._dataContentMeasure = this._dataContentPlaceholder.querySelector(".gbc_dataContentMeasure");
              if (!this._dataContentMeasure) {
                this._dataContentMeasure = context.TemplateService.renderDOM("LeafLayoutMeasureElement");
                this._dataContentPlaceholder.appendChild(this._dataContentMeasure);
              }
            }
          }
        },
        setReservedDecorationSpace: function(space) {
          this._reservedDecorationSpace = space || 0;
        },
        _minSize: function(preferred, measured) {
          if (Object.isNumber(preferred)) {
            return Math.max(preferred, measured);
          }
          return measured;
        },
        _setFixedMeasure: function() {
          var layoutInfo = this._widget.getLayoutInformation();
          layoutInfo.setMeasured(layoutInfo.getPreferred().getWidth(), layoutInfo.getPreferred().getHeight());
        },
        measure: function() {
          this._getLayoutInfo().setAllocated(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setAvailable(cls.Size.undef, cls.Size.undef);
          var layoutInfo = this._widget.getLayoutInformation();
          if (this._dataContentMeasure) {
            var width = (!layoutInfo._rawGridWidth && cls.Size.isCols(layoutInfo._hintWidth)) ? parseInt(layoutInfo._hintWidth, 10) :
              layoutInfo.getGridWidth();
            if (width > this._reservedDecorationSpace) {
              width -= this._reservedDecorationSpace;
            }
            var sample = cls.Measurement.getTextSample(width, layoutInfo.getGridHeight());
            if (sample !== this._textSample) {
              this._textSample = sample;
              this._dataContentMeasure.innerHTML = sample;
            }
          }
          if (this._dataContentPlaceholder) {
            this._dataContentPlaceholder.toggleClass("gbc_dynamicMeasure", layoutInfo._needValuedMeasure || !!layoutInfo.getCurrentSizePolicy()
              .isDynamic());
          }
          if (layoutInfo.getCurrentSizePolicy().isFixed()) {
            this._setFixedMeasure();
          } else {
            if (layoutInfo.needMeasure()) {
              layoutInfo.setMeasured(
                this._widget.getElement().clientWidth,
                this._widget.getElement().clientHeight
              );
            }
          }
          if (layoutInfo.isXStretched() || layoutInfo.getCurrentSizePolicy().canShrink()) {
            layoutInfo.getMinimal().setWidth(layoutInfo.forcedMinimalWidth);
          } else {
            layoutInfo.getMinimal().setWidth(layoutInfo.getMeasured().getWidth());
          }
          if (layoutInfo.isYStretched() || layoutInfo.getCurrentSizePolicy().canShrink()) {
            layoutInfo.getMinimal().setHeight(layoutInfo.forcedMinimalHeight);
          } else {
            layoutInfo.getMinimal().setHeight(layoutInfo.getMeasured().getHeight());
          }
          if (layoutInfo.isXStretched() /* || layoutInfo.getCurrentSizePolicy().canGrow()*/ ) {
            layoutInfo.getMaximal().setWidth(cls.Size.undef);
          } else {
            layoutInfo.getMaximal().setWidth(layoutInfo.getMeasured().getWidth());
          }
          if (layoutInfo.isYStretched() /* || layoutInfo.getCurrentSizePolicy().canGrow()*/ ) {
            layoutInfo.getMaximal().setHeight(cls.Size.undef);
          } else {
            layoutInfo.getMaximal().setHeight(layoutInfo.getMeasured().getHeight());
          }
          layoutInfo.getCurrentSizePolicy().setInitialized();
        },
        prepare: function() {
          if (this._getLayoutInfo().isXStretched()) {
            this._widget.setStyle({
              selector: ".g_measured",
              appliesOnRoot: true
            }, {
              width: Number.discrete(this._getLayoutInfo().getAvailable().getWidth()) + "px"
            });
          }
          if (this._getLayoutInfo().isYStretched()) {
            this._widget.setStyle({
              selector: ".g_measured",
              appliesOnRoot: true
            }, {
              height: Number.discrete(this._getLayoutInfo().getAvailable().getHeight()) + "px"
            });
          }
        },
        canFollowChildren: function() {
          return false;
        }
      };
    });
  });
