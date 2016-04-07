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

modulum('GridLayoutEngineY', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.GridLayoutEngineY
     */
    cls.GridLayoutEngineY = context.oo.Class(
      /** @lends classes.GridLayoutEngineY.prototype */
      {
        __name: "GridLayoutEngineY",
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
          this.dimensionManager.removeSlot(slot);
        },

        setStretchable: function(stretchable) {
          this.dimensionManager.setStretchable(stretchable);
        },
        /**
         *
         * @param {Number} heightToDistribute
         * @returns {boolean}
         */
        doStretch: function(heightToDistribute) {
          return this.dimensionManager.updateBonusSize(heightToDistribute);
        },

        /**
         *
         * @param {Number} heightToRemove
         * @returns {boolean}
         */
        doShrink: function(heightToRemove) {
          return this.dimensionManager.updateBonusSize(heightToRemove);
        },

        /**
         *
         * @returns {Number} the calculated size
         */
        ajust: function() {
          this.dimensionManager.updateGaps();
          //this.dimensionManager.setEmptyElementSize(this.node.getLayout().getInfo().getData().emptyRowHeight);
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
          return this.dimensionManager.getCalculatedSize(slot.getPosition(), slot.getLastPosition());
        },

        applyStyles: function(styleRules, prefix) {
          var rendering = this.dimensionManager.render();
          this.applyRegularStyles(rendering, styleRules, prefix);
          this.applyHostedStyles(rendering, styleRules, prefix);
        },
        applyRegularStyles: function(rendering, styleRules, prefix) {
          for (var regularIndex = 0; regularIndex < rendering.regularPositions.length; regularIndex++) {
            var position = rendering.regularPositions[regularIndex];
            var positionInfo = rendering.regular[position];
            styleRules[prefix + "y_" + position] = {
              top: Number.discrete(positionInfo.position) + "px !important"
            };
            styleRules[prefix + "y_" + position + ".g_gridChildrenInParent"] = {
              top: Number.discrete(positionInfo.position) + "px !important"
            };
            styleRules[prefix + "y_" + position + ".g_decoratingElement"] = {
              top: Number.discrete(positionInfo.position) + "px !important"
            };
            styleRules[prefix + "y_" + position + ".g_gridChildrenInParentChild"] = {
              top: Number.discrete(positionInfo.position + positionInfo.beforeGap) + "px !important"
            };
            for (var regularLengthIndex = 0; regularLengthIndex < positionInfo.regularLengths.length; regularLengthIndex++) {
              var length = positionInfo.regularLengths[regularLengthIndex];
              var size = positionInfo.lengths[length];
              styleRules[prefix + "h_" + position + "_" + length] = {
                height: Number.discrete(size) + "px !important"
              };
              styleRules[prefix + "h_" + position + "_" + length + ".g_gridChildrenInParent"] = {
                height: Number.discrete(positionInfo.lengthsWithGaps[length]) + "px !important"
              };
              styleRules[prefix + "h_" + position + "_" + length + ".g_decoratingElement"] = {
                height: Number.discrete(positionInfo.lengthsWithGaps[length]) + "px !important"
              };
              styleRules[prefix + "h_" + position + "_" + length + ".g_gridChildrenInParentChild"] = {
                height: Number.discrete(positionInfo.lengthsWithGaps[length]) + "px !important"
              };
            }
          }
        },
        applyHostedStyles: function(rendering, styleRules, prefix) {
          for (var hostedIndex = 0; hostedIndex < rendering.hostSlots.length; hostedIndex++) {
            var containerSlotId = rendering.hostSlots[hostedIndex];
            var slotInfo = rendering.hostedBySlot[containerSlotId];
            for (var absolutePositionIndex = 0; absolutePositionIndex < slotInfo.absolutePositions.length; absolutePositionIndex++) {
              var absolutePosition = slotInfo.absolutePositions[absolutePositionIndex];
              var positionInfo = slotInfo.absolutes[absolutePosition];
              styleRules[prefix + "through_" + containerSlotId + "_y_" + absolutePosition] = {
                top: Number.discrete(positionInfo.position) + "px !important"
              };
              for (var hostedLengthIndex = 0; hostedLengthIndex < positionInfo.hostedLengths.length; hostedLengthIndex++) {
                var length = positionInfo.hostedLengths[hostedLengthIndex];
                var size = positionInfo.lengths[length];
                styleRules[prefix + "h_" + absolutePosition + "_" + length] = {
                  height: Number.discrete(size) + "px !important"
                };
              }
            }
          }
        },
        viewDebug: function(visible, node) {
          if ((!visible && node.getController()) || !node.getController()) {
            $(".debug_grid_line_h").remove();
          } else {
            var changer = true;
            var xinfo = 0;
            var emptyRowHeight = this.node.getLayout().getInfo().getData().emptyRowHeight || 0;
            var rowKeys = Object.keys(this.rowInfo);
            for (var i = 0; i < rowKeys.length; i++) {
              var x = rowKeys[i];
              var value = this.rowInfo[x];
              node.getController().getElement().find(".debug_grid").append(
                $("<div/>").addClass("debug_grid_line_h dg_h " + (value.stretch ? "dg_hg" : "") + (changer ? " dg_alternate" : ""))
                .addClass("debug_grid_line_h_" + x)
                .css("top", xinfo)
                .css("height", (value.fitSize || value.minSize || emptyRowHeight) + "px"));
              xinfo += (value.fitSize || value.minSize || emptyRowHeight) + value.spacer;
              changer = !changer;
            }
          }
        }
      });
  });
