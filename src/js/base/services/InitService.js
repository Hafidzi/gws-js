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

modulum('InitService', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.InitService
     */
    context.InitService = context.oo.Singleton( /** @lends gbc.InitService */ {
      __name: "InitService",

      _services: [],
      create: function(auiData, app) {
        app = app || context.MockService.fakeApplication();
        var nodes = gbc.classes.NodeFactory.createRecursive(null, auiData, app);
        var node = nodes[0];
        node.createController();
        for (var i = 0; i < nodes.length; i++) {
          var ctrl = nodes[i].getController();
          if (ctrl) {
            ctrl.createWidget();
          }
        }
        return node;
      },
      register: function(service) {
        this._services.push(service);
      },
      record: function() {
        context.keyboard.onKey(this._whenKeyboard.bind(this));

      },
      _whenKeyboard: function(sequence) {
        sequence = cls.ActionApplicationService.convertBrowserKeyToVMKey(sequence);
        context.FocusService.focusChange(this._sendEvent.bind(this, sequence));
      },
      _sendEvent: function(sequence) {
        context.SessionService.getCurrent().getCurrentApplication().event(new cls.VMKeyEvent(sequence));
      },
      initServices: function() {
        this.record();
        for (var i = 0; i < this._services.length; i++) {
          this._services[i].init();
        }
      },
      _id: {
        default_: 0
      },
      uniqueId: function(prefix, useDebugFormat) {
        if (!!prefix && !this._id[prefix]) {
          this._id[prefix] = 0;
        }
        if (useDebugFormat) {
          return uuid.v4().replace(/-/g, "_");
        }
        return (prefix || "") + (++this._id[prefix || "default_"]);
      }
    });
  });
