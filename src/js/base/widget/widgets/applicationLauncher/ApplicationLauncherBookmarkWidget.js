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

modulum('ApplicationLauncherBookmarkWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationLauncherBookmarkWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ApplicationLauncherBookmarkWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ApplicationLauncherBookmarkWidget.prototype */
      return {
        __name: "ApplicationLauncherBookmarkWidget",
        constructor: function() {
          $super.constructor.call(this);
          this.refresh();
          context.BookmarkService.onRefreshed(this.refresh.bind(this));
        },
        refresh: function() {
          while (this._children.length) {
            this._children.pop().destroy();
          }
          var bookmark = context.BookmarkService.getBookmarks();
          for (var i = 0; i < bookmark.length; i++) {
            var item = cls.WidgetFactory.create('ApplicationLauncherBookmarkItem', null, bookmark[i]);
            this.addChildWidget(item);
          }
        }
      };
    });
    cls.WidgetFactory.register('ApplicationLauncherBookmark', cls.ApplicationLauncherBookmarkWidget);
  });
