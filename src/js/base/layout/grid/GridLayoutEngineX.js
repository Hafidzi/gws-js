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

modulum('GridLayoutEngineX', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.GridLayoutEngineX
     */
    cls.GridLayoutEngineX = context.oo.Class(
      /** @lends classes.GridLayoutEngineX.prototype */
      {
        __name: "GridLayoutEngineX",
        /**
         * @type {classes.WidgetBase}
         */
        _widget: null,

        /**
         * @type classes.GridDimensionManager
         */
        dimensionManager: null,

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        constructor: function(widget) {
          this._widget = widget;
          this.dimensionManager = new cls.GridDimensionManager(0);
        },
        destroy: function() {
          this.dimensionManager.destroy();
          this._widget = null;
        },

        /**
         *
         * @param {classes.GridDimensionSlot} slot
         * @returns {classes.GridDimensionSlot} the same slot
         */
        registerSlot: function(slot) {
          this.dimensionManager.addSlot(slot);
          return slot;
        },

        /**
         *
         * @param {classes.GridDimensionSlot} slot
         */
        unregisterSlot: function(slot) {
          return this.dimensionManager.removeSlot(slot);
        },

        setStretchable: function(stretchable) {
          this.dimensionManager.setStretchable(stretchable);
        },

        /**
         *
         * @param {Number} widthToDistribute
         * @returns {boolean}
         */
        doStretch: function(widthToDistribute) {
          return this.dimensionManager.updateBonusSize(widthToDistribute);
        },

        /**
         *
         * @param {Number} widthToRemove
         * @returns {boolean}
         */
        doShrink: function(widthToRemove, minimalSize) {
          return this.dimensionManager.updateBonusSize(widthToRemove, minimalSize);
        },

        /**
         *
         * @returns {Number} the calculated size
         */
        ajust: function() {
          this.dimensionManager.updateGaps();
          //this.dimensionManager.setEmptyElementSize(this.node.getLayout().getInfo().getData().emptyColumnWidth);
          this.dimensionManager.updateIntrinsicSizes();
          return this.dimensionManager.getCalculatedSize();
        },

        getHintSize: function() {
          return this.dimensionManager.getHintSize(null, null, true, true);
        },

        getMaxSize: function() {
          return this.dimensionManager.getMaxSize(null, null, true, true);
        },
        getMinSize: function() {
          return this.dimensionManager.getMinSize(null, null, true, true);
        },

        getCalculatedSize: function() {
          return this.dimensionManager.getCalculatedSize();
        },
        /**
         *
         * @param {classes.GridDimensionSlot} slot
         */
        ajustAvailableMeasure: function(slot) {
          return this.dimensionManager.getCalculatedSize(slot.getPosition(), slot.getLastPosition(), false, false);
        },

        applyStyles: function(styleRules, prefix) {
          var rendering = this.dimensionManager.render();
          this.applyRegularStyles(rendering, styleRules, prefix);
        },
        applyRegularStyles: function(rendering, styleRules, prefix) {
          for (var regularIndex = 0; regularIndex < rendering.regularPositions.length; regularIndex++) {
            var position = rendering.regularPositions[regularIndex];
            var positionInfo = rendering.regular[position];
            styleRules[prefix + "x_" + position] = {
              // TODO : rtl support here
              left: Number.discrete(positionInfo.position) + "px !important"
            };
            styleRules[prefix + "x_" + position + ".g_gridChildrenInParent"] = {
              // TODO : rtl support here
              left: Number.discrete(positionInfo.position) + "px !important"
            };
            styleRules[prefix + "x_" + position + ".g_decoratingElement"] = {
              // TODO : rtl support here
              left: Number.discrete(positionInfo.position + positionInfo.beforeGap) + "px !important"
            };
            styleRules[prefix + "x_" + position + ".g_gridChildrenInParentChild"] = {
              // TODO : rtl support here
              left: Number.discrete(positionInfo.position + positionInfo.beforeGap) + "px !important"
            };
            for (var regularLengthIndex = 0; regularLengthIndex < positionInfo.regularLengths.length; regularLengthIndex++) {
              var length = positionInfo.regularLengths[regularLengthIndex];
              var size = positionInfo.lengths[length];
              styleRules[prefix + "w_" + position + "_" + length] = {
                width: Number.discrete(size) + "px !important"
              };
              styleRules[prefix + "w_" + position + "_" + length + ".g_gridChildrenInParent"] = {
                width: Number.discrete(positionInfo.lengthsWithGaps[length]) + "px !important"
              };
              styleRules[prefix + "w_" + position + "_" + length + ".g_decoratingElement"] = {
                width: Number.discrete(positionInfo.lengthsWithGaps[length]) + "px !important"
              };
              styleRules[prefix + "w_" + position + "_" + length + ".g_gridChildrenInParentChild"] = {
                width: Number.discrete(positionInfo.lengthsWithGaps[length]) + "px !important"
              };
            }
          }
        }
      });
  });
