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

modulum('ApplicationLauncherHistoryItemWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationLauncherHistoryItemWidget
     * @extends classes.WidgetBase
     */
    cls.ApplicationLauncherHistoryItemWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ApplicationLauncherHistoryItemWidget.prototype */
      return {
        __name: "ApplicationLauncherHistoryItemWidget",
        constructor: function(historyItem) {
          $super.constructor.call(this);
          var element = $(this._element);
          element.find(".title").text(historyItem.name);
          element.find(".link").text(historyItem.url);
          element.find(".mt-as-link").first().on("click", function() {
            var data = context.HistoryService.getHistory("" + historyItem.name);
            if (data) {
              context.UrlService.goTo(data.url);
            }
          });
          element.find(".mt-as-link.logs").on("click", function() {
            //TODO : pop logs
          });
          element.find(".mt-as-link.delete").on("click", function() {
            context.HistoryService.removeHistory("" + historyItem.name);
          });
        }
      };
    });
    cls.WidgetFactory.register('ApplicationLauncherHistoryItem', cls.ApplicationLauncherHistoryItemWidget);
  });
