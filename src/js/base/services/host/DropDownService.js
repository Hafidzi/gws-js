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

modulum('DropDownService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.DropDownService
     */
    context.DropDownService = context.oo.Singleton( /** @lends gbc.DropDownService */ {
      __name: "DropDownService",
      /**
       * @type classes.DropDownContainerWidget
       */
      _containers: [],
      _listeningSession: false,
      _listeners: null,
      init: function() {
        this._createContainer();
      },
      /**
       *
       * @returns {classes.DropDownContainerWidget}
       */
      getCurrentContainer: function() {
        return this._containers[this._containers.length - 1];
      },

      /**
       *
       * @returns {classes.DropDownWidget}
       */
      getCurrentContainerDropDown: function() {
        return this.getCurrentContainer().getCurrentDropDown();
      },

      /**
       * Set active dropdown container (latest level of visible dropdown)
       * @param {classes.WidgetBase} widget
       */
      setCurrentContainerDropDown: function(widget) {
        if (this.getCurrentContainerDropDown() !== widget) {
          this.getCurrentContainer().addChildWidget(widget);
        }
      },

      /**
       * Create new Dropdown container
       * @private
       */
      _createContainer: function() {
        var widget = cls.WidgetFactory.create("DropDownContainer");

        if (this._containers.length > 0) {
          widget.setParentWidget(this.getCurrentContainer().getElement());
        }
        document.body.appendChild(widget.getElement());

        this._containers.push(widget);
      },

      /**
       *
       * @param session
       * @private
       */
      _onSessionAdded: function(session) {
        if (session) {
          session.appsListeners = [];
          session.appsListeners.push(session.getCurrentApplication().layout.afterLayout(this.clean.bind(this)));
          //session.appsListeners.push(session.onApplicationAdded(this.clean));
          //session.appsListeners.push(session.onApplicationRemoved(this.clean));
        }
      },

      /**
       *
       * @param session
       * @private
       */
      _onSessionRemoved: function(session) {
        if (session && session.appsListeners && session.appsListeners.length > 0) {
          var listeners = session.appsListeners;
          for (var i = 0; i < listeners.length; i++) {
            var h = listeners[i];
            h();
          }
          session.appsListeners.length = 0;
        }
      },

      /**
       * Add listeners from application/session layout events
       * @private
       */
      _startListeningApplicationsUpdate: function() {
        if (!this._listeners || this._listeners.length === 0) {
          this._listeners = [];
          this._listeners.push(context.SessionService.onSessionAdded(this._onSessionAdded));
          this._listeners.push(context.SessionService.onSessionRemoved(this._onSessionRemoved));
          this._onSessionAdded(context.SessionService.getCurrent());
        }
      },

      /**
       * Remove listeners from application/session layout events
       * @private
       */
      _stopListeningApplicationsUpdate: function() {
        if (this._listeners && this._listeners.length > 0) {
          var i, sessions = context.SessionService.getSessions(),
            listeners = this._listeners;
          for (i = 0; i < sessions.length; i++) {
            this._onSessionRemoved(sessions[i]);
          }
          for (i = 0; i < listeners.length; i++) {
            listeners[i]();
          }
          this._listeners.length = 0;
        }
      },

      /**
       * Return index of dropdown in ordered _containers array
       * @param {cls.DropDownWidget} dropdown
       * @returns {number}
       */
      getDropDownIndex: function(dropdown) {
        for (var d = this._containers.length - 1; d > -1; d--) {
          var containerChildren = this._containers[d].getChildren();
          if (containerChildren.length > 0) {
            var children = containerChildren[0].getChildren();
            for (var i = 0; i < children.length; i++) {
              if (children[i] === dropdown) {
                return d;
              }
            }
          }
        }
        return -1;
      },

      /**
       * Destroy (clean handlers and remove from DOM) all dropdown located after dropdownIndex if specified
       * @param {integer} all dropdowns have index (in _containers array) higher than dropdownIndex will be destroyed
       */
      removeDropDowns: function(dropdownIndex) {
        var ind = dropdownIndex + 1 || 1;
        while (this._containers.length > ind) {
          var current = this.getCurrentContainer();
          current.empty();
          this._containers.remove(current);
          document.body.removeChild(current.getElement());
        }
        if (dropdownIndex === undefined || dropdownIndex === -1) {
          var currentDD = this.getCurrentContainerDropDown();
          if (currentDD) {
            currentDD.resetUserClick();
          }
          var curr = this.getCurrentContainer();
          curr.empty();
        }
      },

      /**
       * Unbind listeners on all current dropdowns and destroy them
       * @param event
       * @param src
       * @param resize
       */
      clean: function(event, src, resize) {
        if (resize === true) {
          var currentParent = this.getCurrentContainerDropDown().getParentWidget();
          this.getCurrentContainer().show(currentParent, null, false);
          this._stopListeningApplicationsUpdate();
          this.removeDropDowns();
        }
      },

      /**
       * @param {cls.DropDownWidget} dropdown
       * @returns {boolean}
       */
      isDropDownVisible: function(dropdown) {
        return context.DropDownService.getCurrentContainerDropDown() === dropdown;
      },

      /**
       * @param {classes.WidgetBase} parent
       * @param {classes.DropDownWidget} widget
       * @param {boolean} visible
       */
      showDropDown: function(parent, widget, visible) {
        if (visible) {
          var parentDropDownIndex = this.getDropDownIndex(parent);
          this.removeDropDowns(parentDropDownIndex);
          if (parentDropDownIndex > -1) {
            this._createContainer();
          }
          this.setCurrentContainerDropDown(widget);
        } else {
          this._stopListeningApplicationsUpdate();
          this.removeDropDowns();
          widget.emit(context.constants.widgetEvents.close);
        }

        this.getCurrentContainer().show(parent, widget, visible);

        if (visible) {
          widget.emit(context.constants.widgetEvents.ready);
          this._startListeningApplicationsUpdate();
          //cls.KeyboardHelper.keyboardNavigation(parent.getElement(), widget);
        }

      }

    });
    context.InitService.register(context.DropDownService);
  });
