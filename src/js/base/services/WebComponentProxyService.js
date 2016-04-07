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

modulum('WebComponentProxyService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.WebComponentProxyService
     */
    context.WebComponentProxyService = context.oo.Singleton( /** @lends gbc.WebComponentProxyService */ {
      __name: "WebComponentProxyService",

      _proxies: {},

      init: function() {

      },

      setProxy: function(uid, widget) {
        this._proxies[uid] = this._api(widget);
      },

      getProxy: function(uid) {
        return this._proxies[uid];
      },

      _api: function() {
        return {
          setFocus: function(element) {
            element.emit(context.constants.widgetEvents.focus);
            element.setFocus();
          },
          setData: function(element, dataStr) {
            element.emit(cls.WebComponentWidget.dataEvent, dataStr);
          },
          action: function(element, actionName) {
            element.emit(cls.WebComponentWidget.actionEvent, actionName);
          }
        };
      }
    });
    context.InitService.register(context.WebComponentProxyService);
  });
