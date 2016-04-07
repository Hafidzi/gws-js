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
modulum('VMApplication', ['EventListener'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    var applicationIdentifier = 0;
    /**
     *
     * @class classes.VMApplication
     * @extends classes.EventListener
     */
    cls.VMApplication = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.VMApplication.prototype */
      return {
        $static: {
          styleListLoaded: "gStyleListLoaded"
        },
        __name: "VMApplication",
        /** General information for this application
         * @type classes.VMApplicationInfo
         * */
        applicationInfo: null,
        /** Indicator to know if the application is running or not */
        running: false,
        /** Indicator to know if the application is ending */
        ending: false,
        ended: false,
        /** Indicator to know if the application has protocol error */
        hasError: false,
        /** protocolInterface
         * @type classes.ProtocolInterface */
        protocolInterface: null,
        /** dvm management
         * @type classes.DVMApplicationService */
        dvm: null,
        /** model (aui) management
         * @type classes.AuiApplicationService */
        model: null,
        /** layout management
         * @type classes.LayoutApplicationService */
        layout: null,
        /** keyboard events
         * @type classes.KeyboardAppService */
        keyboard: null,
        /** actions
         * @type classes.ActionApplicationService */
        action: null,
        /** actions binder
         * @type classes.ActionBinderAppService */
        actionBinder: null,
        /** frontcall launcher
         * @type classes.FrontCallAppService */
        frontCall: null,
        /** focus manager
         * @type classes.FocusAppService */
        focus: null,
        /** idle management
         * @type classes.IdleAppService */
        idle: null,
        /** application window management
         * @type classes.WindowAppService */
        window: null,
        /** file transfer management
         * @type classes.FileTransferApplicationService */
        filetransfer: null,
        /** application ui
         * @type classes.UIApplicationService */
        _ui: null,
        /**
         * @type jQuery
         */
        appVisual: null,
        /**
         * @type jQuery
         */
        appVisualContainer: null,
        /**
         * @type {classes.VMSession}
         */
        _session: null,
        /** @type {boolean} */
        styleListsChanged: false,
        /**
         *
         * @param {classes.VMApplicationInfo} info - application info
         * @param {classes.VMSession} session

         */
        constructor: function(info, session) {
          $super.constructor.call(this);
          this._session = session;
          this.applicationInfo = info;
          this.applicationHash = session.getApplicationIdentifier();
          this._ui = cls.ApplicationServiceFactory.create('UI', this);
          this.dvm = cls.ApplicationServiceFactory.create('Dvm', this);
          this.model = cls.ApplicationServiceFactory.create('Model', this);
          this.layout = cls.ApplicationServiceFactory.create('Layout', this);
          this.action = cls.ApplicationServiceFactory.create('Action', this);
          this.filetransfer = cls.ApplicationServiceFactory.create('FileTransfer', this);
          //this.keyboard = new cls.KeyboardAppService(this);
          //this.action = new cls.ActionAppService(this);
          //this.actionBinder = new cls.ActionBinderAppService(this);
          //this.frontCall = new cls.FrontCallAppService(this);
          //this.focus = new cls.FocusAppService(this);
          //this.window = new cls.WindowAppService(this);

          this.protocolInterface = cls.ApplicationServiceFactory.create(this._getProtocolInterface(info), this);
        },
        /**
         *
         * @returns {classes.VMSession}
         */
        getSession: function() {
          return this._session;
        },

        _getProtocolInterface: function(info) {
          var result = "NoProtocolInterface";
          switch (info.mode) {
            case "direct":
              result = "DirectProtocolInterface";
              break;
            case "ua":
              result = "UAProtocolInterface";
              break;
            default:
              break;
          }
          return result;
        },
        destroy: function() {
          this._ui.destroy();
          this.filetransfer.destroy();
          this.model.destroy();
          //this.window.destroy();
          this._session.remove(this);
        },
        start: function() {
          this.protocolInterface.start(this.applicationInfo);
        },
        stop: function() {
          if (!this.ended) {
            if (this._isTabHost) {
              context.$app.closeAllApplications(null, this);
            }
            if (!this.applicationInfo.ending) {
              this.applicationInfo.ending = cls.ApplicationEnding.ok;
            }
            this.model.remove();
            this.setEnding();
            //this._ui.destroy();
            if (this.idle) {
              this.idle.destroy();
            }
            //this.focus.destroy();
            //this.frontCall.destroy();
            //this.actionBinder.destroy();
            //this.keyboard.destroy();
            this.action.destroy();
            this.layout.destroy();
            this.model.stop();
            this.dvm.destroy();
            this.protocolInterface.destroy();
            // if (!this._session.isLast(this) && !this._isTabHost) {
            this.destroy();
            // }
            this.ended = true;
          }
        },
        /**
         * Set status of application
         * @param {Boolean} running Status
         */
        setRunning: function(running) {
          this.running = running;
          this._ui.setState(cls.UIApplicationService.status.running);
        },

        /**
         * Set the error status at application's protocol error
         */
        setError: function() {
          this.hasError = true;
          //this.appVisual.find(".waitingVM").remove();
        },

        /**
         * Set the ending status at application's end
         */
        setEnding: function() {
          this.ending = true;
          this.setIdle();
          //this.appVisual.find(".waitingVM").remove();
        },

        /**
         * Returns this application's info.
         * @returns {classes.VMApplicationInfo}
         */
        info: function() {
          return this.applicationInfo;
        },
        /**
         *
         * @param id
         * @returns {classes.NodeBase}
         */
        getNode: function(id) {
          return this.model.getNode(id);
        },
        uiNode: function() {
          return this.getNode(0);
        },

        /**
         * Get the VM Focused Node instance
         * @returns {*|classes.NodeBase}
         */
        getFocusedVMNode: function() {
          var id = this.uiNode().attribute("focus");
          return this.getNode(id);
        },

        /**
         * @param {classes.VMEvent[]} events
         */
        event: function(events) {
          this.protocolInterface.event(events);
        },
        newTask: function() {
          this.protocolInterface.newTask();
        },
        /**
         * Set the idle status to true
         */
        setIdle: function() {
          gbc.LogService.VM.log("%c========================================IDLE " + this.applicationHash,
            "background: #FAA; color: #333");
          this.dvm.idle = true;
          this.getMenu("runtimeStatus").setIdle();
        },
        /**
         * Set the processing status to true
         */
        setProcessing: function() {
          gbc.LogService.VM.log("%c========================================PROCESSING " + this.applicationHash,
            "background: #FAA; color: #333");
          this.dvm.idle = false;
          this.getMenu("runtimeStatus").setProcessing();

        },
        /**
         * Check if the application is idle
         * @returns {Boolean} true if idle, false otherwise
         */
        isIdle: function() {
          return this.dvm.idle;
        },

        /**
         * Check if the application is running
         * @returns {Boolean} true if running, false otherwise
         */
        isProcessing: function() {
          return !this.dvm.idle;
        },
        /**
         * Send an Interrupt order
         */
        interrupt: function() {
          this.protocolInterface.interrupt();
        },
        close: function() {
          if (this.ending) {
            this.destroy();
          } else {
            this.protocolInterface.close();
          }
        },
        show: function() {
          this.appVisual[0].removeClass("gbc_Invisible");
        },
        hide: function() {
          this.appVisual[0].addClass("gbc_Invisible");
        },
        error: function() {

        },
        fail: function(ending) {
          if (ending) {
            this.applicationInfo.ending = ending;
          }
          //        self.close();
          window.setTimeout(function() {
            this.stop();
          }.bind(this));
        },
        getVMWindow: function() {
          if (this.ending) {
            return this.model.endingNode;
          }
          if (this.uiNode()) {
            return this.model.getNode(this.uiNode().attribute("currentWindow"));
          } else {
            return null;
          }
        },

        getActionApplicationService: function() {
          return this.action;
        },

        getTitle: function() {
          if (this.uiNode()) {
            return this.uiNode().attributes.text || this.uiNode().attributes.name;
          } else {
            return "New application";
          }
        },

        switchToTabbedContainer: function(node) {
          this._isTabHost = true;
          this._ui.switchToTabbedContainer(node);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        attachRootWidget: function(widget) {
          this._ui.getWidget().addChildWidget(widget);
        },
        /**
         *
         * @returns {classes.UIApplicationService}
         */
        getUI: function() {
          return this._ui;
        },

        getMenu: function(name) {
          var sessionWidget = this._ui._applicationWidget.getParentWidget();
          var applicationHostWidget = sessionWidget.getParentWidget();
          var menu = applicationHostWidget._menu;
          return name ? menu["_" + name] : menu;
        }
      };
    });
  });
