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

modulum('ModelHelper', ['EventListener'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Helper to ease AUI tree access for customized widgets
     * Manages client side life cycle representation of the node.
     * @class classes.ModelHelper
     * @extends classes.EventListener
     */
    cls.ModelHelper = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.ModelHelper.prototype */
      return {
        __name: "ModelHelper",

        /** @type {classes.WidgetBase} */
        _widget: null,
        /** @type {?Function[]} */
        _newApplicationsListeners: null,
        /** @type {?Function[]} */
        _closeApplicationsListeners: null,
        /** @type {?Function[]} */
        _auiUpdateListeners: null,
        /** @type {?Function[]} */
        _currentWindowListeners: null,
        /** @type {?number} */
        _appHash: null,

        /**
         * Initializes the helper object. You need to provide a widget instance which will be instrumented
         * @param widget the widget to handle
         */
        constructor: function(widget) {
          $super.constructor.call(this);
          this._widget = widget;
        },

        /**
         * Registers a listener which will be called when a new application is started
         * @param listener the function to call when a new application is started
         * @returns {function(this:classes.ModelHelper)} The unregister handler. Simply call this function to stop listening for new applications
         */
        addNewApplicationListener: function(listener) {
          if (this._newApplicationsListeners === null) {
            this._newApplicationsListeners = [];
            this._newApplicationsListeners.push(listener);

            var onApplicationAdded = function(event, sender, app) {
              for (var i = 0; i < this._newApplicationsListeners.length; ++i) {
                this._newApplicationsListeners[i](app);
              }
            }.bind(this);

            context.SessionService.onSessionAdded(function(event, sender, session) {
              session.on(context.classes.VMSession.applicationAddedEvent, onApplicationAdded);
            }.bind(this));
            var session = context.SessionService.getCurrent();
            if (session) {
              session.on(context.classes.VMSession.applicationAddedEvent, onApplicationAdded);
            }
          }
          return function() {
            this._newApplicationsListeners.remove(listener);
          }.bind(this);
        },

        /**
         * Registers a listener which will be called when an application is closed
         * @param listener the function to call when an application is closed
         * @returns {function(this:classes.ModelHelper)} The unregister handler. Simply call this function to stop listening for closed applications
         */
        addCloseApplicationListener: function(listener) {
          if (this._closeApplicationsListeners === null) {
            this._closeApplicationsListeners = [];
            this._closeApplicationsListeners.push(listener);

            var onApplicationClosed = function(event, sender, app) {
              for (var i = 0; i < this._closeApplicationsListeners.length; ++i) {
                this._closeApplicationsListeners[i](app);
              }
            }.bind(this);

            context.SessionService.onSessionAdded(function(event, sender, session) {
              session.on(context.classes.VMSession.applicationRemovedEvent, onApplicationClosed);
            }.bind(this));
            var session = context.SessionService.getCurrent();
            if (session) {
              session.on(context.classes.VMSession.applicationRemovedEvent, onApplicationClosed);
            }
          }
          return function() {
            this._closeApplicationsListeners.remove(listener);
          }.bind(this);
        },

        /**
         * Registers a listener which will be called when the current window changes
         * @param listener the function to call when the current window changes
         * @returns {function(this:classes.ModelHelper)} The unregister handler. Simply call this function to stop listening for window changes
         */
        addCurrentWindowChangeListener: function(listener) {
          if (this._currentWindowListeners === null) {
            this._currentWindowListeners = [];
            this._currentWindowListeners.push(listener);

            var removeIndex = context.HostService._currentWindowChangesListeners.length;
            context.HostService._currentWindowChangesListeners.push(function(window) {
              var i = 0;
              var windowNode = null;
              var w = window;
              var appHash = null;
              while (w) {
                if (w._applicationHash !== undefined) {
                  appHash = w._applicationHash;
                  break;
                }
                w = w.getParentWidget();
              }
              if (appHash !== null) {
                var app = null;
                var session = context.SessionService.getCurrent();
                for (i = 0; i < session._applications.length; ++i) {
                  var a = session._applications[i];
                  if (a.applicationHash === appHash) {
                    app = a;
                    break;
                  }
                }
                windowNode = app.model.getNode(window._auiTag);
              }
              for (i = 0; i < this._currentWindowListeners.length; ++i) {
                this._currentWindowListeners[i](windowNode);
              }
            }.bind(this));
          }
          return function() {
            this._currentWindowListeners.splice(removeIndex, 1);
          }.bind(this);
        },

        /**
         * Registers a listener which will be called when any DVM answer is received.
         * You can update your widget in the provided callback
         * This listening method is general to all started applications. If your UI updates are heavy, prefer more fine grained update notification mechanisms
         * @param listener the function to call when a new application is started
         * @returns {function(this:classes.ModelHelper)} The unregister handler. Simply call this function to stop listening for new applications
         */
        addAuiUpdateListener: function(listener) {
          if (this._auiUpdateListeners === null) {
            this._auiUpdateListeners = [];
            this._auiUpdateListeners.push(listener);

            var dispatchUpdate = function(event) {
              for (var i = 0; i < this._auiUpdateListeners.length; ++i) {
                this._auiUpdateListeners[i](event.sender);
              }
            }.bind(this);

            context.SessionService.onSessionAdded(function(event, session) {
              session.on(context.classes.VMSession.applicationAddedEvent, function(event, app) {
                app.dvm.onOrdersManaged(dispatchUpdate);
              }.bind(this));
            }.bind(this));
            var session = context.SessionService.getCurrent();
            if (session) {
              for (var i = 0; i < session._applications.length; ++i) {
                session._applications[i].dvm.onOrdersManaged(dispatchUpdate);
              }
            }
          }
          return function() {
            this._auiUpdateListeners.remove(listener);
          }.bind(this);
        },

        /**
         * @returns {?classes.VMApplication} the currently visible application or null if it cannot be found.
         */
        getCurrentApplication: function() {
          var session = context.SessionService.getCurrent();
          if (session) {
            return session.getCurrentApplication();
          }
          return null;
        },

        /**
         * @returns {?classes.VMApplication} the VM application to which this widget is attached. null if the widget isn't below a VM application
         */
        getApplication: function() {
          if (this._appHash === null) {
            var w = this._widget;
            while (w) {
              if (w._applicationHash !== undefined) {
                this._appHash = w._applicationHash;
                break;
              }
              w = w.getParentWidget();
            }
          }
          if (this._appHash !== null) {
            var session = context.SessionService.getCurrent();
            for (var i = 0; i < session._applications.length; ++i) {
              var app = session._applications[i];
              if (app.applicationHash === this._appHash) {
                return app;
              }
            }
          }
          return null;
        },

        /**
         * @param idRef the id of the node to return
         * @returns {?classes.NodeBase} the requested node or null if it couldn't be found
         */
        getNode: function(idRef) {
          var app = this.getApplication();
          if (app) {
            return app.model.getNode(idRef);
          }
          return null;
        },

        /**
         * @returns {?classes.NodeBase} the UserInterface node of the current application or null if it coulnd't be found
         */
        getUserInterfaceNode: function() {
          return this.getNode(0);
        },

        /**
         * @returns {?classes.NodeBase} the AUI anchor node of this widget. Generally the corresponding node or the node holding the displayed value
         */
        getAnchorNode: function() {
          if (this._widget._auiTag !== null) {
            var app = this.getApplication();
            if (app) {
              return app.model.getNode(this._widget._auiTag);
            }
          }
          return null;
        },

        /**
         * Applies only to entry fields (FormField, Matrix or TableColumn)
         * @returns {?classes.NodeBase} the field node corresponding to the widget or null if it doesn't apply
         */
        getFieldNode: function() {
          var anchorNode = this.getAnchorNode();
          if (anchorNode) {
            if (anchorNode.getTag() === 'FormField') {
              return anchorNode;
            } else if (anchorNode.getTag() === 'Value') {
              return anchorNode.getParentNode().getParentNode();
            }
          }
          return null;
        },

        /**
         * Applies only to entry fields (FormField, Matrix or TableColumn)
         * A decoration node is the node holding visual information (Edit, CheckBox, ComboBox, etc...)
         * @returns {?classes.NodeBase} the decoration node corresponding to the widget or null if it doesn't apply
         */
        getDecorationNode: function() {
          var fieldNode = this.getFieldNode();
          if (fieldNode) {
            return fieldNode.getChildren()[0];
          }
          return null;
        }
      };
    });
  }
);
