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

modulum('GridLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.GridLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.GridLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function($super) {
      /** @lends classes.GridLayoutEngine.prototype */
      return {
        __name: "GridLayoutEngine",
        /**
         * @type {classes.WidgetBase[]}
         */
        _registeredWidgets: null,
        /**
         * @type {object<Number, {x:classes.GridDimensionSlot,y:classes.GridDimensionSlot}>}
         */
        _registeredSlots: null,
        /**
         * @type {object<Number, HandleRegistration>}
         */
        _registeredWidgetWatchers: null,
        /**
         * @type {classes.GridLayoutEngineX}
         */
        _xspace: null,
        /**
         * @type {classes.GridLayoutEngineY}
         */
        _yspace: null,
        /**
         *
         * @param {classes.WidgetGroupBase} widget
         */
        constructor: function(widget) {
          $super.constructor.call(this, widget);
          this._registeredWidgets = [];
          this._registeredSlots = {};
          this._registeredWidgetWatchers = {};
          this._xspace = new cls.GridLayoutEngineX(widget);
          this._yspace = new cls.GridLayoutEngineY(widget);
        },

        _gridHintX: 0,
        _gridHintY: 0,

        setHint: function(widthHint, heightHint) {
          this._gridHintX = ((typeof(widthHint) === "undefined") || widthHint === null || widthHint === "") ? 1 : widthHint;
          this._gridHintY = ((typeof(heightHint) === "undefined") || heightHint === null || heightHint === "") ? 1 : heightHint;
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        registerChild: function(widget) {
          var slotRecycle = null;
          if (this._registeredWidgets.indexOf(widget) >= 0) {
            slotRecycle = this.unregisterChild(widget);
          }
          var info = widget.getLayoutInformation(),
            id = widget.getUniqueIdentifier();
          if (!this._registeredSlots[id]) {
            this._registeredWidgets.push(widget);
            var slotX = slotRecycle && slotRecycle.x && slotRecycle.x.reset(info.getGridX(), info.getGridWidth()) ||
              new cls.GridDimensionSlot(info.getGridX(), info.getGridWidth());
            var slotY = slotRecycle && slotRecycle.y && slotRecycle.y.reset(info.getGridY(), info.getGridHeight()) ||
              new cls.GridDimensionSlot(info.getGridY(), info.getGridHeight());
            this._registeredSlots[id] = {
              x: this._xspace.registerSlot(slotX),
              y: this._yspace.registerSlot(slotY)
            };
            this._registeredWidgetWatchers[id] = info.onGridInfoChanged(this.registerChild.bind(this, widget));
          }
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        unregisterChild: function(widget) {
          var id = widget.getUniqueIdentifier();
          if (this._registeredSlots[id]) {
            var slotRecycle = {};
            this._registeredWidgetWatchers[id]();
            this._registeredWidgetWatchers[id] = null;
            this._registeredWidgets.remove(widget);
            slotRecycle.x = this._xspace.unregisterSlot(this._registeredSlots[id].x);
            slotRecycle.y = this._yspace.unregisterSlot(this._registeredSlots[id].y);
            this._registeredSlots[id] = null;
            return slotRecycle;
          }
          return null;
        },

        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {boolean} all
         * @returns {*}
         */
        getSlotAt: function(x, y, all) {
          var ids = Object.keys(this._registeredSlots);
          var result = !!all ? [] : null;
          for (var i = 0; i < ids.length; i++) {
            var slot = this._registeredSlots[ids[i]];
            if (x >= slot.x.getPosition() && x <= slot.x.getLastPosition() &&
              y >= slot.y.getPosition() && y <= slot.y.getLastPosition()) {
              var res = {
                slot: slot,
                id: ids[i]
              };
              if (!all) {
                return res;
              } else {
                result.push(res);
              }
            }
          }
          return !!(result && result.length) ? result : null;
        },
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
          var layoutInfo = this._getLayoutInfo();
          if (!!this._registeredWidgets.length) {
            for (var i = 0; i < this._registeredWidgets.length; i++) {
              var widget = this._registeredWidgets[i];

              var potentialOwnerDisplayed = !widget.getLayoutInformation().getOwningGrid() ||
                widget.getLayoutInformation().getOwningGrid().isVisible();
              var displayed = widget.isVisible() && potentialOwnerDisplayed;
              var slot = this._registeredSlots[widget.getUniqueIdentifier()];
              if (displayed) {
                slot.x.setDisplayed(true);
                slot.y.setDisplayed(true);
                slot.x.setMinimumBeforeGap();
                slot.x.setMinimumAfterGap();
                slot.y.setMinimumBeforeGap();
                slot.y.setMinimumAfterGap();
                var widgetInfo = this._getLayoutInfo(widget),
                  measured = widgetInfo.getMeasured(),
                  maxSize = widgetInfo.getMaximal(),
                  minSize = widgetInfo.getMinimal(),
                  hintSize = widgetInfo.getPreferred();

                slot.x.setMinSize(minSize.getWidth());
                slot.y.setMinSize(minSize.getHeight());
                slot.x.setMaxSize(maxSize.getWidth());
                slot.y.setMaxSize(maxSize.getHeight());
                slot.x.setHintSize(hintSize.getWidth());
                slot.y.setHintSize(hintSize.getHeight());

                slot.x.setDesiredMinimalSize(measured.getWidth() || widgetInfo.forcedMinimalWidth);
                slot.y.setDesiredMinimalSize(measured.getHeight() || widgetInfo.forcedMinimalHeight);

                if (widget.isGridChildrenInParent && widget.isGridChildrenInParent()) {
                  slot.x.setMinimumBeforeGap(widgetInfo.getDecoratingOffset().getWidth());
                  slot.x.setMinimumAfterGap(widgetInfo.getDecorating().getWidth() - widgetInfo.getDecoratingOffset().getWidth());
                  slot.y.setMinimumBeforeGap(widgetInfo.getDecoratingOffset().getHeight());
                  slot.y.setMinimumAfterGap(widgetInfo.getDecorating().getHeight() - widgetInfo.getDecoratingOffset().getHeight());
                }

                var extra = widget.getLayoutInformation()._extraGap;
                if (!!extra) {
                  slot.x.extraBeforeGap = Math.max(slot.x.extraBeforeGap, extra.beforeX || 0);
                  slot.x.extraAfterGap = Math.max(slot.x.extraAfterGap, extra.afterX || 0);
                  slot.y.extraBeforeGap = Math.max(slot.y.extraBeforeGap, extra.beforeY || 0);
                  slot.y.extraAfterGap = Math.max(slot.y.extraAfterGap, extra.afterY || 0);
                }
              } else {
                slot.x.setDisplayed(false);
                slot.y.setDisplayed(false);
              }
            }
            layoutInfo.setMeasured(Number.discrete(this._xspace.ajust() + layoutInfo.getDecorating().getWidth(true)), Number.discrete(
              this._yspace.ajust()) + layoutInfo.getDecorating().getHeight(true));
            layoutInfo.setMinimal(
              Number.discrete(this._xspace.getMinSize() + layoutInfo.getDecorating().getWidth(true)),
              Number.discrete(this._yspace.getMinSize() + layoutInfo.getDecorating().getHeight(true)));
            layoutInfo.setPreferred(Number.discrete(this._xspace.getHintSize()), Number.discrete(this._yspace.getHintSize()));
            layoutInfo.setMaximal(this._xspace.getMaxSize(), this._yspace.getMaxSize());
          } else {
            this._widget.getLayoutInformation().setSizeHint(this._gridHintX, this._gridHintY);
            layoutInfo.setMeasured(
              Number.discrete(layoutInfo.getPreferred().getWidth() + layoutInfo.getDecorating().getWidth(true)),
              Number.discrete(layoutInfo.getPreferred().getHeight() + layoutInfo.getDecorating().getHeight(true))
            );
            layoutInfo.setMinimal(layoutInfo.getMeasured().getWidth(), layoutInfo.getMeasured().getHeight());
            layoutInfo.setMaximal(layoutInfo.getMeasured().getWidth(), layoutInfo.getMeasured().getHeight());
          }
        },

        prepare: function() {
          var layoutInfo = this._widget.getLayoutInformation();
          var size = layoutInfo.getMeasured();
          var availableSize = layoutInfo.getAvailable().clone();
          var minimalSize = layoutInfo.getMinimal();
          if (minimalSize.getWidth() > availableSize.getWidth()) {
            availableSize.setWidth(minimalSize.getWidth());
          }
          if (minimalSize.getHeight() > availableSize.getHeight()) {
            availableSize.setHeight(minimalSize.getHeight());
          }
          var diffSize = availableSize.minus(size);
          if (diffSize.getWidth() >= 0) {
            this._xspace.setStretchable(layoutInfo.getGravity().horizontal === cls.Gravities.FILL);
            if (layoutInfo.getPreferred().hasWidth()) {
              this._xspace.doStretch(diffSize.getWidth());
            }
          } else {
            if (layoutInfo.getPreferred().hasWidth()) {
              this._xspace.doShrink(diffSize.getWidth());
            }
          }
          if (diffSize.getHeight() >= 0) {
            this._yspace.setStretchable(layoutInfo.getGravity().vertical === cls.Gravities.FILL);
            if (layoutInfo.getPreferred().hasHeight()) {
              this._yspace.doStretch(diffSize.getHeight());
            }
          } else {
            if (layoutInfo.getPreferred().hasHeight()) {
              this._yspace.doShrink(diffSize.getHeight());
            }
          }

          for (var i = 0; i < this._registeredWidgets.length; i++) {
            var widget = this._registeredWidgets[i];
            var slot = this._registeredSlots[widget.getUniqueIdentifier()];
            var widgetInfo = this._getLayoutInfo(widget);
            widgetInfo.setAvailable(
              Number.discrete(this._xspace.ajustAvailableMeasure(slot.x)),
              Number.discrete(this._yspace.ajustAvailableMeasure(slot.y))
            );
            widgetInfo.setAllocated(widgetInfo.getAvailable().getWidth(), widgetInfo.getAvailable().getHeight());
            widgetInfo.getHost().toggleClass("gl_gridElementHidden", !slot.x.displayed);
            widgetInfo.getHost().toggleClass("g_gridChildrenInParent", !!(widget.isGridChildrenInParent && widget.isGridChildrenInParent()));
            widgetInfo.getHost().toggleClass("g_gridChildrenInParentChild", !!widgetInfo.getOwningGrid());
            widgetInfo.getHost().toggleClass("g_decoratingElement", !!widgetInfo._extraGap);
          }

          layoutInfo.setAllocated(
            Number.discrete(this._xspace.getCalculatedSize() + layoutInfo.getDecorating().getWidth(true)),
            Number.discrete(this._yspace.getCalculatedSize() + layoutInfo.getDecorating().getHeight(true))
          );
          this._styleRules["#w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
            "min-height": layoutInfo.getAllocated().getHeight() + "px",
            "min-width": layoutInfo.getAllocated().getWidth() + "px"
          };
        },
        apply: function() {
          var prefix = ".gl_" + this._widget.getUniqueIdentifier() + "_";
          this._xspace.applyStyles(this._styleRules, prefix);
          this._yspace.applyStyles(this._styleRules, prefix);
          styler.appendStyleSheet(this._styleRules, "gridLayout_" + this._widget.getUniqueIdentifier());
        }
      };
    });
  });
