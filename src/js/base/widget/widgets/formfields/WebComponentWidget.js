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

modulum('WebComponentWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Button widget.
     * @class classes.Webcomponent
     * @extends classes.TextWidgetBase
     */
    cls.WebComponentWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.Webcomponent.prototype */
      return {
        $static: {
          gICAPIVersion: "1.0",
          focusEvent: context.constants.widgetEvents.focus,
          dataEvent: "wc_data",
          actionEvent: "wc_action",
          ready: "wc_ready"
        },

        __name: "WebComponentWidget",
        __dataContentPlaceholderSelector: cls.WidgetBase.selfDataContent,
        _webComponentType: null,
        _webComponentWindow: null,
        _webComponentProxy: null,

        _isReady: false,
        _value: null,

        /**
         * @type Element
         */
        _iframeElement: null,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
          this._layoutInformation.forcedMinimalWidth = 20;
          this._layoutInformation.forcedMinimalHeight = 20;

        },

        _initElement: function() {
          $super._initElement.call(this);
          // TODO Init loader spinner
          this._iframeElement = this._element.getElementsByTagName('iframe')[0];
          this._iframeElement.on('load.WebComponentWidget', function() {
            if (this.getUrl()) {
              if (this._webComponentType === "api") {
                this._injectApi();
              }
              this._onReady();
            }
          }.bind(this));
        },

        destroy: function() {
          this._iframeElement.off('load.WebComponentWidget');
          this._iframeElement = null;
          $super.destroy.call(this);
        },
        /**
         * Defines the address of the webComponent
         * @param url {String} address
         */
        setUrl: function(url) {
          this._iframeElement.setAttribute("src", url);
        },

        /**
         * @returns {String} address of the webcomponent
         */
        getUrl: function() {
          return this._iframeElement.getAttribute("src");
        },

        _toICAPI: function(verb, args) {
          try {
            var arg = args;
            if (!arg) {
              arg = [];
            }
            if (arg.prototype !== Array) {
              arg = [arg];
            }
            if (this._webComponentWindow && this._webComponentWindow.gICAPI && this._webComponentWindow.gICAPI[verb]) {
              this._webComponentWindow.gICAPI[verb].apply(this._webComponentWindow.gICAPI, arg);
            }
          } catch (e) {
            context.error("Web Component threw an error : " + e.toString(), e);
          }
        },

        /**
         * Set the value of the webComponent
         * @param value
         */
        setValue: function(value) {
          this._value = value;
          if (this._webComponentType === "url") {
            this.setUrl(value);
          } else {
            if (this._isReady) {
              this._toICAPI("onData", this._value);
            } else {
              this.on(cls.WebComponentWidget.ready, function() {
                this._toICAPI("onData", this._value);
              }.bind(this));
            }
          }
        },

        setFocus: function() {
          $super.setFocus.call(this);
          if (this._isReady) {
            this._toICAPI("onFocus", true);
          } else {
            this.on(cls.WebComponentWidget.ready, function() {
              this._toICAPI("onFocus", true);
            });
          }

        },

        loseFocus: function() {
          $super.loseFocus();
          if (this._isReady) {
            this._toICAPI("onFocus", false);
          } else {
            this.on(cls.WebComponentWidget.ready, function() {
              this._toICAPI("onFocus", false);
            });
          }
        },

        /**
         * Get The value of the webComponent
         * @returns {String} value or url of the webcomponent
         */
        getValue: function() {
          return this._webComponentType === "api" ? this._value : this.getUrl();
        },

        setSrollBars: function(horizontal, vertical) {
          this.setStyle({
            "overflow-x": horizontal ? "sroll" : "hidden",
            "overflow-y": vertical ? "sroll" : "hidden"
          });
        },

        _setProperty: function(property) {
          var pty = property;
          if (this._isReady) {
            this._toICAPI("onProperty", pty);
          } else {
            this.on(cls.WebComponentWidget.ready, function() {
              this._toICAPI("onProperty", pty);
            });
          }
        },

        /**
         * Define the type of component
         * @param {String} type should be api or url
         */
        setWebComponentType: function(type) {
          this._webComponentType = type;
        },

        /**
         * Inject the API on the webcomponent
         * @returns {boolean} false if not applicable
         * @private
         */
        _injectApi: function() {
          //Add a new proxy for this webcomponent
          context.WebComponentProxyService.setProxy(this.getUniqueIdentifier());
          this._webComponentProxy = context.WebComponentProxyService.getProxy(this.getUniqueIdentifier());

          //Get the content of the ifram window to put api on
          this._webComponentWindow = this._iframeElement.contentWindow;
          this._webComponentWindow.gICAPIVersion = cls.WebComponentWidget.gICAPIVersion;
          // Bind WebComponent API to the iframe
          this._webComponentWindow.gICAPI = this._gICAPI();
          // Tell the WebComponent that host is ready
          if (this._webComponentWindow.onICHostReady) {
            this._webComponentWindow.onICHostReady(1.0);
          } else {
            console.error("onICHostReady no present in webcomponent, cannot continue!");
            return false;
          }
          this.emit(cls.WebComponentWidget.ready);
        },

        /**
         * When the iframe is loaded
         * @private
         */
        _onReady: function() {
          //TODO remove loader image
          this._isReady = true;
          this.emit(context.constants.widgetEvents.ready);
        },

        /**
         * Api to bind to the webcomponent window
         * */
        _gICAPI: function() {
          return {
            SetFocus: function() {
              // Generates a focus change request. The focus is entirely managed by the runtime system
              this._webComponentProxy.setFocus(this); //._webComponentWindow.frameElement.parentElement.id);
            }.bind(this),
            SetData: function(dataStr) {
              this._webComponentProxy.setData(this, dataStr);
            }.bind(this),
            Action: function(actionName) {
              this._webComponentProxy.action(this, actionName);
            }.bind(this),
            version: "1.0"
          };
        }
      };
    });
    cls.WidgetFactory.register('WebComponent', cls.WebComponentWidget);
  });
