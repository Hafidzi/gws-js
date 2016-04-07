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

modulum('SessionService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.SessionService
     */
    context.SessionService = context.oo.Singleton( /** @lends gbc.SessionService */ {
      __name: "SessionService",

      sessionAdded: "sessionAdded",
      sessionRemoved: "sessionRemoved",

      _identifier: 0,
      /**
       * @type {classes.VMSession[]}
       */
      _sessions: null,
      _bySessionId: null,
      _eventListener: null,
      init: function() {
        this._eventListener = new cls.EventListener();
        this._sessions = [];
        this._bySessionId = {};
      },
      /**
       *
       * @param appName
       * @param params
       * @returns {classes.VMSession}
       */
      start: function(appName, params) {
        var session = new cls.VMSession(this._identifier++);
        this._eventListener.emit(this.sessionAdded, session);
        session.start(appName, params);
        this._sessions.push(session);
        context.HostService.displaySession();
        return session;
      },
      startDirect: function(connection) {
        var session = null;
        if (this._sessions.length) {
          session = this._sessions[0];
        } else {
          session = new cls.VMSession(this._identifier++);
          this._sessions.push(session);
          this._eventListener.emit(this.sessionAdded, session);
          context.HostService.displaySession();
        }
        session.startDirect(connection);
        return session;
      },
      fromSessionId: function(id) {
        return this._bySessionId[id];
      },
      updateSessionId: function(session, id) {
        this._bySessionId[id] = session;
      },
      remove: function(session) {
        this._bySessionId[session.getSessionId()] = null;
        this._sessions.remove(session);
        this._eventListener.emit(this.sessionRemoved, session);
        if (!this._sessions.length) {
          context.HostService.displayNoSession();
        }
      },
      /**
       * Return active sessions
       * @returns {classes.VMSession[]}
       */
      getSessions: function() {
        return this._sessions;
      },
      /**
       *
       * @returns {classes.VMSession}
       */
      getCurrent: function() {
        return this._sessions[this._sessions.length - 1];
      },
      onSessionAdded: function(hook) {
        return this._eventListener.on(this.sessionAdded, hook);
      },
      onSessionRemoved: function(hook) {
        return this._eventListener.on(this.sessionRemoved, hook);
      }
    });
    context.InitService.register(context.SessionService);
  });
