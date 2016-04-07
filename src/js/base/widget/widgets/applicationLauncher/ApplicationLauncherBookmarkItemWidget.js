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

modulum('ApplicationLauncherBookmarkItemWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationLauncherBookmarkItemWidget
     * @extends classes.WidgetBase
     */
    cls.ApplicationLauncherBookmarkItemWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ApplicationLauncherBookmarkItemWidget.prototype */
      return {
        __name: "ApplicationLauncherBookmarkItemWidget",
        constructor: function(bookmarkItem) {
          $super.constructor.call(this);
          var element = $(this._element);
          element.find(".title").text(bookmarkItem.name);
          element.find(".link").text(bookmarkItem.url);
          element.find(".mt-as-link").first().on("click", function() {
            var data = context.BookmarkService.getBookmark("" + bookmarkItem.name);
            if (data) {
              context.UrlService.goTo(data.url);
            }
          });
          element.find(".mt-as-link.logs").on("click", function() {
            //TODO : pop logs
          });
          element.find(".mt-as-link.delete").on("click", function() {
            var deleter = element.find(".mt-as-link.delete");
            if (deleter[0].hasClass("deleting")) {
              return true;
            }
            deleter[0].addClass("deleting");
            element.find(".mt-as-link").first().hide("fast");
            var removed = context.BookmarkService.removeBookmark(bookmarkItem.name, true);
            var timer = window.setTimeout(function() {
              element.slideUp(function() {
                this.destroy();
              }.bind(this));
            }.bind(this), 10000);

            deleter.find("i").removeClass("zmdi-delete");
            deleter[0].getElementsByTagName("i")[0].addClass("zmdi-undo");
            var undo = $("<b class=\"undo\">Undo</b>").appendTo(deleter);
            deleter.on("click.undo", function() {
              window.clearTimeout(timer);
              deleter[0].getElementsByTagName("i")[0].addClass("zmdi-delete");
              deleter.find("i").removeClass("zmdi-undo");
              deleter.removeClass("deleting");
              element.find(".mt-as-link").first().show("fast");
              context.BookmarkService.getBookmarks().add(removed, element.index());
              context.LocalSettingsService.write("bookmarks", context.BookmarkService.getBookmarks());
              undo.remove();
              deleter.off("click.undo");
              return false;
            });
          }.bind(this));
        }
      };
    });
    cls.WidgetFactory.register('ApplicationLauncherBookmarkItem', cls.ApplicationLauncherBookmarkItemWidget);
  });
