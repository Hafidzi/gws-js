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

modulum('DebugService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.DebugService
     */
    context.DebugService = context.oo.Singleton(function() {
      /** @lends gbc.DebugService */
      return {
        __name: "DebugService",
        /** @type Window */
        _monitorWindow: null,
        /**
         * @type classes.MonitorWidget
         */
        _widget: null,
        /**
         * @type classes.DebugAuiController
         */
        _debugAuiController: null,
        _isDebugWindow: false,
        /**
         * @type classes.EventListener
         */
        _eventListener: null,
        init: function() {
          this._eventListener = new cls.EventListener();
          if (!!context.UrlService.currentUrl().getQueryStringObject().monitor) {
            this._isDebugWindow = true;
            this._widget = cls.WidgetFactory.create("Monitor");
            $('body').append(this._widget.getElement());
            this._debugAuiController = new cls.DebugAuiController();
            this._widget.addChildWidget(this._debugAuiController.getWidget());

            window.setTimeout(function() {
              window.opener.gbc.DebugService.attach(window);
              this._debugAuiController.refresh(window.opener.gbc.SessionService.getCurrent().getCurrentApplication().getNode(0));
            }.bind(this), 100);
          }
        },
        isMonitorWindow: function() {
          return this._isDebugWindow;
        },
        destroy: function() {
          if (this._monitorWindow) {
            this._monitorWindow.close();
          }
        },
        show: function() {
          if (!this._monitorWindow) {
            var url = context.UrlService.currentUrl();
            window.open(url.removeQueryString("app").addQueryString("monitor", true).toString());
          } else {
            this._monitorWindow.focus();
          }
        },
        attach: function(monitorWindow) {
          if (this._monitorWindow !== monitorWindow) {
            this._monitorWindow = monitorWindow;
            this._monitorWindow.document.title = "GWC-JS Debug tools";
            this._monitorWindow.onunload = function() {
              //   self.monitor.unload();
              this._monitorWindow = null;
            }.bind(this);
          }
        },
        networkLog: function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          this._eventListener.emit("networkLog", [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
        },
        vmLog: function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          this._eventListener.emit("vmLog", [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
        },
        onNetworkLog: function(hook) {
          return this._eventListener.on("networkLog", hook);
        },
        onVmLog: function(hook) {
          return this._eventListener.on("vmLog", hook);
        }
      };
    });
    context.InitService.register(context.DebugService);
  });
