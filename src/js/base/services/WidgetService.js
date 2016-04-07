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

modulum('WidgetService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.WidgetService
     */
    context.WidgetService = context.oo.Singleton( /** @lends gbc.WidgetService */ {
      __name: "WidgetService",
      widgetCreatedEvent: "widgetCreated",
      widgetDestroyEvent: "widgetDestroy",
      cursorX: 0,
      cursorY: 0,
      /**
       * @type classes.EventListener
       */
      _eventListener: null,
      init: function() {
        this._eventListener = new cls.EventListener();
      },
      _emit: function(type, data) {
        this._eventListener.emit(type, data);
      },
      onWidgetCreated: function(kind, hook) {
        this._eventListener.on(this.widgetCreatedEvent, function(evt, src, data) {
          if (!hook) {
            hook = kind;
            kind = null;
          }
          if (!kind || data.__name === kind) {
            hook(evt, src, data);
          }
        });
      }
    });
    context.InitService.register(context.WidgetService);
  });
