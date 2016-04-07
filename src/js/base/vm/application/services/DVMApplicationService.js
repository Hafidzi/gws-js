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

modulum('DVMApplicationService', ['ApplicationServiceBase', 'ApplicationServiceFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Application Service to manage DVM interactions for an application
     *
     * @class classes.DVMApplicationService
     * @extends classes.ApplicationServiceBase
     */
    cls.DVMApplicationService = context.oo.Class(cls.ApplicationServiceBase,
      function($super) {

        /** @lends classes.DVMApplicationService.prototype */
        return {
          /** @lends classes.DVMApplicationService */
          $static: {
            attributeChangedEvent: "attributeChanged",
            ordersManagedEvent: "ordersManaged"
          },

          __name: "DVMApplicationService",
          /** Indicator to know if DVM is idle or not */
          idle: true,
          eventListener: null,
          constructor: function(app) {
            $super.constructor.call(this, app);
            this.eventListener = new cls.EventListener();
          },

          destroy: function() {
            $super.destroy.call(this);
          },

          onOrdersManaged: function(hook) {
            return this.eventListener.on(cls.DVMApplicationService.ordersManagedEvent, hook);
          },
          /**
           * Find and check if Order is an om order
           * @param {Object}   order       Order Object
           */
          readOrder: function(order) {
            if (order.type !== "om") {
              throw "Received auiTree bad format : " + order;
            }
            return this.manageAuiOrder(order);
          },
          manageAuiOrders: function(data, callback) {
            var vmMessages = cls.AuiProtocolReader.translate(data);
            styler.bufferize();
            var needLayout = false;
            while (vmMessages.length) {
              if (this._application) {
                needLayout = this.readOrder(vmMessages.shift()) || needLayout;
              }
            }
            var rootNode = this._application && this._application.getNode(0);
            if (!!rootNode) {
              rootNode.emit(cls.DVMApplicationService.attributeChangedEvent + "runtimeStatus", {
                node: rootNode,
                attr: "runtimeStatus",
                old: rootNode.attribute('runtimeStatus', true),
                new: rootNode.attribute('runtimeStatus'),
                changed: rootNode.attribute('runtimeStatus', true) !== rootNode.attribute('runtimeStatus')
              });
              if (this._application.styleListsChanged) {
                rootNode.updateApplicableStyles(true);
                this._application.styleListsChanged = false;
              }
              rootNode.applyBehaviors(true);
            }
            styler.flush();
            //context.ui.layout();
            //            window.requestAnimationFrame(function() {
            if (needLayout) {
              this._application.layout.refresh();
            }
            if (!!callback) {
              callback();
            }
            if (this._application && context.SessionService.getCurrent().getCurrentApplication() === this._application) {
              window.requestAnimationFrame(function() {
                context.FocusService.restoreVMFocus(this._application);
              }.bind(this));
            }
            this.eventListener.emit(cls.DVMApplicationService.ordersManagedEvent);
            //      }.bind(this));
          },
          manageAuiOrder: function(order) {
            var result = false,
              node;
            var createdNodes = [];
            var updatedNodes = [];
            for (var index = 0; index < order.operations.length; index++) {
              var cmd = order.operations[index];
              switch (cmd.type) {
                case "update":
                  updatedNodes.push(node = this._application.model.commandUpdate(cmd));
                  break;
                case "add":
                  createdNodes.push(node = this._application.model.commandAdd(cmd));
                  break;
                case "remove":
                  node = null;
                  var toDestroy = this._application.getNode(cmd.id);
                  if (toDestroy) {
                    toDestroy.destroy();
                  }
                  if (cmd.id === 0) {
                    this._application.setEnding();
                  }
                  break;
                default:
                  node = null;
                  context.LogService.error("dvm.manageAuiOrder: Invalid command (" + cmd.type + ")");
              }
              result = result || (!!node && (node._tag !== "Value"));
            }
            return result;
          }
        };
      });
    cls.ApplicationServiceFactory.register("Dvm", cls.DVMApplicationService);
  });
