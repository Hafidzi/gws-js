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

modulum('GridDimensionManager', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     *
     * @class classes.GridDimensionElement
     */
    cls.GridDimensionElement = context.oo.Class(function() {
      /** @lends classes.GridDimensionElement.prototype */
      return {
        __name: "GridDimensionElement",
        /**
         * @type {Number}
         */
        position: 0,
        /**
         * Minimal mandatory size (without gaps) of this dimensionElement
         * @type {Number}
         */
        intrinsicSize: 0,
        hintSize: 0,
        maxSize: 0,
        minSize: 0,
        /**
         * Minimal size of gap before this dimensionElement
         * @type {Number}
         */
        minimalBeforeGap: 0,
        /**
         * Minimal size of gap after this dimensionElement
         * @type {Number}
         */
        minimalAfterGap: 0,
        /**
         * Size amount that is eventually added to the intrinsicSize
         * @type {Number}
         */
        bonusSize: 0,
        /**
         * Actual size of gap before this dimensionElement
         * @type {Number}
         */
        beforeGap: 0,
        /**
         * Actual size of gap after this dimensionElement
         * @type {Number}
         */
        afterGap: 0,
        /**
         * list of slots that starts on this dimensionElement
         * @type {classes.GridDimensionSlot[]}
         */
        slots: null,
        extraBeforeGap: 0,
        extraAfterGap: 0,
        stretchable: false,
        constructor: function(position) {
          this.position = position;
          this.slots = [];
        },
        /**
         *
         * @param {boolean} [swipeGaps]
         * @param {boolean} [resetIntrinsicSize]
         */
        resetSize: function(swipeGaps, resetIntrinsicSize) {
          this.bonusSize = 0;
          if (resetIntrinsicSize) {
            this.intrinsicSize = 0;
            this.hintSize = 0;
            this.maxSize = 0;
            this.minSize = 0;
          }
          if (!!swipeGaps) {
            this.resetGaps();
            this.updateGaps();
          }
        },
        resetGaps: function() {
          this.beforeGap = 0;
          this.minimalBeforeGap = 0;
          this.afterGap = 0;
          this.minimalAfterGap = 0;
        },
        shouldRender: function() {
          for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].displayed) {
              return true;
            }
          }
          return false;
        },
        getBeforeGap: function() {
          return this.shouldRender() ? this.beforeGap + this.extraBeforeGap : 0;
        },
        getAfterGap: function() {
          return this.shouldRender() ? this.afterGap + this.extraAfterGap : 0;
        },
        /**
         *
         * @param {boolean} [withBeforeGap]
         * @param {boolean} [withAfterGap]
         */
        getSize: function(withBeforeGap, withAfterGap) {
          return this.intrinsicSize + this.bonusSize + (!!withBeforeGap ? this.beforeGap + this.extraBeforeGap : 0) + (!!
            withAfterGap ? this.afterGap + this.extraAfterGap : 0);
        },
        /**
         *
         * @param {classes.GridDimensionSlot} slot
         */
        attach: function(slot) {
          var insertIndex = 0,
            size = this.slots.length;
          for (; insertIndex < size && this.slots[insertIndex].getSize() < slot.getSize();) {
            insertIndex++;
          }
          this.slots.add(slot, insertIndex);
          this.updateGaps();
        },
        /**
         *
         * @param {classes.GridDimensionSlot} slot
         */
        detach: function(slot) {
          this.slots.remove(slot);
          this.updateGaps();
        },

        updateGaps: function() {
          this.resetGaps();
          this.extraBeforeGap = 0;
          this.extraAfterGap = 0;
          for (var i = 0; i < this.slots.length; i++) {
            var slot = this.slots[i];
            if (slot.displayed && slot.getPosition() === this.position) {
              this.extraBeforeGap = Math.max(this.extraBeforeGap, slot.extraBeforeGap);
              this.beforeGap = this.minimalBeforeGap = Math.max(this.minimalBeforeGap, slot.minimalBeforeGap);
            }
            if (slot.displayed && slot.getLastPosition() === this.position) {
              this.extraAfterGap = Math.max(this.extraAfterGap, slot.extraAfterGap);
              this.afterGap = this.minimalAfterGap = Math.max(this.minimalAfterGap, slot.minimalAfterGap);
            }
          }
        },

        ajustIntrinsicSize: function(size) {
          this.intrinsicSize = Math.max(this.intrinsicSize, size);
        },
        ajustHintSize: function(size) {
          this.hintSize = Math.max(this.hintSize, size);
        },
        ajustMaxSize: function(size) {
          if (this.maxSize !== cls.Size.undef) {
            this.maxSize = size === cls.Size.undef ? cls.Size.undef : Math.min(this.maxSize, size);
          }
        },
        ajustMinSize: function(size) {
          if (size !== cls.Size.undef) {
            this.minSize = Math.max(this.minSize, size);
          }
        },
        destroy: function() {
          this.slots.length = 0;
        }
      };
    });
  });
