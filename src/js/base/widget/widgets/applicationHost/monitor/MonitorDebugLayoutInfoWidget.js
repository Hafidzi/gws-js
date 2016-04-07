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

modulum('MonitorDebugLayoutInfoWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MonitorDebugLayoutInfoWidget
     * @extends classes.WidgetBase
     */
    cls.MonitorDebugLayoutInfoWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.MonitorDebugLayoutInfoWidget.prototype */
      return {
        __name: "MonitorDebugLayoutInfoWidget",
        _layoutEngineName: null,
        _posX: null,
        _posY: null,
        _gridWidth: null,
        _gridHeight: null,
        _width: null,
        _height: null,
        _measuredHasSize: null,
        _measuredWidth: null,
        _measuredHeight: null,
        _minimalHasSize: null,
        _minimalWidth: null,
        _minimalHeight: null,
        _maximalHasSize: null,
        _maximalWidth: null,
        _maximalHeight: null,
        _availableHasSize: null,
        _availableWidth: null,
        _availableHeight: null,
        _allocatedHasSize: null,
        _allocatedWidth: null,
        _allocatedHeight: null,
        _decoratingHasSize: null,
        _decoratingWidth: null,
        _decoratingHeight: null,
        _stretchX: null,
        _stretchY: null,
        _childrenStretchX: null,
        _childrenStretchY: null,

        _initElement: function() {
          $super._initElement.call(this);
          this._layoutEngineName = this._element.querySelector(".value_layoutEngineName");
          this._posX = this._element.querySelector(".value_posX");
          this._posY = this._element.querySelector(".value_posY");
          this._gridWidth = this._element.querySelector(".value_gridWidth");
          this._gridHeight = this._element.querySelector(".value_gridHeight");
          this._width = this._element.querySelector(".value_width");
          this._height = this._element.querySelector(".value_height");
          this._measuredHasSize = this._element.querySelector(".value_measured_hasSize");
          this._measuredWidth = this._element.querySelector(".value_measured_width");
          this._measuredHeight = this._element.querySelector(".value_measured_height");
          this._minimalHasSize = this._element.querySelector(".value_minimal_hasSize");
          this._minimalWidth = this._element.querySelector(".value_minimal_width");
          this._minimalHeight = this._element.querySelector(".value_minimal_height");
          this._maximalHasSize = this._element.querySelector(".value_maximal_hasSize");
          this._maximalWidth = this._element.querySelector(".value_maximal_width");
          this._maximalHeight = this._element.querySelector(".value_maximal_height");
          this._availableHasSize = this._element.querySelector(".value_available_hasSize");
          this._availableWidth = this._element.querySelector(".value_available_width");
          this._availableHeight = this._element.querySelector(".value_available_height");
          this._allocatedHasSize = this._element.querySelector(".value_allocated_hasSize");
          this._allocatedWidth = this._element.querySelector(".value_allocated_width");
          this._allocatedHeight = this._element.querySelector(".value_allocated_height");
          this._decoratingHasSize = this._element.querySelector(".value_decorating_hasSize");
          this._decoratingWidth = this._element.querySelector(".value_decorating_width");
          this._decoratingHeight = this._element.querySelector(".value_decorating_height");
          this._stretchX = this._element.querySelector(".value_stretch_x");
          this._stretchY = this._element.querySelector(".value_stretch_y");
          this._childrenStretchX = this._element.querySelector(".value_stretch_children_x");
          this._childrenStretchY = this._element.querySelector(".value_stretch_children_y");

        },
        setLayoutEngineName: function(value) {
          this._layoutEngineName.textContent = value;
        },
        setPosX: function(value) {
          this._posX.textContent = value;
        },
        setPosY: function(value) {
          this._posY.textContent = value;
        },
        setGridWidth: function(value) {
          this._gridWidth.textContent = value;
        },
        setGridHeight: function(value) {
          this._gridHeight.textContent = value;
        },
        setWidth: function(value) {
          this._width.textContent = value;
        },
        setHeight: function(value) {
          this._height.textContent = value;
        },
        setMeasuredHasSize: function(value) {
          this._measuredHasSize.textContent = value;
        },
        setMeasuredWidth: function(value) {
          this._measuredWidth.textContent = value;
        },
        setMeasuredHeight: function(value) {
          this._measuredHeight.textContent = value;
        },
        setMinimalHasSize: function(value) {
          this._minimalHasSize.textContent = value;
        },
        setMinimalWidth: function(value) {
          this._minimalWidth.textContent = value;
        },
        setMinimalHeight: function(value) {
          this._minimalHeight.textContent = value;
        },
        setMaximalHasSize: function(value) {
          this._maximalHasSize.textContent = value;
        },
        setMaximalWidth: function(value) {
          this._maximalWidth.textContent = value;
        },
        setMaximalHeight: function(value) {
          this._maximalHeight.textContent = value;
        },
        setAvailableHasSize: function(value) {
          this._availableHasSize.textContent = value;
        },
        setAvailableWidth: function(value) {
          this._availableWidth.textContent = value;
        },
        setAvailableHeight: function(value) {
          this._availableHeight.textContent = value;
        },
        setAllocatedHasSize: function(value) {
          this._allocatedHasSize.textContent = value;
        },
        setAllocatedWidth: function(value) {
          this._allocatedWidth.textContent = value;
        },
        setAllocatedHeight: function(value) {
          this._allocatedHeight.textContent = value;
        },
        setDecoratingHasSize: function(value) {
          this._decoratingHasSize.textContent = value;
        },
        setDecoratingWidth: function(value) {
          this._decoratingWidth.textContent = value;
        },
        setDecoratingHeight: function(value) {
          this._decoratingHeight.textContent = value;
        },
        setStretchX: function(value) {
          this._stretchX.textContent = value;
        },
        setStretchY: function(value) {
          this._stretchY.textContent = value;
        },
        setChildrenStretchX: function(value) {
          this._childrenStretchX.textContent = value;
        },
        setChildrenStretchY: function(value) {
          this._childrenStretchY.textContent = value;
        }
      };
    });
    cls.WidgetFactory.register('MonitorDebugLayoutInfo', cls.MonitorDebugLayoutInfoWidget);
  });
