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

modulum('AuiApplicationService', ['ApplicationServiceBase', 'ApplicationServiceFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Base class of application scoped services
     * @class classes.AuiApplicationService
     * @extends classes.ApplicationServiceBase
     */
    cls.AuiApplicationService = context.oo.Class(cls.ApplicationServiceBase, function($super) {
      /** @lends classes.AuiApplicationService.prototype */
      return {
        __name: "AuiApplicationService",
        nodeHash: null,
        // logs
        contents: null,
        file: null,
        constructor: function(app) {
          $super.constructor.call(this, app);
          this.nodeHash = [];
          //   this.endingNode = new cls.EndingNode(app);
          this.contents = ["LOGVERSION=2"];
        },
        stop: function() {
          this.nodeHash.length = 0;
        },
        destroy: function() {
          this.contents.length = 0;
          $super.destroy.call(this);
          //  this.endingNode.destroy();
        },
        /**
         * Get a node object
         * @param   {Number} id of the Node to get
         * @returns {classes.NodeBase} Node Object
         */
        getNode: function(id) {
          if (Object.isNumber(id)) {
            return this.nodeHash[id];
          }
          if (Object.isString(id)) {
            return this.nodeHash[parseInt(id, 10)];
          }
          if (this._application.ending) {
            return this.endingNode;
          }
          return null;
        },
        getNodesFrom: function(id, currentBag) {
          var result = currentBag || [];
          var localRoot = Object.isNumber(id) ? this.getNode(id || 0) : id;
          if (localRoot) {
            result.push(localRoot);
            for (var i = 0; i < localRoot.children.length; i++) {
              this.getNodesFrom(localRoot.children[i], result);
            }
          }
          if (!currentBag) {
            return result;
          } else {
            return null;
          }
        },
        addNode: function(id, node) {
          this.nodeHash[id] = node;
        },
        getNodeByAttribute: function(attr, value) {
          return this.nodeHash.find(function(node) {
            return node ? node.attribute(attr) === value : false;
          });
        },
        removeNode: function(id) {
          this.nodeHash[id] = null;
        },
        commandAdd: function(omCommand) {
          var parentNode = (omCommand.node.id === 0) ? null : this.getNode(omCommand.parent);
          var nodes = gbc.classes.NodeFactory.createRecursive(parentNode, omCommand.node, this._application);
          var partRootNode = nodes[0];
          partRootNode.createController();
          for (var i = 0; i < nodes.length; i++) {
            var ctrl = nodes[i].getController();
            if (ctrl) {
              ctrl.createWidget();
            }
          }
          partRootNode.attachUI();
          if (!parentNode) {
            this._application.attachRootWidget(partRootNode.getController().getWidget());
          }
          return partRootNode;
        },
        commandUpdate: function(omCommand) {
          var node = this.getNode(omCommand.id);
          node.updateAttributes(omCommand.attributes);
          return node;
        },
        remove: function(omNode) {
          var nodeToRemove = omNode || this._application.uiNode();
          if (nodeToRemove) {
            nodeToRemove.destroy();
          }
        },

        logFireEvent: function(eventContents) {
          var logItem = "" + this._application.applicationHash + ":FE:0:" + eventContents;
          /* if (context.$app._dvmLogger !== this) {
           context.$app._dvmLogger.contents.push(logItem);
           } else {
           this.contents.push(logItem);
           }*/
        },

        logDvm: function(dvmContents) {
          var logItem = "" + this._application.applicationHash + ":DVM:0:" + dvmContents;
          /* if (context.$app._dvmLogger !== this) {
           context.$app._dvmLogger.contents.push(logItem);
           } else {
           this.contents.push(logItem);
           }*/
        },
        linkDownload: function() {
          var data = new Blob([this.contents.join("\n")], {
            type: "text/plain"
          });

          var link = $(".auiLink>a")
            .attr("download", "auiLog-" + this._application.info().session + ".log");
          if (this.file !== null) {
            window.URL.revokeObjectURL(this.file);
          }

          this.file = window.URL.createObjectURL(data);

          //if (window.webkitURL !== null) {
          link.attr("href", this.file);
          /*} else {
           // Firefox requires the link to be added to the DOM
           // before it can be clicked.
           link.attr("href", window.URL.createObjectURL(textBlob))
           .on("click", function() {
           link.remove();
           }).css({
           display: "none"
           }).appendTo("body");
           }*/

          link.click();
        }
      };
    });
    cls.ApplicationServiceFactory.register("Model", cls.AuiApplicationService);
  });
