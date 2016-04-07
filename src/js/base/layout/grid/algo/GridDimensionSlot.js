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

modulum('GridDimensionSlot', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     *
     * @class classes.GridDimensionSlot
     */
    cls.GridDimensionSlot = context.oo.Class(function() {
      /** @lends classes.GridDimensionSlot.prototype */
      return {
        __name: "GridDimensionSlot",
        defaultMinimalBeforeGap: 0,
        defaultMinimalAfterGap: 3,

        /**
         * starting position of the slot
         * @type {Number}
         */
        position: 0,
        /**
         * slot size
         * @type {Number}
         */
        size: 0,
        /**
         * Desired slot size (calculated in pixels from raw width/height hint)
         */
        desiredMinimalSize: 0,
        minSize: 0,
        maxSize: 0,
        hintSize: 0,
        /**
         * @type {classes.GridDimensionManager}
         */
        dimensionManager: null,
        minimalBeforeGap: 0,
        minimalAfterGap: 3,
        extraBeforeGap: 0,
        extraAfterGap: 0,
        stretchable: false,
        displayed: true,
        containerSlot: null,
        /**
         *
         * @param {Number} position
         * @param {Number} size
         */
        constructor: function(position, size) {
          this.position = position;
          this.size = size;
        },
        reset: function(position, size) {
          this.position = position;
          this.size = size;
          //this.extraBeforeGap = this.extraAfterGap = 0;
          return this;
        },
        getPosition: function() {
          return this.position;
        },
        getLastPosition: function() {
          return this.position + this.size - 1;
        },
        getSize: function() {
          return this.size;
        },
        /**
         *
         * @param {Number} desiredMinimalSize calculated in pixels from raw width/height hint
         */
        setDesiredMinimalSize: function(desiredMinimalSize) {
          this.desiredMinimalSize = desiredMinimalSize || 0;
        },
        setMaxSize: function(maxSize) {
          this.maxSize = maxSize;
        },
        setMinSize: function(minSize) {
          this.minSize = minSize;
        },
        setHintSize: function(hintSize) {
          this.hintSize = hintSize;
        },
        setDisplayed: function(displayed) {
          this.displayed = displayed;
        },
        setMinimumBeforeGap: function(value) {
          if (Object.isNumber(value)) {
            this.minimalBeforeGap = value;
          } else {
            this.minimalBeforeGap = this.defaultMinimalBeforeGap;
          }
        },
        setMinimumAfterGap: function(value) {
          if (Object.isNumber(value)) {
            this.minimalAfterGap = value;
          } else {
            this.minimalAfterGap = this.defaultMinimalAfterGap;
          }
        },
        /**
         *
         * @param {classes.GridDimensionManager} dimensionManager
         */
        attach: function(dimensionManager) {
          this.dimensionManager = dimensionManager;
        },
        detach: function() {
          this.dimensionManager = null;
        },
        destroy: function() {
          this.dimensionManager = null;
          this.containerSlot = null;
        }
      };
    });
  });
