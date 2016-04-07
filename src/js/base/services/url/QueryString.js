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

modulum('QueryString', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     *
     * @class classes.QueryString
     */
    cls.QueryString = context.oo.Class(function() {
      return {
        _contents: null,
        constructor: function(raw) {
          this._contents = {};
          if (raw instanceof cls.QueryString) {
            this._contents = Object.clone(raw._contents, true);
          } else {
            if (Object.isString(raw)) {
              var tokens = raw.split("&").remove("");
              for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                var q = /([^=]+)(?:=(.*))/.exec(token);
                this.add(q[1], q[2]);
              }
            }
          }
        },
        toString: function() {
          var result = [];
          var contentKeys = Object.keys(this._contents);
          for (var i = 0; i < contentKeys.length; i++) {
            var key = contentKeys[i];
            var values = this._contents[key];
            if (Object.isArray(values)) {
              for (var v = 0; v < values.length; v++) {
                var value = values[v];
                result.push(key + ((value === false || !!value) ? ("=" + value) : ""));
              }
            } else {
              result.push(key + ((values === false || !!values) ? ("=" + values) : ""));
            }
          }
          return result.join("&");
        },
        add: function(key, value) {
          if (this._contents.hasOwnProperty(key)) {
            if (Object.isArray(this._contents[key])) {
              this._contents[key].push(value);
            } else {
              this._contents[key] = [this._contents[key], value];
            }
          } else {
            this._contents[key] = value;
          }
        },
        remove: function(key, value) {
          if (value === false || !!value) {
            if (Object.isArray(this._contents[key])) {
              if (this._contents[key].any(value)) {
                this._contents[key].remove(value);
              }
              if (this._contents[key].length === 1) {
                this._contents[key] = this._contents[key][0];
              } else if (this._contents[key].length === 0) {
                delete this._contents[key];
              }
            } else if (this._contents[key] === value) {
              delete this._contents[key];
            }
          } else {
            delete this._contents[key];
          }
        },
        isEmpty: function() {
          return JSON.stringify(this._contents) === "{}";
        }
      };
    });
  });
