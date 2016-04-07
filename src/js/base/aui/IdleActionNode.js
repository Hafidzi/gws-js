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

modulum('IdleActionNode', ['NodeBase', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.IdleActionNode
     * @extends classes.NodeBase
     */
    cls.IdleActionNode = context.oo.Class(cls.NodeBase, function($super) {
      /** @lends classes.IdleActionNode.prototype */
      return {

        _timer: null,
        _timeout: 1000,
        _suffix: null,

        constructor: function(parent, tag, id, attributes, app) {
          $super.constructor.call(this, parent, tag, id, attributes, app);
          this._isTimer = this.attribute("isTimer");

          this._suffix = "idleAction_" + id;

          var timeoutAttr = this.attribute("timeout");
          if (timeoutAttr > 0) {
            var timeout = timeoutAttr * 1000 || this._timeout;
            this.setTimeout(timeout);

            if (this._isTimer) {
              this.start();
            } else {
              this.activate();
            }
          }
        },

        /**
         * Stop the timer and start it again
         */
        reset: function() {
          this.stop();
          this._timer = window.setTimeout(this.onTimer.bind(this), this._timeout);
        },

        /**
         * Stop the timer
         */
        stop: function() {
          if (this._timer) {
            window.clearTimeout(this._timer);
          }
        },

        /**
         * Start the timer
         * note: alias for reset()
         */
        start: function() {
          this.reset();
        },

        /**
         * Check if timer is running
         * @returns {Boolean} true if running, false otherwise
         */
        isRunning: function() {
          return !!this._timer;
        },

        /**
         * Define the timeout value for this timer
         * @param {Number} timeout time in ms
         */
        setTimeout: function(timeout) {
          this._timeout = timeout;
          if (this.isRunning()) {
            this.reset();
          }
        },

        /**
         * Action trigged when timer is over: send the event to the VM
         */
        onTimer: function() {
          //Do not send the event if the parent container is not active
          if (this.getParentNode() && this.getParentNode().attribute("active")) {
            this.getApplication().action.execute(this.getId());
          }
          this.start();
        },

        /**
         * Activate the area where the idle will be caught
         */
        activate: function() {
          this._application._ui.getWidget().getElement()
            .on("mousemove." + this._suffix, function() {
              this.reset();
            }.bind(this))
            .on("mousedown." + this._suffix, function() {
              this.reset();
            }.bind(this))
            .on("keydown." + this._suffix, function() {
              this.reset();
            }.bind(this));
          this.start();
        },

        /**
         * Desactivate the area where the idle wont be caught
         */
        desactivate: function() {
          this._application._ui.getWidget().getElement()
            .off("mousemove." + this._suffix)
            .off("mousedown." + this._suffix)
            .off("keydown." + this._suffix);
          this.stop();
        }
      };
    });
    cls.NodeFactory.register("IdleAction", cls.IdleActionNode);
  });
