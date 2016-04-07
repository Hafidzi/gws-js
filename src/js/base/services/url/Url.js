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

modulum('Url', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     *
     * @class classes.Url
     */
    cls.Url = context.oo.Class(function() {
      return {
        _protocol: null,
        _username: null,
        _password: null,
        _host: null,
        _port: null,
        _path: null,
        _queryString: null,
        _hash: null,
        _invalid: false,
        $static: {
          isValid: function(urlString) {
            return !!window.RegExpUrl.test(urlString);
          },
          protocolDefaultPort: function(protocol) {
            return ({
              http: "80",
              https: "443"
            })[protocol] || "80";
          }
        },
        constructor: function(urlString) {
          if (urlString instanceof cls.Url) {
            this._protocol = urlString._protocol;
            this._username = urlString._username;
            this._password = urlString._password;
            this._host = urlString._host;
            this._port = urlString._port;
            this._path = urlString._path;
            this._queryString = new cls.QueryString(urlString._queryString);
            this._hash = urlString._hash;
          } else {
            urlString = urlString || window.location.href;
            var parts = window.RegExpUrl.exec(urlString);
            this._invalid = !parts;
            if (!!parts) {
              this._protocol = parts[1];
              this._username = parts[2];
              this._password = parts[3];
              this._host = parts[4];
              this._port = parts[5];
              this._path = parts[6];
              this._queryString = parts[7] && new cls.QueryString(parts[7]);
              this._hash = parts[8];
            }
          }
        },
        originString: function() {
          return "" +
            (this._protocol || context.$url.currentUrl()._protocol) + "://" +
            (this._username ? (this._username + (this._password ? (":" + this._password) : "") + "@") : "") +
            (this._host + (this._port ? (":" + this._port) : ""));
        },
        toRawString: function() {
          return this.originString() + this._path;
        },
        toString: function() {
          var queryString = this._queryString && this._queryString.toString();
          return this.toRawString() +
            (!!queryString ? ("?" + queryString) : "") +
            (!!this._hash ? ("#" + this._hash) : "");
        },
        setQueryString: function(key, value) {
          this.removeQueryString(key);
          return this.addQueryString(key, value);
        },
        addQueryString: function(key, value) {
          (this._queryString = this._queryString || new cls.QueryString()).add(key, value);
          return this;
        },
        removeQueryString: function(key, value) {
          if (this._queryString) {
            this._queryString.remove(key, value);
            if (!this._queryString.length) {
              this._queryString = null;
            }
          }
          return this;
        },
        hasSameOrigin: function(url) {
          if (!(url instanceof cls.Url)) {
            if (Object.isString(url)) {
              url = new cls.Url(url);
            } else {
              return false;
            }
          }
          return (url._protocol === this._protocol) && (url._username === this._username) && (url._password === this._password) &&
            (
              url._host === this._host) && ((url._port || cls.Url.protocolDefaultPort(url._protocol)) === (this._port || cls.Url.protocolDefaultPort(
              this._protocol)));
        },
        hasSamePath: function(url) {
          if (!(url instanceof cls.Url)) {
            if (Object.isString(url)) {
              url = new cls.Url(url);
            } else {
              return false;
            }
          }
          return (url._path === this._path);
        },
        isUaR: function() {
          return this._path.indexOf("/ua/r/") >= 0;
        },
        getQueryStringObject: function() {
          return this._queryString && this._queryString._contents && Object.clone(this._queryString._contents, true) || {};
        }
      };
    });
  });
