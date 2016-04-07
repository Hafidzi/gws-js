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

modulum('LayoutInformation', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.LayoutInformation
     * @extends classes.EventListener
     */
    cls.LayoutInformation = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.LayoutInformation.prototype */
      return {
        __name: "LayoutInformation",
        /** @lends classes.LayoutInformation */
        $static: {
          gridInfoChangedEvent: "g_gridInfoChanged"
        },
        /**
         * @type {classes.WidgetBase}
         */
        _widget: null,
        /**
         * Grid space usage if i am on grid
         * @type {{x:number, y:number, width:number, height:number, stepX:number, stepY:number}}
         */
        _grid: null,
        /**
         * Initial size preferred by design
         * @type {classes.Size}
         */
        _preferred: null,
        /**
         * Measure in current state
         * @type {classes.Size}
         */
        _measured: null,
        /**
         * Till which size i can shrink
         * @type {classes.Size}
         */
        _minimal: null,
        /**
         * Till which size i can grow
         * @type {classes.Size}
         */
        _maximal: null,
        /**
         * The space i will effectively take
         * @type {classes.Size}
         */
        _allocated: null,
        /**
         * The space my host reserved for me
         * @type {classes.Size}
         */
        _available: null,
        /**
         * In case of a container, the space reserved for decoration(borders, title, ...)
         * @type {classes.Size}
         */
        _decorating: null,
        /**
         * In case of a container, the offset of the containerElement
         * @type {classes.Size}
         */
        _decoratingOffset: null,
        /**
         *
         * @type {classes.Stretch}
         */
        _stretched: null,
        /**
         *
         * @type {classes.Gravity}
         */
        _gravity: null,
        _childrenStretchX: null,
        _childrenStretchY: null,
        /**
         * @type {{x:string, y:string, width:string, height:string}}
         */
        _classes: null,
        /**
         *
         * @type {Element}
         */
        _host: null,
        /**
         * @type {classes.SizePolicyConfig}
         */
        _sizePolicyConfig: null,
        _needMeasure: true,
        _needValuedMeasure: false,
        _initialMeasure: false,
        _owningGrid: null,

        forcedMinimalWidth: 1,
        forcedMinimalHeight: 1,
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        constructor: function(widget) {
          $super.constructor.call(this);
          this._uuid = context.InitService.uniqueId("glayout_");
          this._widget = widget;
          this._childrenStretchX = [];
          this._childrenStretchY = [];
          this._grid = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
          };
          this._preferred = new cls.Size();
          this._measured = new cls.Size();
          this._minimal = new cls.Size();
          this._maximal = new cls.Size();
          this._allocated = new cls.Size();
          this._available = new cls.Size();
          this._decorating = new cls.Size();
          this._decoratingOffset = new cls.Size();
          this._stretched = new cls.Stretch();
          this._sizePolicyConfig = new cls.SizePolicyConfig();
          this._gravity = new cls.Gravity();
          this._classes = {
            x: null,
            y: null,
            width: null,
            height: null
          };
          this.reset();
        },
        destroy: function() {
          this._widget = null;
          $super.destroy.call(this);
        },
        reset: function() {
          this._grid.x = 0;
          this._grid.y = 0;
          this._grid.width = 1;
          this._grid.height = 1;

          this._preferred.reset();
          this._measured.reset();
          this._minimal.reset();
          this._maximal.reset();
          this._allocated.reset();
          this._available.reset();
          this._decorating.reset();
          this._decoratingOffset.reset();
          this._stretched.reset();
          this._sizePolicyConfig.reset();
          this._gravity.reset();

          this._classes.x = null;
          this._classes.y = null;
          this._classes.width = null;
          this._classes.height = null;

          this._childrenStretchX.length = 0;
          this._childrenStretchY.length = 0;
        },

        needMeasure: function() {
          if (this._needMeasure || this._needValuedMeasure) {
            this._needMeasure = false;
            this._needValuedMeasure = false;
            return true;
          }
          return !this._measured.hasWidth() && !this._measured.hasHeight();
        },
        getOwningGrid: function() {
          return this._owningGrid;
        },
        setOwningGrid: function(grid) {
          this._owningGrid = grid;
        },
        invalidateMeasure: function() {
          this._needMeasure = true;
        },
        invalidateInitialMeasure: function(condition) {
          if (!this._initialMeasure && !!condition) {
            this._needValuedMeasure = true;
            this._initialMeasure = true;
          } else {
            this._needValuedMeasure = false;
          }
        },
        /**
         *
         * @returns {classes.Size}
         */
        getMeasured: function() {
          return this._measured;
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setMeasured: function(width, height) {
          this._measured.setWidth(width);
          this._measured.setHeight(height);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getMinimal: function(containerOnly) {
          if (containerOnly) {
            return this._minimal.minus(this._decorating);
          } else {
            return this._minimal;
          }
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setMinimal: function(width, height) {
          this._minimal.setWidth(width);
          this._minimal.setHeight(height);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getMaximal: function() {
          return this._maximal;
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setMaximal: function(width, height) {
          this._maximal.setWidth(width);
          this._maximal.setHeight(height);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getAllocated: function() {
          return this._allocated;
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setAllocated: function(width, height) {
          this._allocated.setWidth(width);
          this._allocated.setHeight(height);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getDecorating: function() {
          return this._decorating;
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setDecorating: function(width, height) {
          this._decorating.setWidth(width);
          this._decorating.setHeight(height);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getDecoratingOffset: function() {
          return this._decoratingOffset;
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setDecoratingOffset: function(width, height) {
          this._decoratingOffset.setWidth(width);
          this._decoratingOffset.setHeight(height);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getAvailable: function(containerOnly) {
          if (containerOnly) {
            return this._available.minus(this._decorating);
          } else {
            return this._available;
          }
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         * @param {boolean=} loose
         */
        setAvailable: function(width, height, loose) {
          this._available.setWidth(width);
          this._available.setHeight(height);
          this._available.setLoose(!!loose);
        },
        /**
         *
         * @returns {classes.Size}
         */
        getPreferred: function() {
          return this._preferred;
        },
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setPreferred: function(width, height) {
          this._preferred.setWidth(width);
          this._preferred.setHeight(height);
        },

        /**
         *
         * @param {number} width
         * @param {number} height
         */
        setSizeHint: function(width, height) {
          this._preferred.setWidth(cls.Size.translate(this._widget, width));
          this._preferred.setHeight(cls.Size.translate(this._widget, height));
          this._hintWidth = width;
        },

        /**
         *
         * @returns {classes.SizePolicyConfig}
         */
        getSizePolicyConfig: function() {
          return this._sizePolicyConfig;
        },
        /**
         *
         * @returns {classes.SizePolicy}
         */
        getCurrentSizePolicy: function() {
          return this._sizePolicyConfig.getMode();
        },
        /**
         *
         * @param {classes.SizePolicyConfig} policyConfig
         */
        setSizePolicyConfig: function(policyConfig) {
          this._sizePolicyConfig = policyConfig;
        },
        /**
         *
         * @param {string} policy
         */
        setSizePolicyMode: function(policy) {
          this._sizePolicyConfig.setMode(policy);
        },
        /**
         *
         * @returns {number}
         */
        getGridX: function() {
          var delta = 0;
          if (this._owningGrid) {
            delta = this._owningGrid.getLayoutInformation().getGridX() || 0;
          }
          return this._grid.x + delta;
        },
        /**
         *
         * @param {number} x
         */
        setGridX: function(x) {
          if (x !== this._grid.x || !this._classes.x) {
            this._grid.x = x || 0;
            this.setGridXClass(this.getClassName("x", this.getGridX()));
            this.setGridWidthClass(this.getClassName("w", this.getGridX(), this.getGridWidth()));
            this.emit(cls.LayoutInformation.gridInfoChangedEvent);
          }
        },
        /**
         *
         * @returns {number}
         */
        getGridY: function() {
          var delta = 0;
          if (this._owningGrid) {
            delta = this._owningGrid.getLayoutInformation().getGridY() || 0;
          }
          return this._grid.y + delta;
        },
        setGridY: function(y) {
          if (y !== this._grid.y || !this._classes.y) {
            this._grid.y = y || 0;
            this.setGridYClass(this.getClassName("y", this.getGridY()));
            this.setGridHeightClass(this.getClassName("h", this.getGridY(), this.getGridHeight()));
            this.emit(cls.LayoutInformation.gridInfoChangedEvent);
          }
        },
        /**
         *
         * @returns {number}
         */
        getGridWidth: function() {
          return this._grid.width;
        },
        /**
         *
         * @param {number} width
         */
        setGridWidth: function(width) {
          this._rawGridWidth = width;
          if (width !== this._grid.width || !this._classes.width) {
            this._grid.width = width || (width === 0 ? 0 : 1);
            this.setGridWidthClass(this.getClassName("w", this.getGridX(), this.getGridWidth()));
            this.emit(cls.LayoutInformation.gridInfoChangedEvent);
          }
        },
        /**
         *
         * @returns {number}
         */
        getGridHeight: function() {
          return this._grid.height;
        },
        /**
         *
         * @param {number} height
         */
        setGridHeight: function(height) {
          if (height !== this._grid.height || !this._classes.height) {
            this._grid.height = height || (height === 0 ? 0 : 1);
            this.setGridHeightClass(this.getClassName("h", this.getGridY(), this.getGridHeight()));
            this.emit(cls.LayoutInformation.gridInfoChangedEvent);
          }
        },
        /**
         *
         * @returns {Element}
         */
        getHost: function() {
          return this._host;
        },
        /**
         *
         * @param {Element} host
         */
        setHost: function(host) {
          this._host = host;
          this.setGridXClass(this.getClassName("x", this.getGridX()));
          this.setGridYClass(this.getClassName("y", this.getGridY()));
          this.setGridWidthClass(this.getClassName("w", this.getGridX(), this.getGridWidth()));
          this.setGridHeightClass(this.getClassName("h", this.getGridY(), this.getGridHeight()));
        },
        /**
         *
         * @param {string} className
         */
        setGridXClass: function(className) {
          if (this._classes.x) {
            if (this.getHost()) {
              this.getHost().removeClass(this._classes.x);
            }
          }
          this._classes.x = className;
          if (this.isGridItem()) {
            if (this.getHost()) {
              this.getHost().addClass(this._classes.x);
            }
          }
        },
        /**
         *
         * @param {string} className
         */
        setGridYClass: function(className) {
          if (this._classes.y) {
            if (this.getHost()) {
              this.getHost().removeClass(this._classes.y);
            }
          }
          this._classes.y = className;
          if (this.isGridItem()) {
            if (this.getHost()) {
              this.getHost().addClass(this._classes.y);
            }
          }
        },
        /**
         *
         * @param {string} className
         */
        setGridWidthClass: function(className) {
          if (this._classes.width) {
            if (this.getHost()) {
              this.getHost().removeClass(this._classes.width);
            }
          }
          this._classes.width = className;
          if (this.isGridItem()) {
            if (this.getHost()) {
              this.getHost().addClass(this._classes.width);
            }
          }
        },
        /**
         *
         * @param {string} className
         */
        setGridHeightClass: function(className) {
          if (this._classes.height) {
            if (this.getHost()) {
              this.getHost().removeClass(this._classes.height);
            }
          }
          this._classes.height = className;
          if (this.isGridItem()) {
            if (this.getHost()) {
              this.getHost().addClass(this._classes.height);
            }
          }
        },
        isGridItem: function() {
          return !!this._widget.getParentWidget() && (this._widget.getParentWidget().getLayoutEngine() instanceof cls.GridLayoutEngine ||
            this._widget.getParentWidget().getLayoutEngine() instanceof cls.ScrollGridLayoutEngine);
        },
        /**
         *
         * @returns {string}
         */
        getClassName: function() {
          if (this._widget.getParentWidget()) {
            return "gl_" + this._widget.getParentWidget().getUniqueIdentifier() + "_" + Array.prototype.join.call(arguments,
              "_");
          } else {
            return null;
          }
        },
        /**
         *
         * @returns {classes.Gravity}
         */
        getGravity: function() {
          return this._gravity;
        },
        /**
         *
         * @returns {classes.Stretch}
         */
        getStretched: function() {
          return this._stretched;
        },
        /**
         *
         * @returns {boolean}
         */
        isXStretched: function() {
          return this._stretched.getX(true);
        },
        /**
         *
         * @param {boolean} stretch
         */
        setXStretched: function(stretch) {
          if (this._stretched.x !== stretch) {
            this._stretched.x = stretch;
            this.emit(cls.LayoutInformation.gridInfoChangedEvent);
          }
        },
        /**
         *
         * @returns {boolean}
         */
        isYStretched: function() {
          return this._stretched.getY(true);
        },
        /**
         *
         * @returns {boolean}
         */
        isChildrenXStretched: function() {
          return !!this._childrenStretchX.length;
        },
        /**
         *
         * @returns {boolean}
         */
        isChildrenYStretched: function() {
          return !!this._childrenStretchY.length;
        },
        /**
         *
         * @param {boolean} stretch
         */
        setYStretched: function(stretch) {
          if (this._stretched.y !== stretch) {
            this._stretched.y = stretch;
            this.emit(cls.LayoutInformation.gridInfoChangedEvent);
          }
        },
        resetChildrenStretch: function() {
          this._childrenStretchX.length = 0;
          this._childrenStretchY.length = 0;
        },
        addChildrenStretchX: function(val) {
          this._childrenStretchX.push(val);
        },
        addChildrenStretchY: function(val) {
          this._childrenStretchY.push(val);
        },
        onGridInfoChanged: function(hook) {
          return this.on(cls.LayoutInformation.gridInfoChangedEvent, hook);
        }
      };
    });
  });
