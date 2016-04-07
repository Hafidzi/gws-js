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

modulum('BookmarkService', ['InitService', 'LocalSettingsService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.BookmarkService
     */
    context.BookmarkService = context.oo.Singleton( /** @lends gbc.BookmarkService */ {
      __name: "BookmarkService",
      refreshedEvent: "refreshed",
      _lastBookmarks: -1,
      _bookmarks: [],
      _dirty: false,
      _eventListener: new cls.EventListener(),
      init: function() {
        this._refresh(true);
      },
      _refresh: function(emit) {
        var lastBookmarks = context.LocalSettingsService.read("lastBookmarks") || 0;
        if (lastBookmarks > this._lastBookmarks) {
          this._bookmarks = (context.LocalSettingsService.read("bookmarks") || []).remove(null);
        }
        if (emit) {
          this._eventListener.emit(this.refreshedEvent);
        }
      },
      update: function(emit) {
        context.LocalSettingsService.write("lastBookmarks", new Date().getTime());
        context.LocalSettingsService.write("bookmarks", this._bookmarks);
        if (emit) {
          this._eventListener.emit(this.refreshedEvent);
        }
      },
      getBookmarks: function() {
        return this._bookmarks;
      },
      /**
       * Get a bookmark in localstorage defined by his name
       * @param   {String} name The displayed name in the list
       * @returns {Object} The matching bookmark
       */
      getBookmark: function(name) {
        return this._bookmarks.find(function(n) {
          return n.name === name || n.url === name;
        });
      },

      switchBookmark: function(name, url) {
        if (this.getBookmark(name)) {
          this._removeBookmark(name, true);
        } else {
          this._addBookmark(name, url, true);
        }
      },
      /**
       * Add a boormark to the localstorage
       * @param   {String}  name Name to be displayed
       * @param   {String}  url  Link to the bookmark content
       * @returns {Boolean} true if succesfully added, false otherwise
       */
      addBookmark: function(name, url) {
        return this._addBookmark(name, url, true);
      },

      /**
       * Add a boormark to the localstorage
       * @param   {String}  name Name to be displayed
       * @param   {String}  url  Link to the bookmark content
       * @param   {Boolean}  emit if emits the change
       * @returns {Boolean} true if succesfully added, false otherwise
       */
      _addBookmark: function(name, url, emit) {
        this._refresh();
        if (this.getBookmark(name)) {
          this.removeBookmark(name);
        }
        var mark = {
          "name": name,
          "description": "",
          "url": url,
          "date": Date.now()
        };

        this._bookmarks.unshift(mark);
        this.update(emit);
      },

      /**
       * Search localStorage and remove a bookmark
       * @param   {String}   name Name to be removed
       */
      removeBookmark: function(name) {
        this._removeBookmark(name, true);
      },

      /**
       * Search localStorage and remove a bookmark
       * @param   {String}   name Name to be removed
       */
      _removeBookmark: function(name, emit) {
        this._refresh();
        var toRemove = this.getBookmark(name);
        this._bookmarks.remove(toRemove);
        this.update(emit);
        return toRemove;
      },
      onRefreshed: function(hook) {
        return this._eventListener.on(this.refreshedEvent, hook);
      }
    });
    context.InitService.register(context.BookmarkService);
  });
