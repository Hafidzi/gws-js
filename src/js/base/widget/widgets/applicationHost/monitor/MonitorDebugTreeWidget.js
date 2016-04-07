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

modulum('MonitorDebugTreeWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MonitorDebugTreeWidget
     * @extends classes.WidgetGroupBase
     */
    cls.MonitorDebugTreeWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.MonitorDebugTreeWidget.prototype */
      return {
        __name: "MonitorDebugTreeWidget",
        _nodeDebug: null,
        _layoutInfo: null,
        _initElement: function() {
          $super._initElement.call(this);
          this._nodeDebug = $(this._element).find('.nodeDebug');
          this._layoutInfo = $(this._element).find('.layoutInfo');
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        _addChildWidgetToDom: function(widget) {
          var itemHost = document.createElement('li');
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
          if (host && info.host.parentNode === this._containerElement) {
            widget._element.remove();
            host.remove();
            host = null;
          }
        },
        setNodeDebugContent: function(content) {
          this._nodeDebug.empty().append(content);
        },
        setLayoutInfoContent: function(content) {
          this._layoutInfo.empty().append(content);
        }
      };
    });
    cls.WidgetFactory.register('MonitorDebugTree', cls.MonitorDebugTreeWidget);
  });
