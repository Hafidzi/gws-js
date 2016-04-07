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

modulum('DBoxLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DBoxLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.DBoxLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function($super) {
      /** @lends classes.DBoxLayoutEngine.prototype */
      return {
        __name: "DBoxLayoutEngine",
        _mainSizeGetter: null,
        _mainSizeSetter: null,
        _mainHasSizeGetter: null,
        _mainStretch: null,
        _oppositeSizeGetter: null,
        _oppositeSizeSetter: null,
        _oppositeHasSizeGetter: null,
        _oppositeStretch: null,
        _forcedHint: null,
        _pack: null,
        /**
         * @type {classes.WidgetBase[]}
         */
        _registeredWidgets: null,
        _stretches: null,
        constructor: function(widget) {
          $super.constructor.call(this, widget);
          this._forcedHint = {};
          this._stretches = [];
          this._registeredWidgets = [];
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        registerChild: function(widget, position) {
          if (this._registeredWidgets.indexOf(widget) < 0) {
            this._registeredWidgets.splice(position, 0, widget);
            this._forcedHint[widget.getUniqueIdentifier()] = 0;
          }
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        unregisterChild: function(widget) {
          this._forcedHint[widget.getUniqueIdentifier()] = null;
          this._registeredWidgets.remove(widget);
        },

        refreshForcedHint: function(w, size) {
          this._forcedHint[w.getUniqueIdentifier()] = size || 0;
        },

        measure: function() {
          this._getLayoutInfo().setMeasured(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setPreferred(0, 0);
          this._getLayoutInfo().setAllocated(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setAvailable(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setMinimal(cls.Size.undef, cls.Size.undef);
          this._getLayoutInfo().setMaximal(cls.Size.undef, cls.Size.undef);
          for (var i = 0, j = 2; j < this._registeredWidgets.length;) {
            var w = this._registeredWidgets[i];
            var w2 = this._registeredWidgets[j];
            if (w.isVisible() && w2.isVisible()) {
              this._registeredWidgets[i + 1].setHidden(false);
              i += 2;
              j += 2;
            } else if (!w.isVisible() && w2.isVisible()) {
              this._registeredWidgets[i + 1].setHidden(true);
              i += 2;
              j += 2;
            } else if (w.isVisible() && !w2.isVisible()) {
              this._registeredWidgets[j - 1].setHidden(true);
              j += 2;
            } else {
              this._registeredWidgets[j - 1].setHidden(true);
              i += 2;
              j += 2;
            }
          }
        },

        ajust: function() {
          this._stretches.length = 0;
          var layoutInfo = this._getLayoutInfo();
          var position = 0,
            minimal = 0;
          var oppositeSize = 0;
          var maxSize = 0,
            maxOppositeSize = 0,
            oppositeStretch = 0;
          for (var i = 0; i < this._registeredWidgets.length; i++) {
            var w = this._registeredWidgets[i];
            if (!w.isVisible()) {
              continue;
            }
            var hasMaxSize = this._hasMaximalSize(w),
              hasOppositeMaxSize = this._hasOppositeMaximalSize(w);
            if (hasMaxSize) {
              if (maxSize !== cls.Size.undef) {
                maxSize += this._getMaximalSize(w);
              }
            } else {
              maxSize = cls.Size.undef;
              var hint = this._getHintSize(w);
              hint = hint === cls.Size.undef ? 0 : hint;
              layoutInfo.getPreferred()[this._mainSizeSetter](layoutInfo.getPreferred()[this._mainSizeGetter]() + hint);
            }
            if (hasOppositeMaxSize) {
              if (maxOppositeSize !== cls.Size.undef) {
                maxOppositeSize = Math.max(maxOppositeSize, this._getOppositeMaximalSize(w));
              }
            } else {
              maxOppositeSize = cls.Size.undef;
              if (oppositeStretch < this._getOppositeHintSize(w)) {
                oppositeStretch = this._getOppositeHintSize(w);
              }
            }
            var size = this._getMeasuredSize(w),
              minimalSize = this._getMinimalSize(w),
              opposite = this._getOppositeMinimalSize(w);
            oppositeSize = Math.max(oppositeSize, opposite === cls.Size.undef ? 0 : opposite);
            position += size === cls.Size.undef ? 0 : size;
            minimal += minimalSize;
          }
          if (oppositeStretch > 0) {
            layoutInfo.getPreferred()[this._oppositeSizeSetter](oppositeStretch);
          }
          this._applyMeasure(position, oppositeSize);
          layoutInfo.getMinimal()[this._mainSizeSetter](minimal);
          layoutInfo.getMinimal()[this._oppositeSizeSetter](oppositeSize);

          this._setMaximalSize(this._widget, maxSize);
          this._setOppositeMaximalSize(this._widget, maxOppositeSize);

        },

        prepare: function() {
          var i, w, distributeSize;
          var position = 0;
          var fullSize = this._getAvailableSize();

          if (this._getHintSize()) {
            var fullRatio = 0,
              ratios = {};
            for (i = 0; i < this._registeredWidgets.length; i++) {
              w = this._registeredWidgets[i];
              if (w instanceof cls.SplitterWidget) {
                fullSize -= Math.max(this._getMeasuredSize(w), this._getMinimalSize(w));
              } else {
                if (w.isVisible()) {
                  var size = this._getHintSize(w);
                  if (size) {
                    ratios[w.getUniqueIdentifier()] = size;
                    fullRatio += size;
                  }
                }
              }
            }

            var minSize = this._getMinimalSize();
            distributeSize = minSize > this._getAvailableSize() ?
              0 : (this._getAvailableSize() - minSize);
            for (i = 0; i < this._registeredWidgets.length; i++) {
              w = this._registeredWidgets[i];
              if (w.isVisible()) {
                this._setOppositeAvailableSize(w, this._getOppositeAvailableSize());
                var msize = this._getMinimalSize(w);
                if (!this._isStretched(w)) {
                  this._setAvailableSize(w, msize);
                } else {
                  this._setAvailableSize(w, msize + distributeSize * (ratios[w.getUniqueIdentifier()] /
                    fullRatio));
                }
              }
            }
          } else {
            var items = [],
              distributedSize = {},
              available = this._getAvailableSize(),
              accumulated = 0,
              currentLevel = 0,
              distibutableLevel = -1;

            for (var it = 0; it < this._registeredWidgets.length; it++) {
              if (this._registeredWidgets[it].__name !== "SplitterWidget") {
                items.push(this._registeredWidgets[it]);
              }
            }

            var count = items.length;

            var lastItem = items[count - 1];
            items.sort(this._sortItems.bind(this));

            while (distibutableLevel === -1 && currentLevel < count) {
              var minimalCurrent = this._getMinimalSize(items[currentLevel]);
              if (available >= (accumulated + minimalCurrent * (count - currentLevel))) {
                distibutableLevel = currentLevel;
              } else {
                accumulated += minimalCurrent;
                distributedSize[items[currentLevel].getUniqueIdentifier()] = minimalCurrent;
                currentLevel++;
              }
            }
            if (distibutableLevel >= 0) {
              if (this._pack === "start") {
                var total = 0;
                for (i = 0; i < count; i++) {
                  var item = items[i];
                  if (item !== lastItem) {
                    total += distributedSize[items[i].getUniqueIdentifier()] = this._getMinimalSize(items[i]);
                  }
                }
                distributedSize[lastItem.getUniqueIdentifier()] = Math.max(this._getMinimalSize(lastItem), available - total);
              } else {
                var distributablePart = (available - accumulated) / (count - distibutableLevel);
                for (i = distibutableLevel; i < count; i++) {
                  distributedSize[items[i].getUniqueIdentifier()] = distributablePart;
                }
              }
            }
            for (i = 0; i < this._registeredWidgets.length; i++) {
              w = this._registeredWidgets[i];
              if (w.isVisible()) {
                if (distributedSize.hasOwnProperty(w.getUniqueIdentifier())) {
                  this._setAvailableSize(w, Number.discrete(distributedSize[w.getUniqueIdentifier()]));
                }
                this._setOppositeAvailableSize(w, this._getOppositeAvailableSize());
              }
            }
          }
          for (i = 0; i < this._registeredWidgets.length; i++) {
            w = this._registeredWidgets[i];
            if (w.isVisible()) {
              var wSize = this._getAvailableSize(w);
              if (!this._getMainStretched()) {
                wSize = Math.max(this._getMinimalSize(w), wSize);
              }
              this._setAllocatedSize(w, wSize);
              var oppositeWSize = this._getOppositeAvailableSize();
              if (!this._getOppositeStretched() || this._getLayoutInfo().getAvailable().isLoose()) {
                oppositeWSize = Math.max(oppositeWSize, this._getOppositeMinimalSize());
              }
              this._setOppositeAllocatedSize(w, oppositeWSize);
              this._setOppositeAvailableSize(w, oppositeWSize);
              this._setItemClass(i, position, wSize);
              position += wSize === cls.Size.undef ? 0 : wSize;
            }
          }

          var width = Math.max(this._getLayoutInfo().getAvailable().getWidth(), this._getLayoutInfo().getMinimal().getWidth());
          var height = Math.max(this._getLayoutInfo().getAvailable().getHeight(), this._getLayoutInfo().getMinimal().getHeight());
          this._getLayoutInfo().setAllocated(width, height);

          for (i = 0; i < this._registeredWidgets.length; i++) {
            w = this._registeredWidgets[i];
            if (w.isVisible()) {
              this._setItemOppositeClass(i);
              this._setOppositeAllocatedSize(w, this._getOppositeAllocatedSize());

            }
          }
          this._styleRules["#w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
            width: Number.discrete(this._getLayoutInfo().getAllocated().getWidth()) + "px",
            height: Number.discrete(this._getLayoutInfo().getAllocated().getHeight()) + "px"
          };
        },
        apply: function() {
          styler.appendStyleSheet(this._styleRules, "boxLayout_" + this._widget.getUniqueIdentifier());
        },

        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number}
         */
        _getHintSize: function(widget) {
          var w = (widget || this._widget).getUniqueIdentifier();
          if (this._forcedHint[w]) {
            return this._forcedHint[w];
          }
          var hintSize = this._getLayoutInfo(widget).getPreferred();
          return hintSize[this._mainSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number}
         */
        _getOppositeHintSize: function(widget) {
          var hintSize = this._getLayoutInfo(widget).getPreferred();
          return hintSize[this._oppositeSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number}
         */
        _getOppositeSize: function(widget) {
          var effectiveSize = this._getLayoutInfo(widget).getMeasured();
          return effectiveSize[this._oppositeSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number}
         */
        _getAllocatedSize: function(widget) {
          var allocatedSize = this._getLayoutInfo(widget).getAllocated();
          return allocatedSize[this._mainSizeGetter]();

        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @param {number} size
         */
        _setAllocatedSize: function(widget, size) {
          var allocatedSize = this._getLayoutInfo(widget).getAllocated();
          return allocatedSize[this._mainSizeSetter](size);
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @param {number} size
         */
        _setMaximalSize: function(widget, size) {
          var maximalSize = this._getLayoutInfo(widget).getMaximal();
          return maximalSize[this._mainSizeSetter](size);
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @param {number} size
         */
        _setOppositeMaximalSize: function(widget, size) {
          var maximalSize = this._getLayoutInfo(widget).getMaximal();
          return maximalSize[this._oppositeSizeSetter](size);
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _getMeasuredSize: function(widget) {
          var w = (widget || this._widget).getUniqueIdentifier();
          if (this._forcedHint[w]) {
            return this._forcedHint[w];
          }
          var measuredSize = this._getLayoutInfo(widget).getMeasured();
          return measuredSize[this._mainSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _getMinimalSize: function(widget) {
          var minimalSize = this._getLayoutInfo(widget).getMinimal();
          return minimalSize[this._mainSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _getOppositeMinimalSize: function(widget) {
          var minimalSize = this._getLayoutInfo(widget).getMinimal();
          return minimalSize[this._oppositeSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _getMaximalSize: function(widget) {
          var maximalSize = this._getLayoutInfo(widget).getMaximal();
          return maximalSize[this._mainSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _getOppositeMaximalSize: function(widget) {
          var maximalSize = this._getLayoutInfo(widget).getMaximal();
          return maximalSize[this._oppositeSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _hasMaximalSize: function(widget) {
          var maximalSize = this._getLayoutInfo(widget).getMaximal();
          return maximalSize[this._mainHasSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _hasOppositeMaximalSize: function(widget) {
          var maximalSize = this._getLayoutInfo(widget).getMaximal();
          return maximalSize[this._oppositeHasSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number} size
         */
        _getAvailableSize: function(widget) {
          var availableSize = this._getLayoutInfo(widget).getAvailable();
          return availableSize[this._mainSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @param {number} size
         */
        _setAvailableSize: function(widget, size) {
          var availableSize = this._getLayoutInfo(widget).getAvailable();
          availableSize[this._mainSizeSetter](size);
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number}
         */
        _getOppositeAvailableSize: function(widget) {
          var availableSize = this._getLayoutInfo(widget).getAvailable();
          return availableSize[this._oppositeSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @param {number} size
         */
        _setOppositeAvailableSize: function(widget, size) {
          var availableSize = this._getLayoutInfo(widget).getAvailable();
          availableSize[this._oppositeSizeSetter](size);
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {number}
         */
        _getOppositeAllocatedSize: function(widget) {
          var allocatedSize = this._getLayoutInfo(widget).getAllocated();
          return allocatedSize[this._oppositeSizeGetter]();
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @param {number} size
         */
        _setOppositeAllocatedSize: function(widget, size) {
          var allocatedSize = this._getLayoutInfo(widget).getAllocated();
          allocatedSize[this._oppositeSizeSetter](size);
        },
        /**
         * @protected
         * @param {number} position
         * @param {number} start
         * @param {number} size
         */
        _setItemClass: function(position, start, size) {

        },
        /**
         * @protected
         * @param {number} position
         * @param {number} start
         * @param {number} size
         */
        _setItemOppositeClass: function(position, start, size) {

        },
        /**
         * @protected
         * @param {number} mainSize
         * @param {number} oppositeSize
         */
        _applyMeasure: function(mainSize, oppositeSize) {

        },
        /**
         * @protected
         * @param {classes.WidgetBase} widget
         * @returns {boolean}
         */
        _isStretched: function(widget) {
          return false;
        },
        _getMainStretched: function(widget) {
          var mainStretched = this._getLayoutInfo(widget).getStretched();
          return mainStretched["get" + this._mainStretch]();
        },
        _getOppositeStretched: function(widget) {
          var oppositeStretched = this._getLayoutInfo(widget).getStretched();
          return oppositeStretched["get" + this._oppositeStretch]();
        },
        _sortItems: function(a, b) {
          return this._getMinimalSize(b) - this._getMinimalSize(a);
        }
      };
    });
  });
