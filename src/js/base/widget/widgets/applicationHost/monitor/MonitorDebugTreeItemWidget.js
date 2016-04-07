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

modulum('MonitorDebugTreeItemWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MonitorDebugTreeItemWidget
     * @extends classes.WidgetGroupBase
     */
    cls.MonitorDebugTreeItemWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.MonitorDebugTreeItemWidget.prototype */
      return {
        __name: "MonitorDebugTreeItemWidget",
        _container: null,
        _label: null,
        _idRef: null,
        _initElement: function() {
          $super._initElement.call(this);
          var element = $(this._element);
          this._container = element.find(">.description");
          this._label = element.find(">.description>.label");
          this._idRef = element.find(">.description>.idRef");
          this._container
            .on("click", function() {
              this.emit(gbc.constants.widgetEvents.click);
              event.stopPropagation();
            }.bind(this))
            .on("dblclick", function(event) {
              $(this._element).toggleClass("collapsed");
              event.stopPropagation();
            }.bind(this));

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
        setLabel: function(label) {
          this._label.text(label);
        },
        setIdRef: function(idRef) {
          this._idRef.text(idRef);
        },
        setIconColor: function(color) {
          this.setStyle('>.description>.icon', {
            "background-color": color
          });
        },
        setCollapsed: function(collapsed) {
          $(this._element).toggleClass("collapsed", !!collapsed);
        }
      };
    });
    cls.WidgetFactory.register('MonitorDebugTreeItem', cls.MonitorDebugTreeItemWidget);
  });
