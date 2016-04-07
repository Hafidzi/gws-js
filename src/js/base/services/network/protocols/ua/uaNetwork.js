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

/*
 TODO : documentation
 UA protocol network helpers
 */

(
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.UANetwork
     * @desc Standardized queries to access ua proxy
     */
    cls.UANetwork = context.oo.Singleton(function() {

      /** @lends classes.UANetwork */
      var httpQueries = {
        /**
         * send start query
         * /ua/r?frontEndId1=...&frontEndId2=...
         */
        start: {
          verb: "GET",
          action: "r",
          uriPart: function(application) {
            var info = application.info();
            //var parts = [info.appId, "?Bootstrap=done&frontEndId1=", info.frontEndId1, "&frontEndId2=", info.frontEndId2].join("");
            var parts = [info.appId, "?Bootstrap=done"].join("");
            var args = info.urlParameters.Arg;
            if (args) {
              parts += "&Arg=" + (Object.isArray(args) ? args : [args]).join("&Arg=");
            }
            return parts;
          }
        },
        /**
         * send start new task
         * /ua/sua/session_id?appId=...&pageId=1
         * post data : empty
         */
        runTask: {
          verb: "POST",
          action: "sua",
          uriPart: function(application) {
            var info = application.info();
            if (info.app === context.__lastNewtaskRun) {
              return null;
            } else {
              context.__lastNewtaskRun = info.app;
            }
            return [info.session, "?appId=", (info.app || 0), "&pageId=1"].join("");
          }
        },
        /**
         * send aui order(s)
         * /ua/sua/session_id?appId=...&pageId=...
         * post data : aui order(s)
         */
        auiOrder: {
          verb: "POST",
          action: "sua",
          appId: true,
          pageId: true
        },
        /**
         * send empty request
         * /ua/sua/session_id?appId=...&pageId=...
         * post data : empty
         */
        empty: {
          verb: "POST",
          action: "sua",
          appId: true,
          pageId: true
        },
        /**
         * send ping
         * /ua/ping/session_id?appId=...
         * post data : empty
         */
        ping: {
          verb: "POST",
          appId: true
        },
        /**
         * send interrupt
         * /ua/interrupt/session_id?appId=...
         * post data : empty
         */
        interrupt: {
          verb: "POST",
          appId: true
        },
        /**
         * send close
         * /ua/close/session_id?appId=...
         * post data : empty
         */
        close: {
          verb: "POST",
          appId: true
        },
        /**
         * send new task query
         * /ua/newtask/session_id
         */
        newTask: {
          verb: "GET",
          action: "newtask"
        }
      };
      var methods = {};
      var createQuery = function(query, info) {
        methods[query] = function(query, info, application, callback, data, httpOptions, options) {
          var appInfo = application.info();

          // Manage server prefix for cgi
          var uriPart = (info.uriPart ?
            info.uriPart(application, options) :
            (appInfo.session + (info.appId ? "?appId=" + (appInfo.app || 0) + (info.pageId ? "&pageId=" + appInfo.page++ : "") :
              ""))
          );
          if (!uriPart) {
            return;
          }
          var url = ((appInfo.customUA || appInfo.connector) + "/ua/") + (info.action || query) + "/" +
            uriPart;
          var logMessage = [query, info.verb, url].join(" : ");
          context.LogService.networkProtocol.debug("%cHTTP REQUEST  : " + logMessage, "background: #222; color: #DDD", data);
          //context.$log.network.log("UAProtocol", logMessage, data);

          var sendAjax = Object.merge({
            type: info.verb,
            url: url,
            data: data,
            //contentType: "application/octet-stream;charset=utf-8",
            //dataType: "arraybuffer",
            processData: false
          }, Object.isObject(httpOptions) ? httpOptions : {});

          var invalid = false;
          if (!appInfo.hadNetworkActivity) {
            var requestTimeout = window.setTimeout(function() {
              invalid = true;
              appInfo.ending = cls.ApplicationEnding.notok(
                "Request Timeout. Either the server is not responding or a cross-domain call was intended.");
              callback();
            }, 20000); // TODO customize timeout
          }
          $.ajax(sendAjax)
            .done(function(invalid, appInfo, logMessage, responseData, arg1, arg2, arg3, arg4, arg5, arg6) {
              if (!invalid) {
                if (!appInfo.hadNetworkActivity) {
                  window.clearTimeout(requestTimeout);
                  appInfo.hadNetworkActivity = true;
                }
                context.LogService.networkProtocol.debug("%cHTTP RESPONSE : " + logMessage, "background: #222; color: #AFA",
                  responseData);
                //context.$log.network.log("UAProtocol", "From:" + logMessage, responseData);
                if (callback) {
                  window.requestAnimationFrame(function(callback, callbackData) {
                    callback.apply(null, callbackData);
                  }.bind(null, callback, [responseData, arg1, arg2, arg3, arg4, arg5, arg6]));
                }
              }
            }.bind(null, invalid, appInfo, logMessage))
            .fail(function(jqXHR, textStatus, errorThrown) {
              if (!invalid) {
                if (!appInfo.hadNetworkActivity) {
                  window.clearTimeout(requestTimeout);
                  appInfo.hadNetworkActivity = true;
                }
                context.LogService.network.log("HTTP", "Network error (" + textStatus + ")", errorThrown);
                context.LogService.networkProtocol.debug(["%cHTTP REQUEST ERROR", textStatus].join(" : "),
                  "background: #222; color: #FAA",
                  errorThrown);
                application.error("HTTP", "Network error (" + textStatus + ")", jqXHR);

                if (jqXHR.status === 404) {
                  if (application.protocolInterface.isRunning) {
                    appInfo.ending = cls.ApplicationEnding.notok("Session does not exist.");
                  } else {
                    appInfo.ending = cls.ApplicationEnding.notFound;
                  }
                } else if (jqXHR.status === 403) {
                  appInfo.ending = cls.ApplicationEnding.forbidden;
                } else {
                  appInfo.ending = cls.ApplicationEnding.notok(errorThrown);
                }
                callback.apply(null, [jqXHR, textStatus, errorThrown]);
              }
            });
        }.bind(null, query, info);
      };
      var queryKeys = Object.keys(httpQueries);
      for (var i = 0; i < queryKeys.length; i++) {
        var query = queryKeys[i];
        var info = httpQueries[query];
        /**
         * For each sub cited methods, the same signature
         * @param application the current application
         * @param callback the callback in case of success
         * @param data the payload to send
         * @param httpOptions the http request options (like headers) to send
         * @param options additional options to construct the query
         */
        createQuery(query, info);
      }
      return Object.merge({
        __name: "UANetwork"
      }, methods);
    });
  })(gbc, gbc.classes);
