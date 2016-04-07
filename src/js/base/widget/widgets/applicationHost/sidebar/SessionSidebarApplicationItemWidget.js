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

modulum('SessionSidebarApplicationItemWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.SessionSidebarApplicationItemWidget
     * @extends classes.WidgetGroupBase
     */
    cls.SessionSidebarApplicationItemWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.SessionSidebarApplicationItemWidget.prototype */
      return {
        __name: "SessionSidebarApplicationItemWidget",
        _applicationName: null,
        _applicationIconImage: null,
        /**
         * @type {classes.ApplicationWidget}
         */
        _applicationWidget: null,
        _initElement: function() {
          $super._initElement.call(this);
          this._applicationName = this._element.querySelector(".applicationName");
          this._element.on("click.SessionSidebarApplicationItemWidget", function() {
            this._applicationWidget.getParentWidget().setCurrentWidget(this._applicationWidget);
            this.closeSidebar();
          }.bind(this));
          /*this._element.querySelector(".close").on("click.SessionSidebarApplicationItemWidget", function() {
            this.emit(context.constants.widgetEvents.close);
          }.bind(this));*/
        },
        destroy: function() {
          this._applicationWidget = null;
          $super.destroy.call(this);
        },
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
        },
        setApplicationName: function(text) {
          this._applicationName.textContent = text;
          this._applicationName.setAttribute("title", text);
        },
        getApplicationName: function() {
          return this._applicationName.textContent;
        },
        setApplicationWidget: function(widget) {
          this._applicationWidget = widget;
        },
        setApplicationIcon: function(image) {
          if (!this._applicationIconImage) {
            this._applicationIconImage = cls.WidgetFactory.create("Image");
            this._element.querySelector(".applicationIcon").prependChild(this._applicationIconImage.getElement());
          }
          this._applicationIconImage.setHidden(true);
          if (image && image !== "") {
            this._applicationIconImage.setSrc(image);
            this._applicationIconImage.setHidden(false);
          }
        },
        onClose: function(hook) {
          this.on(context.constants.widgetEvents.close, hook);
        },
        closeSidebar: function() {
          this.getParentWidget().getParentWidget().getParentWidget()._hideSidebar();
        }
      };
    });
    cls.WidgetFactory.register('SessionSidebarApplicationItem', cls.SessionSidebarApplicationItemWidget);
  });
