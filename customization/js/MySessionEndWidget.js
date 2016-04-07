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

modulum('MySessionEndWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MySessionEndWidget
     * @extends classes.WidgetBase
     */
    cls.MySessionEndWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.MySessionEndWidget.prototype */
      return {
        __name: "MySessionEndWidget",

        _initElement: function() {
          $super._initElement.call(this);
          this._element.querySelector(".myCloseButton").on("click", function() {
            this.emit(context.constants.widgetEvents.close);
          }.bind(this));
          this._element.querySelector(".myRestartButton").on("click", function() {
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
          this._element.querySelector(".myHeader").innerHTML = message;
        },

        setMessage: function(message) {
          var messageElt = this._element.querySelector(".myMessage");
          messageElt.removeClass("hidden");
          messageElt.innerHTML = message;
        },

        setSessionID: function(id) {
          var sessionIdElt = this._element.querySelector(".mySessionID");
          sessionIdElt.removeClass("hidden");
          sessionIdElt.textContent = id;
        },

        setSessionLinks: function(base, session) {
          this._element.querySelector(".myUaLink>a").setAttribute("href", base + "/monitor/log/uaproxy-" + session);
          this._element.querySelector(".myVmLink>a").setAttribute("href", base + "/monitor/log/vm-" + session);
        }
      };
    });
    cls.WidgetFactory.register('SessionEnd', cls.MySessionEndWidget);
  });
