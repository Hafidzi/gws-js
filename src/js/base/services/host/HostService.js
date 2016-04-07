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

modulum('HostService', ['InitService', 'DebugService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.HostService
     */
    context.HostService = context.oo.Singleton( /** @lends gbc.HostService */ {
      __name: "HostService",
      /** @type classes.MainContainerWidget */
      _widget: null,
      _defaultTitle: "",
      /** @type classes.ApplicationHostWidget */
      _applicationHostWidget: null,
      /** @type classes.WindowWidget */
      _currentWindow: null,
      /** @type {Function[]} */
      _currentWindowChangesListeners: [],

      init: function() {
        if (!context.DebugService.isMonitorWindow()) {
          this._widget = cls.WidgetFactory.create("MainContainer");
          document.body.appendChild(this._widget.getElement());
          this._defaultTitle = document.title;
          this._applicationHostWidget = cls.WidgetFactory.create("ApplicationHost");
          this._widget.addChildWidget(this._applicationHostWidget);
        }
      },
      /**
       *
       * @returns {classes.ApplicationHostWidget}
       */
      getWidget: function() {
        return this._widget;
      },

      getApplicationHostWidget: function() {
        return this._applicationHostWidget;
      },

      /**
       *
       * @param {boolean} enable
       */
      setSidebarAvailable: function(enable) {
        this.getWidget().enableSidebar(enable);
      },
      start: function() {
        var params = context.UrlService.currentUrl().getQueryStringObject();
        if (!!params.app || context.bootstrapInfo.appName) {
          context.SessionService.start(params.app || context.bootstrapInfo.appName);
        } else {
          this.displayNoSession();
        }
      },
      displaySession: function() {
        this._applicationHostWidget.getLauncher().setHidden(true);
      },
      displayNoSession: function() {
        this._applicationHostWidget.getLauncher().setHidden(false);
      },
      wrapGlobalErrors: function() {
        window.onerror = function(msg, file, line, col, error) {
          context.error(error);
          console.error("======= error");
          return false;
        };
      },
      getCurrentWindow: function() {
        return this._currentWindow;
      },
      /**
       *
       * @param {WindowWidget} win
       */
      setDisplayedWindow: function(win) {
        if (win !== this._currentWindow) {
          if (this._currentWindow) {
            this._currentWindow.disableActions();
          }
          this._currentWindow = win;
          if (this._currentWindow) {
            this._currentWindow.enableActions();
            // set current window title (icon + text) as application host menu title
            this.setCurrentTitle(win.getText() || win.getUserInterfaceWidget().getText());
            this.setCurrentIcon(win.getImage() || win.getUserInterfaceWidget().getImage());
          } else {
            this.setCurrentTitle("");
            this.setCurrentIcon("");
          }
          for (var i = 0; i < this._currentWindowChangesListeners.length; ++i) {
            this._currentWindowChangesListeners[i](win);
          }
        }
      },
      setCurrentTitle: function(title) {
        this._applicationHostWidget.getMenu().setText(title);
        document.title = title ? title : this._defaultTitle;
      },
      setCurrentIcon: function(img) {
        this._applicationHostWidget.getMenu().setIcon(img);
      },
      unsetDisplayedWindow: function(win) {
        if (win && this._currentWindow === win) {
          this._currentWindow.disableActions();
        }
      }
    });
    context.InitService.register(context.HostService);
  });
