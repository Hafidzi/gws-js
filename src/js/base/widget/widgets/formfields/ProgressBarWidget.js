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

modulum('ProgressBarWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Progressbar widget.
     * @class classes.ProgressBarWidget
     * @extends classes.TextWidgetBase
     */
    cls.ProgressBarWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.ProgressBarWidget.prototype */
      return {
        __name: "ProgressBarWidget",
        /**
         * @type {string}
         */
        _progressSelector: ">div>div",
        _progressElement: null,
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,

        /**
         * @type {number}
         */
        _value: 0,
        _valueMin: 0,
        _valueMax: 100,

        constructor: function() {
          $super.constructor.call(this);
          this._progressElement = this._element.querySelector("div>div");
        },

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutInformation.getSizePolicyConfig().initial = cls.SizePolicy.Fixed();
          this._layoutInformation.getSizePolicyConfig().dynamic = cls.SizePolicy.Fixed();
          // this._layoutInformation.forcedMinimalWidth = 80;
          this._layoutInformation.forcedMinimalHeight = 20;
        },

        /**
         * @inheritDoc
         */
        setBackgroundColor: function(color) {
          this.setStyle(this._progressSelector, {
            "background-color": !!color ? color + " !important" : null
          });
        },

        /**
         * @inheritDoc
         */
        getBackgroundColor: function() {
          return this.getStyle(this._progressSelector, "background-color");
        },

        /**
         * @returns {number} the progressbar value
         */
        getValue: function() {
          return this._value;
        },

        /**
         * @param {number} value the new progressbar value
         */
        setValue: function(value) {
          this._value = Object.isNumber(value) ?
            (value > this._valueMax ? this._valueMax : value < this._valueMin ? this._valueMin : value) : this._valueMin;
          window.requestAnimationFrame(function() {
            this.setStyle(this._progressSelector, {
              "width": "" + ((this._value - this._valueMin) / (this._valueMax - this._valueMin) * 100) + "% !important"
            });
          }.bind(this));
        },

        /**
         * @param {boolean} running true starts the animation for an unknown progress progressbar, false stops it.
         */
        setRunning: function(running) {
          this._element.toggleClass("running", !!running);
        },

        /**
         * @returns {boolean} true if the animation is running for an unknown progress progressbar, false otherwise.
         */
        isRunning: function() {
          return this._element.hasClass("running");
        },

        /**
         * @param {boolean} unknown true to switch to the unknown progress mode, false otherwise
         */
        setProgressUnknown: function(unknown) {
          this._progressElement.toggleClass("mt-progress-level-unknown", !!unknown);
          if (!!unknown) {
            this.setStyle(this._progressSelector, {
              "width": "0% !important"
            });
          }
        },

        /**
         * @returns {boolean} true if the progressbar is in unknown progress mode, false otherwise
         */
        isProgressUnknown: function() {
          return this._progressElement.hasClass("mt-progress-level-unknown");
        },

        /**
         * @param {Number} minimum value the progressBar can handle
         */
        setMin: function(valueMin) {
          this._valueMin = parseInt(valueMin);
        },

        /**
         * @return {Number} minimum value the progressBar can handle
         */
        getMin: function() {
          return this._valueMin;
        },

        /**
         * @param {Number} maximum value the progressBar can handle
         */
        setMax: function(valueMax) {
          this._valueMax = parseInt(valueMax);
        },

        /**
         * @param {Number} maximum value the progressBar can handle
         */
        getMax: function() {
          return this._valueMax;
        },

        setFocus: function() {
          this._element.domFocus();
        }
      };
    });
    cls.WidgetFactory.register('ProgressBar', cls.ProgressBarWidget);
  });
