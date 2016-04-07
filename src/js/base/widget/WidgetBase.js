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

modulum('WidgetBase', ['EventListener'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for widgets.
     * @class classes.WidgetBase
     * @extends classes.EventListener
     */
    cls.WidgetBase = context.oo.Class({
      base: cls.EventListener
    }, function($super) {
      /** @lends classes.WidgetBase.prototype */
      return {
        /** @lends classes.WidgetBase */
        $static: {
          selfDataContent: {}
        },
        __name: "WidgetBase",
        __templateName: null,
        __dataContentPlaceholderSelector: null,
        /**
         * Current widget's unique ID
         * @type {string}
         */
        _uuid: null,
        _auiTag: null,
        /**
         * @protected
         * @type Element
         */
        _element: null,
        /**
         * @protected
         * @type classes.WidgetBase
         */
        _parentWidget: null,

        /**
         * Current instance stylesheet
         * @type {Object}
         */
        _stylesheet: null,
        /**
         * @protected
         * @type {classes.LayoutEngineBase}
         */
        _layoutEngine: null,
        /**
         * @protected
         * @type {classes.LayoutInformation}
         */
        _layoutInformation: null,
        /**
         * @protected
         * @type classes.WidgetBase
         */
        _uiWidget: null,

        _i18NList: null,
        /**
         * @constructs {classes.WidgetBase}
         */
        constructor: function() {
          $super.constructor.call(this);
          this._uuid = context.InitService.uniqueId();
          this._initElement();
          this._initLayout();
          this._initTranslation();
          context.WidgetService._emit(context.WidgetService.widgetCreatedEvent, this);
        },

        /**
         * @protected
         */
        _initLayout: function() {
          this._layoutInformation = new cls.LayoutInformation(this);
          this._layoutEngine = null;
        },
        /**
         *
         * @returns {classes.LayoutInformation}
         */
        getLayoutInformation: function() {
          return this._layoutInformation;
        },
        /**
         *
         * @returns {classes.LayoutEngineBase}
         */
        getLayoutEngine: function() {
          return this._layoutEngine;
        },

        /**
         * Setups the DOM element
         * @private
         */
        _initElement: function() {
          this._element = context.TemplateService.renderDOM(this.__templateName || this.__name);
          this._element.addClass("gbc_" + this.__name)
            .addClass(this._getRootClassName())
            .addClass("gbc_WidgetBase");
          this._element.id = this._getRootClassName();
        },
        setFocusable: function(focusable) {
          this._element.setAttribute('tabindex', focusable ? 0 : null);
        },

        _initTranslation: function() {
          // Will ask the translation once ready
          this._i18NList = this._element.querySelectorAll("[data-i18n]");
          context.I18NService.translate(this);
        },

        translate: function() {
          var allSelectors = this._i18NList;
          for (var i = 0; i < allSelectors.length; i++) {
            allSelectors[i].innerHTML = i18n.t(allSelectors[i].getAttribute("data-i18n"));
          }
        },

        /**
         *
         * @returns {string}
         */
        getUniqueIdentifier: function() {
          return this._uuid;
        },
        /**
         * Get the root element of the widget
         * @returns {Element}
         */
        getElement: function() {
          return this._element;
        },

        /**
         * Helper to get the jQuery selector
         * if selector param is passed, this will look among itself or children
         * @param selector children to search
         * @returns {*|jQuery}
         */
        $: function(selector) {
          var element = $(this.getElement());
          if (selector) {
            element = this._element.hasClass(selector) ? element : element.find(selector);
          }
          return element;
        },

        getClassName: function() {
          return "gbc_" + this.__name;
        },

        getName: function() {
          return this.__name;
        },

        _setAuiTag: function(idRef) {
          this._auiTag = idRef;
          this._element.addClass("aui__" + idRef);
        },

        _getAuiTagClass: function() {
          return ".aui__" + this._auiTag;
        },

        /**
         * @returns {string} the unique class name identifying a widget instance
         * @protected
         */
        _getRootClassName: function() {
          return "w_" + this._uuid;
        },

        /**
         * @param {string=} subSelector selector targeting an element below the widget's root node
         * @param appliesOnRoot {boolean=} true if the returned selector should match the root too.
         * @returns {string} the CSS selector corresponding to the requested DOM element
         * @protected
         */
        _getCssSelector: function(subSelector, appliesOnRoot) {
          return "#" + this._getRootClassName() +
            (appliesOnRoot ? "" : " ") +
            (subSelector || "");
        },
        /**
         * Get widget style property value
         * @param {String} [selector] additional sub selector
         * @param {String} property property name
         * @returns {*} property value if set, undefined otherwise
         */
        getStyle: function(selector, property) {
          if (!property) {
            property = selector;
            selector = null;
          }
          var cssSelector = this._getCssSelector(selector);
          return this._stylesheet && this._stylesheet[cssSelector] && this._stylesheet[cssSelector][property];
        },

        /**
         * Updates widget style with new rules
         * @param {String|{selector:String, appliesOnRoot:boolean=}} [selector] additional sub selector
         * @param {Object.<string, *>} style style properties to set
         */
        setStyle: function(selector, style) {
          if (!style) {
            style = selector;
            selector = null;
          }
          var subSelector = selector,
            appliesOnRoot = null;
          if (!!selector && selector.selector) {
            subSelector = selector.selector;
            appliesOnRoot = selector.appliesOnRoot;
          }
          var cssSelector = this._getCssSelector(subSelector, appliesOnRoot);
          if (!this._stylesheet) {
            this._stylesheet = {};
          }
          if (!this._stylesheet[cssSelector]) {
            this._stylesheet[cssSelector] = {};
          }
          var keys = Object.keys(style);
          for (var k = 0; k < keys.length; k++) {
            this._stylesheet[cssSelector][keys[k]] = style[keys[k]];
          }
          styler.appendStyleSheet(this._stylesheet, this._getRootClassName());
        },

        /**
         * @param {classes.WidgetGroupBase} widget the widget ot use as parent
         */
        setParentWidget: function(widget) {
          this._parentWidget = widget;
        },

        /**
         * @returns {classes.WidgetGroupBase} the parent widget
         */
        getParentWidget: function() {
          return this._parentWidget;
        },
        /**
         *
         * @returns {classes.WidgetBase} UserInterfaceWidget
         */
        getUserInterfaceWidget: function() {
          if (this._uiWidget === null) {
            var result = this;
            while (result && result.__name !== "UserInterfaceWidget") {
              result = result.getParentWidget();
            }
            this._uiWidget = result;
          }
          return this._uiWidget;
        },
        replaceWith: function(widget) {
          if (this._parentWidget) {
            this._parentWidget.replaceChildWidget(this, widget);
          }
        },
        detach: function() {
          $(this._element).detach();
        },
        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          this._element.toggleClass("disabled", !enabled);
        },

        /**
         * @returns {boolean} true if the widget allows user interaction, false otherwise.
         */
        isEnabled: function() {
          return !this._element.hasClass("disabled");
        },

        /**
         * @param hidden {boolean} true if the widget is hidden, false otherwise
         */
        setHidden: function(hidden) {
          this._element.toggleClass("hidden", !!hidden);
        },

        /**
         * @returns {boolean} true if the widget is hidden, false otherwise
         */
        isHidden: function() {
          return this._element.hasClass("hidden");
        },

        isVisible: function() {
          return !this.isHidden();
        },
        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          if (title === "") {
            this._element.removeAttribute("title");
          } else {
            this._element.setAttribute("title", title);
          }
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._element.getAttribute("title");
        },
        /**
         * Called by FocusService when widget obtains VM focus
         */
        setFocus: function() {
          this.getUserInterfaceWidget().setFocusedWidget(this);
        },
        /**
         * Called before setFocus to notify previous focused widget
         */
        loseFocus: Function.noop,
        /**
         * true if widget node has VM focus
         * @returns {boolean}
         */
        hasFocus: function() {
          var ui = this.getUserInterfaceWidget();
          return ui && (this === ui.getFocusedWidget());
        },

        /**
         * Checks if tje element has the given class
         * @param className to check
         */
        hasClass: function(className) {
          return this._element.hasClass(className);
        },

        /**
         * Add the given class to element
         * @param className to add
         */
        addClass: function(className) {
          this._element.addClass(className);
        },

        /**
         * Remove the given class from element
         * @param className to delete
         */
        removeClass: function(className) {
          this._element.removeClass(className);
        },

        /**
         * Set the value to be displayed as defined
         * @param format
         */
        setDisplayFormat: function(format) {
          if (this.getValue && this.setValue) {
            var varDisplay = null;
            var varType = null;
            var value = this.getValue();
            if (format) {
              varType = format.toLowerCase();
              var pattern = /(\w+)(\((.*)\))?/;
              var match = varType.match(pattern);
              varType = match[1];
              varDisplay = match[2];

              switch (varType) {
                case "decimal":
                  if (varDisplay) {
                    var decimalPattern = /(\d+),(\d+)/;
                    var matchDecimal = varDisplay.match(decimalPattern);
                    var decimal = matchDecimal[2];
                    this.setValue(parseFloat(value).toFixed(decimal));
                  }
                  break;
              }
            }
          }
        },

        setQAInfo: function(name, value) {
          if (!!this._element) {
            var attributeName = "data-gqa-" + name;
            if (typeof(value) === "undefined" || value === "") {
              this._element.removeAttribute(attributeName);
            } else {
              this._element.setAttribute(attributeName, value);
            }
          }
        },
        destroy: function() {
          context.WidgetService._emit(context.WidgetService.widgetDestroyEvent, this);
          if (this._layoutEngine) {
            this._layoutEngine.destroy();
            this._layoutEngine = null;
          }
          if (this._parentWidget && this._parentWidget.removeChildWidget) {
            this._parentWidget.removeChildWidget(this);
          }
          if (this._layoutInformation) {
            this._layoutInformation.destroy();
            this._layoutInformation = null;
          }
          if (this._element) {
            this._element.remove();
          }
          this._element = null;
          $super.destroy.call(this);
        }

      };
    });
  });
