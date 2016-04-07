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

modulum('ApplicationWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ApplicationWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ApplicationWidget.prototype */
      return {
        __name: "ApplicationWidget",
        _waiter: null,
        /**
         * @type {classes.SessionSidebarApplicationItemWidget}
         */
        _sidebarWidget: null,
        _messageWidget: null,
        _applicationHash: null,

        constructor: function() {
          $super.constructor.call(this);
          this._sidebarWidget = cls.WidgetFactory.create("SessionSidebarApplicationItem");
          this._sidebarWidget.setApplicationWidget(this);
          this._messageWidget = cls.WidgetFactory.create("Message");
          this._messageWidget.setHidden(true);
        },
        destroy: function() {
          $super.destroy.call(this);
          this._sidebarWidget.destroy();
          this._sidebarWidget = null;
        },
        _initElement: function() {
          $super._initElement.call(this);
          this._waiter = cls.WidgetFactory.create("Waiting");
          this._element.appendChild(this._waiter.getElement());
        },
        setApplicationHash: function(applicationHash) {
          this._applicationHash = applicationHash;
        },
        showWaiter: function() {
          this._element.appendChild(this._waiter.getElement());
        },
        hideWaiter: function() {
          this._waiter.getElement().remove();
        },
        getSidebarWidget: function() {
          return this._sidebarWidget;
        },
        getMessageWidget: function() {
          return this._messageWidget;
        },
        activate: function() {
          this.emit(context.constants.widgetEvents.activate);
        },
        onActivate: function(hook) {
          return this.on(context.constants.widgetEvents.activate, hook);
        },
        disable: function() {
          this.emit(context.constants.widgetEvents.disable);
        },
        layoutRequest: function() {
          this.emit(context.constants.widgetEvents.layoutRequest);
        },
        onLayoutRequest: function(hook) {
          return this.on(context.constants.widgetEvents.layoutRequest, hook);
        }
      };
    });
    cls.WidgetFactory.register('Application', cls.ApplicationWidget);
  });
