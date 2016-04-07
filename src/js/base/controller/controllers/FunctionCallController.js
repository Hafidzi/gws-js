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

modulum('FunctionCallController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FunctionCallController
     * @extends classes.ControllerBase
     */
    cls.FunctionCallController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.FunctionCallController.prototype */
      return {
        __name: "FunctionCallController",

        /**
         * @constructs
         * @param {classes.ControllerBindings} bindings
         */
        constructor: function(bindings) {
          $super.constructor.call(this, bindings);

          var functionCallNode = this.getAnchorNode();

          var moduleName = functionCallNode.attribute("moduleName").toLowerCase();
          var functionName = functionCallNode.attribute("name").toLowerCase();

          var module = context.FrontCallService.modules[moduleName];
          if (!!module) {
            var moduleFunction = module[functionName];
            if (!!moduleFunction) {
              var result = moduleFunction.apply(this, this._parseArgs());
              // If the return value of the front call isn't an array (undefined),
              // it is up to the front-call to invoke this.setReturnValues
              // This is to implement asynchonous front-calls
              if (Object.isArray(result)) {
                this.setReturnValues(result);
              }
            } else {
              functionCallNode.getApplication().error("Not implemented!", "The module function <b>frontCall." + module + "." +
                functionName +
                "</b> is not implemented");
              functionCallNode.getApplication().event(new cls.VMFunctionCallEvent(cls.VMFunctionCallEvent.unknownFunction));
            }
          } else {
            functionCallNode.getApplication().error("Not implemented!", "The module " + module + " is not implemented");
            functionCallNode.getApplication().event(new cls.VMFunctionCallEvent(cls.VMFunctionCallEvent.unknownModule));
          }
        },

        _createWidget: function() {
          return null;
        },

        _initBehaviors: function() {},

        _parseArgs: function() {
          var functionCallNode = this.getAnchorNode();
          var paramNodes = functionCallNode.getChildren();
          var params = [];
          for (var i = 0; i < paramNodes.length; ++i) {
            var paramNode = paramNodes[i];
            if (paramNode.getTag() === 'FunctionCallParameter') {
              if (paramNode.attribute('isNull')) {
                params.push(null);
              } else {
                var dataType = paramNode.attribute('dataType');
                var value = paramNode.attribute('value');
                if (dataType === 'INTEGER' || dataType === 'SMALLINT') {
                  params.push(parseInt(value));
                } else if (dataType === 'FLOAT' || dataType === 'DOUBLE') {
                  params.push(parseFloat(value));
                } else {
                  params.push(value);
                }
              }
            }
          }
          return params;
        },

        /**
         * The front call may call this method if a wrong number of parameters is given
         * @param message error message
         */
        parametersError: function(message) {
          var functionCallNode = this.getAnchorNode();
          var moduleName = functionCallNode.attribute("moduleName");
          var functionName = functionCallNode.attribute("name");
          var msg = "Wrong number of parameters when invoking '" + moduleName + "." + functionName + "'";
          if (message) {
            msg += ":\n" + message;
          }
          var event = new cls.VMFunctionCallEvent(cls.VMFunctionCallEvent.stackError, msg);
          this.getAnchorNode().getApplication().event(event);
        },

        /**
         * The front call may call this method in case of runtime errors
         * @param message error message
         */
        runtimeError: function(message) {
          var functionCallNode = this.getAnchorNode();
          var moduleName = functionCallNode.attribute("moduleName");
          var functionName = functionCallNode.attribute("name");
          var msg = "Runtime error when invoking '" + moduleName + "." + functionName + "'";
          if (message) {
            msg += ":\n" + message;
          }
          var event = new cls.VMFunctionCallEvent(cls.VMFunctionCallEvent.functionError, msg);
          this.getAnchorNode().getApplication().event(event);
        },

        /**
         * The front call may call this method to set the return values in asynchronous mode
         * @param result list of result values
         */
        setReturnValues: function(result) {
          var event = new cls.VMFunctionCallEvent(cls.VMFunctionCallEvent.success, null, result);
          this.getAnchorNode().getApplication().event(event);
        }
      };
    });
    cls.ControllerFactory.register("FunctionCall", cls.FunctionCallController);
  });
