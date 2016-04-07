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

modulum('FrontCallService.modules.webcomponent', ['FrontCallService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    context.FrontCallService.modules.webcomponent = {

      call: function() {
        var parameters = Array.prototype.slice.call(arguments);
        if (parameters.length > 0) {
          var app = this.getAnchorNode().getApplication();
          var webComponentTarget = parameters.shift();
          //search for the target Node
          var targetNode = app.model.getNodeByAttribute("name", webComponentTarget);

          // Once we've managed Orders
          var orderManagedHandle = app.dvm.onOrdersManaged(function() {
            orderManagedHandle();
            var widget = targetNode.getController().getWidget();

            var process = function(widget, parameters) {
              var ret = "";
              var functionName = parameters.shift();

              try {
                var fct = widget._iframeElement.contentWindow[functionName];
                if (typeof(fct) === "function") {
                  ret = fct.apply(null, parameters);
                } else {
                  this.runtimeError("No function [" + functionName + "] defined in this webcomponent.");
                }
              } catch (e) {
                this.runtimeError(e.message);
              }
              this.setReturnValues([ret]);
            }.bind(this);

            // If the webcomponent is ready
            if (widget._isReady) {
              process(widget, parameters);
            } else {
              // Otherwise, we wait that it becomes ready
              var readyHandle = widget.on(context.constants.widgetEvents.ready, function() {
                readyHandle();
                process(widget, parameters);
              }.bind(this));
            }
          }.bind(this));
        } else {
          this.runtimeError("No webcomponent name provided");
        }
      },

      frontCallAPIVersion: function() {
        return [cls.WebComponentWidget.gICAPIVersion];
      },

      getTitle: function(webComponentTarget) {
        if (webComponentTarget) {
          var targetNode = this.getAnchorNode().getApplication().model.getNodeByAttribute("name", webComponentTarget);
          var domElement = targetNode.getController().getWidget()._iframeElement;
          try {
            return [domElement.contentWindow.document.title];
          } catch (e) {
            this.runtimeError(e.message);
          }
        } else {
          this.runtimeError("No webcomponent name provided");
        }
      }
    };
  }
);
