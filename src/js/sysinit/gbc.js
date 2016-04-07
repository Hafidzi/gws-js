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
   * @param {Window} context
   */
  function(context) {

    /**
     * @namespace classes
     */
    var classes = jsface.Singleton({});

    /**
     * @class gbc
     */
    var gbc = jsface.Singleton(
      /** @lends gbc */
      {
        __name: "gbc",
        /**
         * @type {jsface}
         */
        oo: jsface,
        keyboard: window.mousetrapped,
        version: "%%VERSION%%" || "none",
        build: "%%BUILD%%" || "none",
        tag: "%%TAG%%" || "dev-snapshot",
        dirtyFlag: "%%DIRTY%%" || "",
        prodMode: "%%PROD%%",
        bootstrapInfo: window.__gbcBootstrap || {},
        embedded: window.embeddedInfo,
        /**
         * @type classes
         */
        classes: classes,
        constants: {},
        errorCount: 0,
        jsErrorCount: 0,
        preStart: function() {
          context.gbc.HostService.wrapGlobalErrors();
          if (typeof context.gbc.bootstrapInfo.debug !== "boolean") {
            context.gbc.bootstrapInfo.debug = context.gbc.bootstrapInfo.debug === "true";
          }
          if (context.gbc.prodMode === "prod" && !context.gbc.bootstrapInfo.debug) {
            context.gbc.LogService.registerLogProvider(new classes.NoLogProvider(), "networkProtocol");
            context.gbc.LogService.registerLogProvider(new classes.NoLogProvider(), "network");
            context.gbc.LogService.registerLogProvider(new classes.NoLogProvider(), "VM");
            context.gbc.LogService.registerLogProvider(new classes.NoLogProvider(), null);
          } else {
            context.gbc.LogService.registerLogProvider(new classes.ConsoleLogProvider(), "networkProtocol");
            context.gbc.LogService.registerLogProvider(new classes.NetworkLogProvider(), "network");
            context.gbc.LogService.registerLogProvider(new classes.VMLogProvider(), "VM");
            context.gbc.LogService.registerLogProvider(new classes.BufferedConsoleLogProvider(), null);
          }
          if (context.gbc.bootstrapInfo.debug) {
            window.gbcNode = function(elementOrIdRef) {
              if (typeof(elementOrIdRef) === 'object') {
                var element = elementOrIdRef;
                while (element) {
                  var classList = element.classList;
                  for (var i = 0; i < classList.length; ++i) {
                    var cls = classList[i];
                    if (cls.startsWith("aui__")) {
                      var id = parseInt(cls.substr(5));
                      return context.gbc.SessionService.getCurrent().getCurrentApplication().getNode(id);
                    }
                  }
                  element = element.parentElement;
                }
                return null;
              } else {
                return context.gbc.SessionService.getCurrent().getCurrentApplication().getNode(elementOrIdRef);
              }
            };
            window.gbcController = function(elementOrIdRef) {
              var node = window.gbcNode(elementOrIdRef);
              return node ? node.getController() : null;
            };
            window.gbcWidget = function(elementOrIdRef) {
              var controller = window.gbcController(elementOrIdRef);
              return controller ? controller.getWidget() : null;
            };
          }
        },
        start: function() {
          document.body.addClass("flexible_host_stretch_row");
          if (gbc.DebugService.isMonitorWindow()) {
            return;
          }
          context.gbc.HostService.start();
        },
        run: function() {
          modulum.assemble();
          gbc.InitService.initServices();
          gbc.preStart();
          var start = function() {
            gbc.start();
          };
          if (Object.isFunction(context.__gbcDefer)) {
            context.__gbcDefer(start);
          } else {
            window.requestAnimationFrame(start);
          }
        },
        errors: [],
        showExitWarning: function() {
          if (!context.__desactivateEndingPopup && !context.gbc.bootstrapInfo.debug && gbc.SessionService.getCurrent() && gbc.SessionService
            .getCurrent().getCurrentApplication()) {
            return "The Genero application is still running.\n" +
              "If you leave now, some data may be lost.\n" +
              "Please use the application user interface to exit the application before navigating away from this page.";
          }

        }
      });

    var callback = function(stackframes) {
      console.log("ERROR");
      var stringifiedStack = stackframes.map(function(sf) {
        return sf.toString();
      }).join('\n');
      console.log(stringifiedStack);
    };

    var errback = function(err) {
      console.error(err);
    };
    gbc.error = function(errorText, error) {
      console.log(errorText);
      if (window.StackTrace) {
        window.StackTrace.fromError(error).then(callback).catch(errback);
      }
    };
    context.onerror = function(msg, file, line, col, error) {
      gbc.error(error);
    };

    gbc.stack = function() {
      if (window.StackTrace) {
        window.StackTrace.generateArtificially().then(callback).catch(errback);
      }
    };

    context.onbeforeunload = function() {
      return gbc.showExitWarning();
    };
    modulum.inject(gbc, gbc.classes);
    window.addEventListener('unload', function() {
      gbc.DebugService.destroy();
    });
    window.gbc = gbc;
  })(window);
