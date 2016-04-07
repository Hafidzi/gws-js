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

modulum('ActionApplicationService', ['ApplicationServiceBase', 'ApplicationServiceFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionApplicationService
     * @extends classes.ApplicationServiceBase
     */
    cls.ActionApplicationService = context.oo.Class(cls.ApplicationServiceBase, function($super) {
      /** @lends classes.ActionApplicationService.prototype */
      return {
        __name: "ActionApplicationService",
        /** @lends classes.ActionApplicationService */
        $static: {
          _specialActions: {},
          registerSpecialAction: function(name, ctor) {
            this._specialActions[name] = ctor;
          },
          unregisterSpecialAction: function(name) {
            this._specialActions[name] = null;
          },
          /**
           * convert VM bindings to key combination that we can interpret in a browser
           * @param bindName
           * @returns {String} key combination
           */
          convertVMKeyToBrowserKey: function(bindName) {
            var key = bindName.toLowerCase();
            if (key === "return") {
              return "enter";
            }
            key = key.replace("prior", "pageup");
            key = key.replace("next", "pagedown");
            key = key.replace("-", "+");
            key = key.replace("control", "mod"); //handle mac keyboard as well
            return key;
          },
          convertBrowserKeyToVMKey: function(bindName) {
            var key = bindName.toLowerCase();
            key = key.replace("pageup", "prior");
            key = key.replace("pagedown", "next");
            key = key.replace("+", "-");
            key = key.replace("mod", "control"); //handle mac keyboard as well
            return key;
          }
        },
        _specialActions: {},
        _actions: {},
        _actionDefaults: {},

        _keyboardHelper: null,

        constructor: function(app) {
          $super.constructor.call(this, app);
          var ui = app.getUI().getWidget().getElement();
          this._keyboardHelper = context.keyboard(ui);
        },

        /**
         * Add a new action to this App Service
         * @param {node} action node
         */
        registerAction: function(action) {
          var name = action.attribute("name");
          this._actions[name] = action;
          this.registerAccelerator("acceleratorName", action);
          this.registerAccelerator("acceleratorName2", action);
          this.registerAccelerator("acceleratorName3", action);
          this.registerAccelerator("acceleratorName4", action);
          if (!!cls.ActionApplicationService._specialActions[name]) {
            this._specialActions[name] = new cls.ActionApplicationService._specialActions[name](this);
          }
        },

        /**
         * Add a new actionDefault to this App Service
         * @param {node} action node
         */
        registerActionDefault: function(action) {
          this._actionDefaults[action.attribute("name")] = action;
        },

        /**
         * Bind accelerator keys to the action
         * @param {String} acceleratorName key combination as described by the VM
         * @param {node} action node
         */
        registerAccelerator: function(acceleratorName, action) {
          var aName = action.attribute(acceleratorName);

          if (aName && aName.length > 0) {
            this._keyboardHelper.bind(cls.ActionApplicationService.convertVMKeyToBrowserKey(aName), function() {
              this.execute(action._id);
              return false;
            }.bind(this));
          }
        },

        /**
         * Remove the action and unbind accelerators
         * @param {node} action
         */
        destroyAction: function(action) {
          var name = action.attribute("name");
          // Remove all accelerator bound for this action...
          this._keyboardHelper.unbind("acceleratorName");
          this._keyboardHelper.unbind("acceleratorName2");
          this._keyboardHelper.unbind("acceleratorName3");
          this._keyboardHelper.unbind("acceleratorName4");
          // ... then delete it
          this._actions[name] = null;
          if (!!this._specialActions[name]) {
            this._specialActions[name].destroy();
            this._specialActions[name] = null;
          }
        },

        /**
         * Remove the actionDfault and unbind accelerators
         * @param {node} action
         */
        destroyActionDefault: function(action) {
          var acceleratorName = action.attribute("name");
          // ... then delete it
          delete this._actionDefaults[acceleratorName];
        },

        /**
         * Get the action by its name
         * @param {String} name of the action
         * @returns {classes.NodeBase} action node
         */
        getAction: function(name) {
          return this._actions[name];
        },

        /**
         * Test if the action is registered
         * @param {String} name of the action
         * @returns {boolean} action node
         */
        hasAction: function(name) {
          return !!this._actions[name];
        },

        /**
         * Execute an action by knowing its name
         * @param {String} name of the action
         */
        executeByName: function(name) {
          var action = this.getAction(name);
          if (!!action) {
            this.execute(action._id);
          }
        },

        /**
         * Execute an action by knowing its name
         * @param {String} name of the action
         */
        executeActionDefaultByName: function(name) {
          var action = this._actionDefaults[name];
          var accelerator = action.attribute("acceleratorName");
          var actionEvent = new cls.VMKeyEvent(accelerator);
          this._application.event(actionEvent);
        },

        /**
         * Execute an action by knowing its ID
         * @param {Number} idRef of the action
         */
        execute: function(idRef) {
          var actionEvent = new cls.VMActionEvent(idRef);
          var focusedNode = this._application.getFocusedVMNode();
          if (focusedNode) {
            var controller = focusedNode.getController();
            if (controller && controller.sendWidgetValue) {
              controller.sendWidgetValue();
            }
          }
          this._application.event(actionEvent);
        }
      };
    });
    cls.ApplicationServiceFactory.register("Action", cls.ActionApplicationService);
  });
