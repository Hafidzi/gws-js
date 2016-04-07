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

modulum('LogService', ['InitService', 'ConsoleLogProvider'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.LogService
     */
    context.LogService = context.oo.Singleton( /** @lends gbc.LogService */ {
      __name: "LogService",
      _currentLevel: /**/ "debug", //*/ "none",
      levels: ["all", "debug", "log", "info", "warn", "error"],
      _providers: {
        _default: new cls.ConsoleLogProvider()
      },
      init: function() {
        this.changeLevel(this._currentLevel, true);
      },
      _intLevel: function(level) {
        return this.levels.indexOf(level);
      },
      changeLevel: function(newLevel, force) {
        var intlevel = this._intLevel(this._currentLevel);
        var intnewlevel = this._intLevel(newLevel);
        if (force || (intnewlevel !== intlevel)) {
          var p = Object.keys(this._providers);
          for (var i = 0; i < p.length; i++) {
            this._prepareLogger(this._providers[p[i]], intnewlevel);
          }
        }
      },
      registerLogProvider: function(provider, type) {
        var types = (Array.isArray(type) ? type : [type]);
        for (var i = 0; i < types.length; i++) {
          this._providers[types[i] || "_default"] = provider;
          this._prepareLogger(types[i] || "_default", this._intLevel(this._currentLevel));
        }
      },
      _prepareLogger: function(type, intnewlevel) {
        var target = this;
        if (type !== "_default") {
          this[type] = {};
          target = this[type];
        }
        for (var i = 1; i < this.levels.length; i++) {
          var levelName = this.levels[i];
          if (intnewlevel < 0 || intnewlevel > i) {
            target[levelName] = Function.noop;
          } else {
            target[levelName] = this._getLogMethod(type, levelName);
          }
        }
      },
      _getLogMethod: function(logType, level) {
        var provider = this._providers[logType] || this._providers._default;
        return function() {
          provider.getLogger()[level].apply(provider.getLogger(), arguments);
        };
      },
      debug: function() {
        console.debug.apply(console, arguments);
      },
      log: function() {
        console.log.apply(console, arguments);
      },
      info: function() {
        console.info.apply(console, arguments);
      },
      warn: function() {
        console.warn.apply(console, arguments);
      },
      error: function() {
        console.error.apply(console, arguments);
      }
    });
    context.InitService.register(context.LogService);
  });
