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

modulum('VBoxLayoutEngine', ['DBoxLayoutEngine'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.VBoxLayoutEngine
     * @extends classes.DBoxLayoutEngine
     */
    cls.VBoxLayoutEngine = context.oo.Class(cls.DBoxLayoutEngine, function() {
      /** @lends classes.VBoxLayoutEngine.prototype */
      return {
        __name: "VBoxLayoutEngine",
        _mainSizeGetter: "getHeight",
        _mainSizeSetter: "setHeight",
        _mainHasSizeGetter: "hasHeight",
        _mainStretch: "Y",
        _oppositeSizeGetter: "getWidth",
        _oppositeSizeSetter: "setWidth",
        _oppositeHasSizeGetter: "hasWidth",
        _oppositeStretch: "X",
        _pack: "start",

        /**
         * @protected
         * @param {number} position
         * @param {number} start
         * @param {number} size
         */
        _setItemClass: function(position, start, size) {
          this._styleRules[".gbc_VBoxWidget" + this._widget._getCssSelector() + ">.g_BoxElement:nth-of-type(" + (position + 1) +
            ")"] = {
            top: Number.discrete(start) + "px !important",
            height: Number.discrete(size) + "px !important"
          };
        },
        /**
         * @protected
         * @param {number} position
         */
        _setItemOppositeClass: function(position) {
          this._styleRules[".gbc_VBoxWidget" + this._widget._getCssSelector() + ">.g_BoxElement:nth-of-type(" + (position + 1) +
            ")"].width = Number.discrete(this._getLayoutInfo().getAllocated().getWidth()) + "px !important";
        },
        _applyMeasure: function(mainSize, oppositeSize) {
          this._styleRules["#w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
            height: Number.discrete(mainSize) + "px",
            width: Number.discrete(oppositeSize) + "px"
          };
          this._getLayoutInfo().setMeasured(oppositeSize, mainSize);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         * @returns {boolean}
         */
        _isStretched: function(widget) {
          var wInfo = this._getLayoutInfo(widget);
          return wInfo.getPreferred().getHeight() > 0;
        }
      };
    });
  });
