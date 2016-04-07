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

modulum('StyleService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class gbc.StyleService
     */
    gbc.StyleService = context.oo.Singleton( /** @lends gbc.StyleService */ {
      /**
       * @type {string}
       */
      __name: "StyleService",

      /**
       * @type {Array}
       */
      _styleLibrary: {},

      _stylesLoadedEvent: "stylesLoaded",
      _eventListener: null,

      _pseudoSelectors: [
        "focus",
        "query",
        "display",
        "input",
        "even",
        "odd",
        "inactive",
        "active",
        "message",
        "error",
        "summaryLine"
      ],

      init: function() {
        this._eventListener = new cls.EventListener();
      },

      /**
       * Register the given style couple in the style library.
       * @param {classes.NodeBase} style the current 4st Style node specified in the AUI Tree
       */
      registerStyle: function(style) {

        var name = style.attribute("name");
        this._styleLibrary[name] = style;

        var styleAttributes = style.getChildren("StyleAttribute");
        this._styleLibrary[name].styleAttribute = {};
        for (var i = 0; i < styleAttributes.length; i++) {

          this._styleLibrary[name].styleAttribute[i] = styleAttributes[i];
        }
      },

      /**
       * Gather all useful style for the given node
       * @param {classes.NodeBase} node the node to style
       * @return {Array} all styling data to be applied to the specified node
       */
      getApplicableStyles: function(node) {
        var applicableStyles = {};

        if (node.attribute("style") !== undefined) {

          var styles4st = node.attribute("style").split(" ");
          var styleKeys = Object.keys(this._styleLibrary);
          var reExp = /(\w*)\.?(\w*)\:?(\w*)/i;

          for (var i = 0; i < styleKeys.length; i++) {
            var currentKey = styleKeys[i].toLowerCase();
            var matches = reExp.exec(currentKey);
            if (matches !== null) {
              if (matches[1] === node.getTag().toLowerCase() && matches[2].length === 0) {
                // adding widgetName:psuedoSelector & widgetName styles
                applicableStyles[styleKeys[i]] = this._styleLibrary[styleKeys[i]];
              }

              for (var j = 0; j < styles4st.length; j++) {
                if (matches[2] === styles4st[j].toLowerCase()) {
                  if (matches[1].length === 0 || matches[1] === node.getTag().toLowerCase()) {
                    // adding widgetName.styleName:pseudoSelector & .styleName:pseudoSelector & .styleName & widgetName.styleName styles
                    applicableStyles[styleKeys[i]] = this._styleLibrary[styleKeys[i]];
                  }
                }
              }

              for (var k = 0; k < this._pseudoSelectors.length; k++) {
                if (matches[3] === this._pseudoSelectors[k].toLowerCase() && matches[1].length === 0 && matches[2].length === 0) {
                  // adding :pseudoSelector styles
                  applicableStyles[styleKeys[i]] = this._styleLibrary[styleKeys[i]];
                }
              }
            }

            if (currentKey === "*") {
              applicableStyles[styleKeys[i]] = this._styleLibrary[styleKeys[i]];
            }
          }

          this.balanceStyles(applicableStyles);
        }
        return applicableStyles;
      },

      balanceStyles: function(styleMap) {
        var reExp = /(\w*)\.?(\w*)\:?(\w*)/i;
        var styleKeys = Object.keys(styleMap);

        for (var i = 0; i < styleKeys.length; i++) {
          var matches = reExp.exec(styleKeys[i]);
          if (matches !== null) {
            if (matches[1].length > 0 && matches[2].length > 0 && matches[3].length > 0) {
              // tagName.styleName:pseudoSelector
              styleMap[styleKeys[i]].weight = 1;
            }

            if (matches[1].length === 0 && matches[2].length > 0 && matches[3].length > 0) {
              // .styleName:pseudoSelector
              styleMap[styleKeys[i]].weight = 2;
            }

            if (matches[1].length > 0 && matches[2].length > 0 && matches[3].length === 0) {
              // tagName.styleName
              styleMap[styleKeys[i]].weight = 3;
            }

            if (matches[1].length > 0 && matches[2].length === 0 && matches[3].length > 0) {
              // tagName:pseudoSelector
              styleMap[styleKeys[i]].weight = 4;
            }

            if (matches[1].length === 0 && matches[2].length === 0 && matches[3].length > 0) {
              // :pseudoSelector
              styleMap[styleKeys[i]].weight = 5;
            }

            if (matches[1].length === 0 && matches[2].length > 0 && matches[3].length === 0) {
              // .styleName
              styleMap[styleKeys[i]].weight = 6;
            }

            if (matches[1].length > 0 && matches[2].length === 0 && matches[3].length === 0) {
              // tagName
              styleMap[styleKeys[i]].weight = 7;
            }
          } else if (styleKeys[i] === '*') {
            styleMap[styleKeys[i]].weight = 8;
          }
        }
      },

      getPseudoSelectors: function() {
        return this._pseudoSelectors;
      },

      /**
       * Compute all style inheritance and precedence rules against the given node for the asked property
       * @param {classes.NodeBase} node the node to style
       * @param {string} property the style property name to get the value for
       * @return {string} the property value
       */
      getApplicableStyle: function(node, property) {
        // same as getApplicableStyles
        // 9/ return the styling value of the asked property

        /*Example
        for "backgroundColor": "green"*/
      },

      onStylesLoaded: function(hook) {
        return this._eventListener.on(this._stylesLoadedEvent, hook);
      },

      stylesLoaded: function() {
        this._eventListener.emit(this._stylesLoadedEvent);
      }

    });
    gbc.InitService.register(gbc.StyleService);
  });
