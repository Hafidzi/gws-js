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

modulum('HBoxLayoutEngine', ['DBoxLayoutEngine'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.HBoxLayoutEngine
     * @extends classes.DBoxLayoutEngine
     */
    cls.HBoxLayoutEngine = context.oo.Class(cls.DBoxLayoutEngine, function() {
      /** @lends classes.HBoxLayoutEngine.prototype */
      return {
        __name: "HBoxLayoutEngine",
        _mainSizeGetter: "getWidth",
        _mainSizeSetter: "setWidth",
        _mainHasSizeGetter: "hasWidth",
        _mainStretch: "X",
        _oppositeSizeGetter: "getHeight",
        _oppositeSizeSetter: "setHeight",
        _oppositeHasSizeGetter: "hasHeight",
        _oppositeStretch: "Y",
        /**
         * @protected
         * @param {number} position
         * @param {number} start
         * @param {number} size
         */
        _setItemClass: function(position, start, size) {
          this._styleRules[".gbc_HBoxWidget" + this._widget._getCssSelector() + ">.g_BoxElement:nth-of-type(" + (position + 1) +
            ")"] = {
            left: Number.discrete(start) + "px !important",
            width: Number.discrete(size) + "px !important"
          };
        },
        /**
         * @protected
         * @param {number} position
         */
        _setItemOppositeClass: function(position) {
          this._styleRules[".gbc_HBoxWidget" + this._widget._getCssSelector() + ">.g_BoxElement:nth-of-type(" + (position + 1) +
            ")"].height = Number.discrete(this._getLayoutInfo().getAllocated().getHeight()) + "px !important";
        },
        _applyMeasure: function(mainSize, oppositeSize) {
          this._styleRules["#w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
            width: Number.discrete(mainSize) + "px",
            height: Number.discrete(oppositeSize) + "px"
          };
          this._getLayoutInfo().setMeasured(mainSize, oppositeSize);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         * @returns {boolean}
         */
        _isStretched: function(widget) {
          var wInfo = this._getLayoutInfo(widget);
          return wInfo.getPreferred().getWidth() > 0;
        }
      };
    });
  });
