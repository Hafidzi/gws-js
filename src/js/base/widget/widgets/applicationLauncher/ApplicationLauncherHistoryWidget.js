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

modulum('ApplicationLauncherHistoryWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationLauncherHistoryWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ApplicationLauncherHistoryWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ApplicationLauncherHistoryWidget.prototype */
      return {
        __name: "ApplicationLauncherHistoryWidget",
        constructor: function() {
          $super.constructor.call(this);
          var element = $(this._element);
          element.find(".removeHistory").on("click", function() {
            context.HistoryService.clearHistory();
          });
          this.refresh();
          context.HistoryService.onRefreshed(this.refresh.bind(this));
        },
        refresh: function() {
          while (this._children.length) {
            this._children.pop().destroy();
          }
          var history = context.HistoryService.getHistory();
          for (var i = 0; i < history.length; i++) {
            var item = cls.WidgetFactory.create('ApplicationLauncherHistoryItem', null, history[i]);
            this.addChildWidget(item);
          }
        }
      };
    });
    cls.WidgetFactory.register('ApplicationLauncherHistory', cls.ApplicationLauncherHistoryWidget);
  });
