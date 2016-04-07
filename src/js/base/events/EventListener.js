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

/**
 * @typedef {Function} HandleRegistration
 */
modulum('EventListener', ['Event'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.EventListener
     * @classdesc A base class to support eventing
     */
    cls.EventListener = context.oo.Class(function() {
      var listenerIdentifier = 0,
        listeners = new Array(1000000);
      /** @lends classes.EventListener.prototype */
      return {
        __name: "EventListener",
        /** @lends classes.EventListener */
        $static: {
          stats: {
            added: 0,
            removed: 0,
            count: 0
          }
        },
        /**
         * @type {Object}
         * @private
         */
        _events: null,

        _handles: null,
        /**
         * initializes event system
         * @constructs {classes.EventListener}
         */
        constructor: function() {
          this._events = {};
        },
        /**
         *
         */
        destroy: function() {
          this._events = null;
        },
        /**
         *
         * @param {String} type
         * @param {...any} arguments - arguments (excluding type) will be set in event.data
         */
        emit: function(type, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
          if (this._events && this._events[type]) {
            var event = new cls.Event(type);
            event.data = [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9];
            //var handlerArgs = [event, this];
            /*            for (var iterator = 1; iterator < arguments.length; iterator++) {
                          handlerArgs[iterator + 1] = event.data[iterator - 1] = arguments[iterator];
                        }*/
            var list = this._events[type].slice();
            for (var i = 0; i < list.length; i++) {
              var handler = listeners[list[i]];
              if (!!handler && !event.cancel) {
                handler.call(this, event, this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
              }
            }
          }
        },
        /**
         * registers a handler for this event type
         * @param {String} type - event type (e.g. "attribute changed")
         * @param {Function} handler - handler to trigger when the event type is emitted
         * @returns {HandleRegistration} a registration handle (for unbind purpose)
         */
        on: function(type, handler) {
          cls.EventListener.stats.added++;
          cls.EventListener.stats.count++;
          var ident = listenerIdentifier++;
          this._events[type] = this._events[type] || [];
          this._events[type].push(ident);
          listeners[ident] = handler;
          return this._off.bind(this, type, ident);
        },
        _off: function(type, ident) {
          cls.EventListener.stats.removed++;
          cls.EventListener.stats.count--;
          listeners[ident] = null;
        }
      };
    });
  });
