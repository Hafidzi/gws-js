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

/**
 * styler
 * ===============
 *
 * provides methods to work with styles
 * @class styler
 * @static
 * @memberOf libextensions
 */

(
  /**
   * @param {Window} context
   */
  function(context) {
    var _internal = {
      debug: false,
      styleSheetNamePrefix: "dyncss__",
      _buffered: false,

      createDOM: function(id, contents) {
        if (contents) {
          var cssContent = "<!--\n" + contents + "\n-->",
            styleSheetName = this.styleSheetNamePrefix + id;

          var sheet = document.createElement("style");
          sheet.addClass(styleSheetName);
          this.setCssContents(sheet, cssContent);
          return sheet;
        }
        return null;
      },
      appendDOM: function(sheet) {
        document.head.appendChild(sheet);
      },
      findDOM: function(s) {
        if (s instanceof String) {
          s = document.head.querySelector("." + s);
        }
        if (!(s instanceof Element)) {
          return null;
        }
        return s;
      },
      setCssContents: function(styleSheet, cssContent) {
        if (!!styleSheet) {
          if (styleSheet.styleSheet) {
            styleSheet.styleSheet.cssText = cssContent;
          } else {
            styleSheet.appendChild(document.createTextNode(cssContent));
          }
        }
      },
      contentFromRules: function(styles) {
        if (styles) {
          var builder = [];
          var keys = Object.keys(styles);
          for (var ruleIndex = 0; ruleIndex < keys.length; ruleIndex++) {
            var rule = keys[ruleIndex],
              ruleStyles = styles[rule];
            var items = Object.keys(ruleStyles);
            if (!!items.length) {
              var place = builder.length;
              var added = 0;
              for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!!ruleStyles[item] || ruleStyles[item] === 0) {
                  added++;
                  builder.push(item + ":" + ruleStyles[item] + ";");
                }
              }
              if (!!added) {
                builder.splice(place, 0, rule, "{");
                builder.push("}");
              }
            }
          }
          if (!!builder.length) {
            return builder.join(this.debug ? "\n" : "");
          }
        }
        return null;
      },
      contentFromRuleSet: function(ruleSet) {
        var builder = [];
        var keys = Object.keys(ruleSet);
        for (var ruleIndex = 0; ruleIndex < keys.length; ruleIndex++) {
          var rule = keys[ruleIndex];
          var content = this.contentFromRules(ruleSet[rule]);
          if (!!content) {
            if (this.debug) {
              builder.push("\n// " + rule + "\n");
            }
            builder.push(content);
          }
        }
        return builder.length ? builder.join("\n") : null;
      }
    };

    var DynStyleSheet = context.jsface.Class({
      _sections: null,
      _id: null,
      _isStandalone: false,
      /**
       * @type Element
       */
      _dom: null,
      _rawContent: null,
      _dirty: false,
      constructor: function(id) {
        this._sections = {};
        this._id = id;
        this._isStandalone = !!id;
      },
      render: function() {
        if (this._dirty) {
          var old = this._dom;
          this._rawContent = this._getContents();
          this._dom = _internal.createDOM(this._id || "default", this._rawContent);
          if (this._dom) {
            _internal.appendDOM(this._dom);
          }
          if (old) {
            old.remove();
          }
          this._dirty = false;
        }
      },
      _getContents: function() {
        return _internal.contentFromRuleSet(this._sections);
      },

      setContents: function(id, rules) {
        this._sections[id] = rules;
        this._dirty = true;
      }
    });

    var cache = {};

    context.styler = {
      appendStyleSheet: function(styles, id, standalone) {
        var cached = cache[standalone ? id : "__default"];
        if (!cached) {
          cached = cache[standalone ? id : "__default"] = new DynStyleSheet(standalone ? id : null);
        }
        cached.setContents(id, styles);
        if (!_internal._buffered) {
          cached.render();
        }
      },

      bufferize: function() {
        _internal._buffered = true;
      },
      flush: function() {
        var names = Object.keys(cache);
        for (var i = 0; i < names.length; i++) {
          if (cache[names[i]]) {
            cache[names[i]].render();
          }
        }
        _internal._buffered = false;
      },
      removeStyleSheet: function(id) {
        if (cache[id]) {
          cache[id].setContents(id, null);
          // cache[id].render();
          cache[id] = null;
        }
      }
    };
  })(window);
