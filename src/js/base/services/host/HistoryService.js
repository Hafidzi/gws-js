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

modulum('HistoryService', ['InitService', 'LocalSettingsService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.HistoryService
     */
    context.HistoryService = context.oo.Singleton( /** @lends gbc.HistoryService */ {
      __name: "HistoryService",
      refreshedEvent: "refreshed",
      _history: [],
      _eventListener: new cls.EventListener(),
      init: function() {
        this.refresh();
      },
      refresh: function() {
        this._history = (context.LocalSettingsService.read("history") || []).remove(null);
        this._eventListener.emit(this.refreshedEvent);
      },

      /**
       * Get History stored
       * @returns {Array} History marks list
       */
      getHistory: function(name) {
        if (name) {
          return this._history.find(function(n) {
            return n.name === name || n.url === name;
          });
        } else {
          return this._history;
        }
      },

      /**
       * Add something to the history stack
       * @param   {String} name The name to be displayed
       * @param   {String} url  The link to go with this history mark
       * @param flag
       */
      addHistory: function(application, url, flag) {
        if (typeof(flag) === "undefined") {
          flag = "";
        }

        this._history.remove(function(n) {
          return n.name === application.info().appId || n.url === name;
        });

        this._history.unshift({
          "name": application.info().appId,
          "description": "",
          "url": url,
          "date": Date.now(),
          "flag": flag,
          "session": application.info().session
        });
        context.LocalSettingsService.write("history", this._history);
        this.refresh();
      },

      /**
       * Remove a given history entry
       * @param   {String} name The name of the entry to remove
       */
      removeHistory: function(name) {
        this._history.remove(function(n) {
          return n.name === ("" + name) || n.url === name;
        });
        context.LocalSettingsService.write("history", this._history);
        this.refresh();
      },

      /**
       * Remove all the History stored
       */
      clearHistory: function() {
        context.LocalSettingsService.write("history", []);
        this.refresh();
      },
      onRefreshed: function(hook) {
        return this._eventListener.on(this.refreshedEvent, hook);
      }
    });
    context.InitService.register(context.HistoryService);
  });
