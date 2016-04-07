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

(
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     *
     * @class classes.NoInterface
     * @extends classes.ProtocolInterface
     */
    cls.NoInterface = context.oo.Class({
      base: cls.ProtocolInterface
    }, function() {
      /** @lends classes.NoInterface.prototype */
      return {
        __name: "NoInterface",
        application: null,
        uaProtocol: null,
        ping: null,
        eventQueue: null,
        eventInterval: null,
        eventIntervalTimeout: 3000,
        onFirstGuiReady: null,
        applicationEnding: null,
        taskCount: 0,
        _eventListener: null,
        constructor: function(application) {
          this.eventQueue = [];
          this._eventListener = new cls.EventListener();
        },
        start: Function.noop,
        event: function(events) {
          if (!!events) {
            this.eventQueue = this.eventQueue.concat(events);
            window.clearInterval(this.eventInterval);

            this.eventInterval = window.setInterval(function() {
              if (this.eventQueue.length) {
                this._eventListener.emit("events", this.eventQueue);
                window.clearInterval(this.eventInterval);
              } else {
                window.clearInterval(this.eventInterval);
              }
            }.bind(this), this.eventIntervalTimeout);
          } else {
            window.clearInterval(this.eventInterval);
          }
        },
        newTask: Function.noop,
        interrupt: Function.noop,
        close: Function.noop,
        destroy: Function.noop,
        onGuiReady: function(callback) {},

        /**
         * Returns the queued events and clears the event list.
         * @returns {classes.VMEvent[]} list of events to send to the VM
         */
        fetchEvents: function() {
          var events = this.eventQueue;
          this.eventQueue = [];
          return events;
        },
        onEvents: function(hook) {
          return this._eventListener.on("events", hook);
        }
      };
    });

  })(gbc, gbc.classes);
