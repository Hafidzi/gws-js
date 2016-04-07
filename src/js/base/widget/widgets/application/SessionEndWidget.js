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

modulum('SessionEndWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.SessionEndWidget
     * @extends classes.WidgetBase
     */
    cls.SessionEndWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.SessionEndWidget.prototype */
      return {
        __name: "SessionEndWidget",
        /** @lends classes.SessionEndWidget */
        $static: {
          restartEvent: "g_restart"
        },
        _initElement: function() {
          $super._initElement.call(this);
          this._element.querySelector(".closeApplicationEnd").on("click.SessionEndWidget", function() {
            this.emit(context.constants.widgetEvents.close);
          }.bind(this));
          this._element.querySelector(".restartApp").on("click.SessionEndWidget", function() {
            this.emit(cls.SessionEndWidget.restartEvent);
          }.bind(this));
        },
        showSessionActions: function() {
          this._element.querySelector(".from-session").removeClass("hidden");
        },
        showUAActions: function() {
          this._element.querySelector(".from-ua").removeClass("hidden");
        },
        setHeader: function(message) {
          this._element.querySelector(".mt-card-header-text").innerHTML = message;
        },
        setMessage: function(message) {
          var messageElt = this._element.querySelector(".message");
          messageElt.removeClass("hidden");
          messageElt.innerHTML = message;
        },
        setSessionID: function(id) {
          this._element.querySelector(".session").removeClass("hidden");
          this._element.querySelector(".sessionID").textContent = id;
        },
        setSessionLinks: function(base, session) {
          this._element.querySelector(".uaLink>a").setAttribute("href", base + "/monitor/log/uaproxy-" + session);
          this._element.querySelector(".vmLink>a").setAttribute("href", base + "/monitor/log/vm-" + session);
        }
      };
    });
    cls.WidgetFactory.register('SessionEnd', cls.SessionEndWidget);
  });
