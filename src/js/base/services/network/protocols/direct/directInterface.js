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
     * Direct protocol interface. manages the full protocol as a state machine
     * @class classes.DirectInterface
     * @extends classes.ProtocolInterface
     */
    cls.DirectInterface = context.oo.Class({
      base: cls.ProtocolInterface
    }, function() {
      /** @lends classes.DirectInterface.prototype */
      return {
        __name: "DirectInterface",
        application: null,
        directProtocol: null,
        ping: null,
        eventQueue: null,
        eventInterval: null,
        eventIntervalTimeout: 30,
        onFirstGuiReady: null,
        directNetwork: null,
        constructor: function(application) {
          this.application = application;
          application.encapsulation = true;
          this.application.info().pingTimeout = 30000;
          this.onFirstGuiReady = [];
          this.eventQueue = [];
          var directInterface = this;
          this.directNetwork = new cls.DirectNetwork(application.info().connection);
          /**
           * The Direct protocol is managed by Finite State Machine
           * @memberOf DirectInterface
           * @see https://github.com/jakesgordon/javascript-state-machine
           */
          var directProtocol = this.directProtocol = StateMachine.create({
            /**
             * the general error handler
             */
            error: function(eventName, from, to, args, errorCode, errorMessage) {
              application.info().ending = cls.ApplicationEnding.notok("" + errorCode + ". " + errorMessage);
            },
            /**
             * the different events of the state machine
             * @see the directStates constant
             */
            events: context.constants.network.directStates,
            callbacks: {
              /**
               * whenever we leave a state
               */
              onleavestate: function(action, from, to) {
                context.LogService.networkProtocol.debug(["PROTOCOL : ", from, " -> [", action, "] -> ", to].join(""));
              },
              onreadConnectionString: function(action, from, to, data) {
                cls.DirectConnectionString.run(data, application);
                directProtocol.sendHandShake();
              },
              onenterSendHandShake: function() {
                cls.DirectHandShake.run(application, directInterface);
                window.setTimeout(function() {
                  directProtocol.getInitialAUI();
                }, 500);
              },
              onleaveSendHandShake: function(event, from, to, ending) {
                if (!ending) {
                  if (directInterface.application.ending) {
                    if (directProtocol.transition) {
                      directProtocol.transition.cancel();
                    }
                    directProtocol.waitForEnd();
                  } else {
                    directInterface.directNetwork.read(function(data) {
                      debug.log("direct", "read", data);
                      cls.DirectInitialAUI.run(data, application, function() {
                        window.setTimeout(function() {
                          application.setRunning(true);
                          directProtocol.transition();
                        }, 10);
                      });
                    });
                    return StateMachine.ASYNC;
                  }
                }
              },
              onenterRecvInitialAUI: function() {
                if (application.isProcessing()) {
                  directProtocol.waitForMoreInitialAUI();
                } else {
                  window.setTimeout(function() {
                    directProtocol.guiMode();
                  }, 10);
                }
              },
              onenterSendEmpty: function() {
                directProtocol.getMoreOrder();
              },
              onleaveSendEmpty: function() {
                if (!directInterface.application.hasError && !directInterface.application.ending) {
                  directInterface.directNetwork.read(function(data) {
                    cls.DirectRecvOrder.run(data, application, function() {
                      directProtocol.transition();
                    });
                  });
                  return StateMachine.ASYNC;
                }
              },
              onenterRecvOrder: function() {
                if (application.isProcessing()) {
                  directProtocol.waitForMoreOrder();
                } else {
                  directProtocol.guiMode();
                }
              },
              onenterGUI: function() {
                if (directInterface.application.ending) {
                  if (directProtocol.transition) {
                    directProtocol.transition.cancel();
                  }
                  directProtocol.waitForEnd();
                } else {
                  if (directInterface.onFirstGuiReady) {
                    var callbacks = directInterface.onFirstGuiReady;
                    directInterface.onFirstGuiReady = null;
                    while (callbacks.length) {
                      callbacks.splice(0, 1)[0]();
                    }
                  }
                  directInterface.ping = window.setTimeout(function() {
                    directProtocol.ping();
                  }, application.info().pingTimeout);

                  directInterface.eventInterval = window.setInterval(function() {
                    if (directInterface.eventQueue.length) {
                      directInterface.application.setProcessing();
                      window.setTimeout(function() {
                        directProtocol.sendOrder();
                      }, 10);
                      window.clearInterval(directInterface.eventInterval);
                    }
                  }, directInterface.eventIntervalTimeout);
                }
              },
              onleaveGUI: function() {
                window.clearTimeout(directInterface.ping);
                window.clearInterval(directInterface.eventInterval);
              },
              onenterSendOrder: function() {
                directProtocol.getOrderAnswer();
              },
              onleaveSendOrder: function(event, from, to) {
                if (to !== "ApplicationEnd") {
                  var orders = directInterface.eventQueue;
                  directInterface.eventQueue = [];
                  cls.DirectSendOrders.run(orders.flatten(), application, directInterface);
                  directInterface.directNetwork.read(function(data) {
                    cls.DirectRecvOrder.run(data, application, function() {
                      directProtocol.transition();
                    });
                  });
                  return StateMachine.ASYNC;
                }
              },
              /**
               * the ping doesn't take care of the answer (apart from the headers)
               */
              onenterPing: function() {
                cls.DirectPing.run(application, directInterface);
                directProtocol.pingSent();
              },
              /**
               * when the application ends, we wait for a confirmation close
               */
              onenterApplicationEnding: function() {
                directProtocol.endApp();
              },
              /**
               * until we  the application ends, we wait for a confirmation close
               */
              onleaveApplicationEnding: function(event, from, to, closed) {
                if (!closed) {
                  cls.DirectSendEndingEmpty.run(application, function() {
                    /*canRun(arguments, directProtocol, function() {
                     directProtocol.transition.cancel();
                     directProtocol.waitForEnd();
                     });*/
                  });
                  return StateMachine.ASYNC;
                }
              },
              onenterHeaderError: function(event, from, to, msg) {
                application.error("DirectNetwork error", msg);
                directProtocol.endApp();
              },
              onenterApplicationEnd: function() {
                application.stop();
              }
            }
          });
          if (!context.embedded.nwjs) {
            directProtocol.start();
          }
          application.info().connection.whenClose(function() {
            directProtocol.endApp();
          });
        },
        start: function() {
          this.directProtocol.start();
          this.directNetwork.waitForConnection(function(data) {
            this.directProtocol.readConnectionString(data);
          }.bind(this));
        },
        event: function(events) {
          if (!!events) {
            if (this.application && !this.application.ending) {
              this.eventQueue.push(events);
              var directInterface = this;
              window.clearInterval(directInterface.eventInterval);

              if (directInterface.application.isIdle() && directInterface.directProtocol.can("sendOrder")) {
                if (directInterface.eventQueue.length) {
                  directInterface.application.setProcessing();
                  directInterface.directProtocol.sendOrder();
                }
              } else {
                directInterface.eventInterval = window.setInterval(function() {
                  if (directInterface.application) {
                    if (directInterface.application.isIdle() && directInterface.directProtocol.can("sendOrder")) {
                      if (directInterface.eventQueue.length) {
                        directInterface.application.setProcessing();
                        directInterface.directProtocol.sendOrder();
                        window.clearInterval(directInterface.eventInterval);
                      }
                    }
                  } else {
                    window.clearInterval(directInterface.eventInterval);
                  }
                }, directInterface.eventIntervalTimeout);
              }
            } else {
              window.clearInterval(this.eventInterval);
            }
          }
        },
        newTask: Function.noop,
        interrupt: function() {
          this.directNetwork.write([0, 0, 0, 0, 0, 0, 0, 0, 3]);
        },
        close: function() {
          this.directNetwork.write([0, 0, 0, 0, 0, 0, 0, 0, 4]);
        },
        destroy: function() {
          window.clearTimeout(this.ping);
          window.clearInterval(this.eventInterval);
          this.application = null;
          this.eventQueue = null;
          this.directNetwork.close();
          this.directProtocol = null;
        },
        onGuiReady: function(callback) {
          if (!this.onFirstGuiReady) {
            callback();
          } else {
            this.onFirstGuiReady.push(callback);
          }
        }
      };
    });

  })(gbc, gbc.classes);
