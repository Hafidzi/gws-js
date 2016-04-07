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

modulum('SessionSidebarWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.SessionSidebarWidget
     * @extends classes.WidgetGroupBase
     */
    cls.SessionSidebarWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.SessionSidebarWidget.prototype */
      return {
        __name: "SessionSidebarWidget",
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        _addChildWidgetToDom: function(widget) {
          var itemHost = document.createElement('li');
          itemHost.addClass('mt-action');
          widget.getLayoutInformation().setHost(itemHost);
          this._containerElement.appendChild(itemHost);
          itemHost.appendChild(widget._element);
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        _removeChildWidgetFromDom: function(widget) {
          var info = widget.getLayoutInformation(),
            host = info && info.getHost();
          if (host && host.parentNode === this._containerElement) {
            widget._element.remove();
            host.remove();
            host = null;
          }
        }

      };
    });
    cls.WidgetFactory.register('SessionSidebar', cls.SessionSidebarWidget);
  });
