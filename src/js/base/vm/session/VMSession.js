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

modulum("VMSession", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * A gas Session
     * @class classes.VMSession
     * @extends classes.EventListener
     */
    cls.VMSession = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.VMSession.prototype */
      return {
        __name: "VMSession",
        /** @lends classes.VMSession */
        $static: {
          applicationAddedEvent: "applicationAdded",
          applicationRemovedEvent: "applicationRemoved"
        },
        /**
         * @type {string}
         */
        _identifier: null,
        _sessionId: null,
        /**
         * @type {classes.VMApplication[]}
         */
        _applications: null,
        _baseInfos: null,

        /**
         * @type {classes.SessionWidget}
         */
        _widget: null,
        _sidebarWidget: null,
        _bookmarkWidget: null,
        _applicationIdentifier: 0,
        _applicationQueue: null,
        constructor: function(identifier) {
          $super.constructor.call(this);
          this._widget = cls.WidgetFactory.create("Session");
          context.HostService.getApplicationHostWidget().addChildWidget(this._widget);
          this._sidebarWidget = cls.WidgetFactory.create("SessionSidebar");
          context.HostService.getApplicationHostWidget().getSideBar().addChildWidget(this._sidebarWidget);
          this._bookmarkWidget = cls.WidgetFactory.create("ApplicationBookmarkHostMenu");
          context.HostService.getApplicationHostWidget().getMenu().addChildWidget(this._bookmarkWidget);
          this._widget.setSidebarWidget(this._sidebarWidget);
          this._identifier = identifier;
          this._applications = [];
          this._applicationQueue = [];
          this._widget.getEndWidget().on(context.constants.widgetEvents.close, this.destroy.bind(this));
          this._widget.getEndWidget().on(cls.SessionEndWidget.restartEvent, this._onRestart.bind(this));
        },
        _onRestart: function() {
          var info = this._baseInfos;
          this.destroy();
          context.SessionService.start(info.appId, info.urlParameters);
        },
        getWidget: function() {
          return this._widget;
        },
        getApplicationIdentifier: function() {
          return this._applicationIdentifier++;
        },
        destroy: function() {
          context.HostService.getApplicationHostWidget().getMenu().removeChildWidget(this._bookmarkWidget);
          context.SessionService.remove(this);
          this._sidebarWidget.destroy();
          this._sidebarWidget = null;
          this._widget.destroy();
          this._widget = null;
          this._applications.length = 0;
          $super.destroy.call(this);
        },
        getSessionId: function() {
          return this._sessionId;
        },
        setSessionId: function(id) {
          if (!this._sessionId) {
            this._sessionId = id;
            context.SessionService.updateSessionId(this, id);
          } else if (id !== this._sessionId) {
            this.error("Session Id Changed");
          }
        },
        getAppId: function() {
          return this._baseInfos.appId;
        },
        error: function(msg) {

        },
        /**
         *
         * @param {classes.VMApplication} application
         */
        add: function(application) {
          this._applications.push(application);
          this.emit(cls.VMSession.applicationAddedEvent, application);
        },
        /**
         *
         * @param {classes.VMApplication} application
         */
        remove: function(application) {
          this._applications.remove(application);
          this._applicationQueue.remove(application);
          this._applicationEnding = application.info().ending;
          var pos = 0;
          while (pos < this._applicationQueue.length) {
            if (this._applicationQueue[pos] === this._applicationQueue[pos + 1]) {
              this._applicationQueue.splice(pos, 1);
            } else {
              pos++;
            }
          }
          this.emit(cls.VMSession.applicationRemovedEvent, application);
          var currentApp = this.getCurrentApplication();
          if (currentApp) {
            this._widget.setCurrentWidget(currentApp.getUI().getWidget());
            var currentWindow = currentApp.getVMWindow();
            if (currentWindow) {
              var winWidget = currentWindow.getController().getWidget();
              context.HostService.setDisplayedWindow(winWidget);
              context.HostService.getApplicationHostWidget().getSideBar().setActiveWindow(winWidget);
            }
          }
          if (!this._applications.length) {
            this.displayEnd();
          }
        },
        displayEnd: function() {
          this.getWidget().getEndWidget().setHeader(i18n.t("app.ending.title"));
          if (this._baseInfos.session) {
            this.getWidget().getEndWidget().showSessionActions();
            this.getWidget().getEndWidget().setSessionLinks(this._baseInfos.customUA || this._baseInfos.connector || "",
              this._baseInfos.session);
            //            self.application.auiLog.linkDownload();
            this.getWidget().getEndWidget().setSessionID(this._baseInfos.session);
          }
          if (this._baseInfos.mode === "ua") {
            this.getWidget().getEndWidget().showUAActions();
          }
          if (!this._applicationEnding.normal) {

            switch (this._applicationEnding.flag) {
              case "notFound":
                this.getWidget().getEndWidget().setHeader(i18n.t("app.notFound.title"));
                this.getWidget().getEndWidget().setMessage(i18n.t("app.notFound.message", {
                  appId: "<strong>\"" + this._baseInfos.appId + "\"</strong>"
                }));
                break;
              case "notok":
                this.getWidget().getEndWidget().setMessage(
                  "<p>" + i18n.t("app.error.message") + ".</p><p>" + this._applicationEnding.message + "</p>");
                break;
              case "forbidden":
                this.getWidget().getEndWidget().setMessage(
                  "<p>" + i18n.t("app.forbidden.message") + ".</p><p>" + this._applicationEnding.message + "</p>");
                break;
              case "autoLogout":
                this.getWidget().getEndWidget().setMessage(
                  "<p>" + i18n.t("app.autologout.message") + ".</p>");
                break;
              case "uaProxy":
                this.getWidget().getEndWidget().setMessage(
                  "<p>" + i18n.t("app.uaProxy.message") + ".</p><p>" + this._applicationEnding.message + "</p>");
                break;
            }
          }
          this.getWidget().showEnd();
          context.HostService.setDisplayedWindow(null);
        },
        /*

         {{#equals applicationInfo.ending.flag "notok" }}
         {{/equals}}
         {{#equals applicationInfo.ending.flag "forbidden" }}
         <p>The application encountered an access issue.</p>
         <p>{{applicationInfo.ending.message}}</p>
         {{/equals}}
         {{#equals applicationInfo.ending.flag "autoLogout" }}
         <p>You have been logged out.</p>
         {{/equals}}
         {{#equals applicationInfo.ending.flag "uaProxy" }}
         <p>The application stopped unexpectedly.</p>
         <p>{{applicationInfo.ending.message}}</p>
         {{/equals}}
         {{#if applicationInfo.session}}
         <hr/>
         <p>Session ID : <span class="sessionID">{{applicationInfo.session}}</span></p>
         {{/if}}
         {{/equals}}
         {{/equals}}
         */
        /**
         *
         * @param {classes.VMApplication} application
         * @returns {boolean}
         */
        isLast: function(application) {
          return this._applications.length === 1 && this._applications.any(application);
        },
        /**
         *
         * @returns {boolean}
         */
        isEmpty: function() {
          return !this._applications.length;
        },
        start: function(appName, params) {
          var info = new cls.VMApplicationInfo({
            appId: appName,
            urlParameters: params || context.UrlService.currentUrl().getQueryStringObject()
          });
          info.connector = info.urlParameters.connector || context.bootstrapInfo.connectorUri || "";
          info.customUA = info.urlParameters.customUA || null;
          info.mode = info.urlParameters.mode || "ua";
          this._baseInfos = info;
          this._bookmarkWidget.setActivated(context.BookmarkService.getBookmark(this.getAppId()));
          var application = new cls.VMApplication(info, this);
          this._widget.setCurrentWidget(application.getUI().getWidget());
          this.add(application);
          application.start();
        },
        startTask: function(taskId, callback) {
          var info = Object.merge({}, this._baseInfos);
          info.task = true;
          info.page = 2;
          info.app = taskId;

          var application = new cls.VMApplication(new cls.VMApplicationInfo(info), this);
          this._widget.setCurrentWidget(application.getUI().getWidget());
          this.add(application);
          application.start();
          callback();
        },

        startDirect: function(connection) {
          var info = new cls.VMApplicationInfo({
            //frontEndId1: "{" + uuid.v4() + "}",
            //frontEndId2: "{" + uuid.v4() + "}",
            pingTimeout: 1000,
            page: 1,
            auiOrder: 0,
            mode: "direct"
          });
          info.connection = connection;
          var application = new cls.VMApplication(info, this);
          this.add(application);
          application.start();
        },
        onApplicationAdded: function(hook) {
          return this.on(cls.VMSession.applicationAddedEvent, hook);
        },
        onApplicationRemoved: function(hook) {
          return this.on(cls.VMSession.applicationRemovedEvent, hook);
        },
        /**
         *
         * @returns {classes.VMApplication}
         */
        getCurrentApplication: function() {
          return (this._applicationQueue.length && this._applicationQueue[this._applicationQueue.length - 1]) ||
            this._applications[this._applications.length - 1];
        },
        setCurrentApplication: function(application) {
          this._applicationQueue.push(application);
        }
      };
    });
  });
