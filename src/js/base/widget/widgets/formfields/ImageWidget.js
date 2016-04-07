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

modulum('ImageWidget', ['ColoredWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Image widget.
     * @class classes.ImageWidget
     * @extends classes.ColoredWidgetBase
     */
    cls.ImageWidget = context.oo.Class(cls.ColoredWidgetBase, function($super) {
      /** @lends classes.ImageWidget.prototype */
      return {
        __name: "ImageWidget",
        /**
         * @type {string}
         */
        _src: null,
        _defaultColor: null,
        _autoScale: null,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);

          //proxy click event
          this._element.on('click.ImageWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
            this.emit(context.constants.widgetEvents.click, event);
          }.bind(this));
        },

        /**
         * ShortCut for setSrc
         * This is used in the context of an Image FormField
         * @param {string} val the URL of the image to display or a font-image URL: font:[fontname]:[character]:[color]
          @see setSrc
         */
        setValue: function(val) {
          this.setSrc(val);
        },

        /**
         * Shortcut for getSrc
         * This is used in the context of an Image FormField
         * @returns {string} the URL of the displayed image or a font-image URL: font:[fontname]:[character]:[color]
         * @see getSrc
         */
        getValue: function() {
          return this.getSrc();
        },

        /**
         * ShortCut for setSrc
         * This is used in the context of a Static Image
         * @param {string} image the URL of the image to display or a font-image URL: font:[fontname]:[character]:[color]
         * @see setSrc
         */
        setImage: function(image) {
          this.setSrc(image);
        },

        /**
         * Shortcut for getSrc
         * This is used in the context of a Static FormField
         * @returns {string} the URL of the displayed image or a font-image URL: font:[fontname]:[character]:[color]
         * @see getSrc
         */
        getImage: function() {
          return this.getSrc();
        },

        /**
         * @param {string} src the URL of the image to display or a font-image URL: font:[fontname]:[character]:[color]
         */
        setSrc: function(src) {
          this.getLayoutInformation().invalidateMeasure();
          if (src !== this._src) {
            this._src = src;
            this._updateImage();
          }
        },

        /**
         * @returns {string} the URL of the displayed image or a font-image URL: font:[fontname]:[character]:[color]
         */
        getSrc: function() {
          return this._src;
        },

        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          $super.setTitle.call(this, title);
          this._element.setAttribute("alt", title);
        },

        /**
         * Forces the image to be stretched to fit in the area reserved for the image.
         * @param {Boolean} setted true : autoScale , false: default
         */
        setAutoScale: function(setted) {
          if (setted !== this._autoScale) {
            this._autoScale = setted;
            this._updateImage();
          }
        },

        setDefaultColor: function(color) {
          this._defaultColor = color;
        },

        setFocus: function() {
          this._element.domFocus();
        },

        setAlignment: function(x, y) {
          var element = $(this._element);
          var pos = {
            position: "absolute"
          };
          if (x) {
            if (x !== "horizontalCenter") {
              pos[x] = 0;
            } else {
              pos.left = "50%";
              pos["margin-left"] = (-element.width() / 2) + "px";
            }
          }
          if (y) {
            if (y !== "verticalCenter") {
              pos[y] = 0;
            } else {
              pos.top = "50%";
              pos["margin-top"] = (-element.height() / 2) + "px";
            }
          }
          //element.css(pos);
          this.setStyle(pos);
        },

        _updateImage: function() {
          if (this._src) {
            this._element.innerHTML = "";
            var backgroundImage = null;
            var backgroundSize = null;
            var backgroundRepeat = null;
            var backgroundPosition = null;
            var width = null;
            var height = null;

            if (this._src.startsWith("font:")) {
              var pattern = /font:([^:]+).ttf:([^:]+):?([^:]*)/;
              var fontName = this._src.match(pattern)[1];
              var character = this._src.match(pattern)[2];
              var color = this._src.match(pattern)[3] || this._defaultColor;

              if (!!fontName && !!character) {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", '0 0 100 100');
                var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("text-anchor", 'middle');
                // EDGE & IE doesn't support dominant-baseline central attribute, so we need to center using another way
                if (window.browserInfo.isEdge || window.browserInfo.isIE) {
                  text.setAttribute("dy", '0.7ex');
                } else {
                  text.setAttribute("dominant-baseline", 'central');
                }
                text.setAttribute("x", '50');
                text.setAttribute("y", '50');
                text.setAttribute("font-size", '100');
                text.setAttribute("font-family", "image2font_" + fontName);
                text.textContent = String.fromCharCode("0x" + character);
                if (!!color) {
                  text.setAttribute("fill", color);
                }
                svg.appendChild(text);
                this._element.appendChild(svg);
                this.emit(context.constants.widgetEvents.ready);
              }
              this.getElement().toggleClass("gbc_fixedSvg", !this._autoScale);
            } else {
              if (this._autoScale) {
                backgroundImage = "url(" + this._src + ")";
                backgroundSize = "contain";
                backgroundRepeat = "no-repeat";
                backgroundPosition = "center";
                width = "100%";
                height = "100%";
                this.emit(context.constants.widgetEvents.ready);
              } else {
                var img = document.createElement("img");
                img.setAttribute("src", this._src);
                img.on("load.ImageWidget", function() {
                  this.emit(context.constants.widgetEvents.ready);
                }.bind(this));
                this._element.appendChild(img);
              }
            }
            this._element.toggleClass("gbc_autoScale", this._autoScale);
            this.setStyle({
              "background-image": backgroundImage,
              "background-size": backgroundSize,
              "background-repeat": backgroundRepeat,
              "background-position": backgroundPosition,
              "width": width,
              "height": height
            });
          }
        }
      };
    });
    cls.WidgetFactory.register('Image', cls.ImageWidget);
  });
