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

(
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    var _cache = {};

    var getCacheFor = function(fontFamily, fontSize) {
      _cache[fontFamily] = _cache[fontFamily] || {};
      return (_cache[fontFamily][fontSize] = _cache[fontFamily][fontSize] || {
        width: [],
        height: null
      });
    };

    var measureElement = document.createElement("div");
    measureElement.classList.add("measureTool");
    document.body.appendChild(measureElement);

    var measurementHost = document.createElement("div");
    measurementHost.classList.add("measurementHost");
    document.body.appendChild(measurementHost);

    var measureWidth = function(fontFamily, fontSize, size) {
      var cache = getCacheFor(fontFamily, fontSize);
      if (Object.isNumber(cache.width[size])) {
        return cache.width[size];
      } else {
        measureElement.style.fontFamily = fontFamily;
        measureElement.style.fontSize = fontSize;
        measureElement.textContent = "M".repeat(Math.min(6, size)) + "0".repeat(Math.max(6, size) - 6);
        // TODO : look further for this add
        // add 7 pixels: to match the width needed for an input with just a 'W' character
        return (cache.width[size] = (measureElement.getBoundingClientRect().width + 7));
      }
    };

    var measureHeight = function(fontFamily, fontSize, size) {
      var cache = getCacheFor(fontFamily, fontSize);
      if (Object.isNumber(cache.height)) {
        return cache.height;
      } else {
        measureElement.style.fontFamily = fontFamily;
        measureElement.style.fontSize = fontSize;
        measureElement.textContent = "X";
        // TODO : look further for this add
        // add 4 pixels: to match the height needed for an input with borders and paddings
        return (cache.height = (Math.max(20, measureElement.getBoundingClientRect().height * size + 4)));
      }
    };

    /**
     * Tool for rendered size measurement
     * Caches measurements for perfs.
     * @class classes.Measurement
     */
    cls.Measurement = context.oo.Singleton(function() {
      /** @lends classes.Measurement */
      return {
        __name: "Measurement",
        /**
         *
         * @param Element element
         */
        fontInfo: function(element) {
          var style = window.getComputedStyle(element);
          return {
            "font-family": style.fontFamily,
            "font-size": style.fontSize,
            "font-weight": style.fontWeight
          };
        },
        measuredWidth: function(fontFamily, fontSize, size) {
          return measureWidth(fontFamily, fontSize, size);
        },
        measuredHeight: function(fontFamily, fontSize, size) {
          return measureHeight(fontFamily, fontSize, size);
        },

        /**
         *
         * @param {classes.Node} node
         * @returns {classes.Measure}
         */
        getNodeWidthMeasure: function(node) {
          if (node) {
            var measure = node.attributes.width || node.attributes.gridWidth;
            return new cls.Measure(measure);
          } else {
            return cls.Measure.none();
          }
        },
        /**
         *
         * @param {classes.Node} node
         * @returns {classes.Measure}
         */
        getNodeHeightMeasure: function(node) {
          if (node) {
            var measure = node.attributes.height || node.attributes.gridHeight;
            return new cls.Measure(measure);
          } else {
            return cls.Measure.none();
          }
        },
        /**
         *
         * @param {classes.Node} node
         * @param {classes.Measure} measure
         * @returns {boolean}
         */
        updateNodeWidthMeasure: function(node, measure) {
          return measure.update(node.attributes.width || node.attributes.gridWidth);
        },
        /**
         *
         * @param {classes.Node} node
         * @param {classes.Measure} measure
         * @returns {boolean}
         */
        updateNodeHeightMeasure: function(node, measure) {
          return measure.update(node.attributes.height || node.attributes.gridHeight);
        },
        getMeasurementHost: function() {
          return measurementHost;
        },
        /**
         *
         * @param {HTMLElement} domElement
         */
        getSize: function(domElement) {
          if (!!domElement) {
            var raw = domElement.getBoundingClientRect();
            return new cls.LayoutSize({
              width: raw.width,
              height: raw.height
            });
          } else {
            return new cls.LayoutSize();
          }
        },
        getTextSample: function(width, height) {
          return "M".repeat(Math.min(6, width)) +
            "0".repeat(Math.max(0, (width - 6))) +
            "<br/>M".repeat(Math.max(height - 1, 0));
        }
      };
    });
  })(gbc, gbc.classes);
