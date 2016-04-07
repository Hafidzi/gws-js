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

modulum('NodeHelper', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Memory implementation of an AUI Node.
     *
     * Reflects the state of the AUI node in the DVM.
     *
     * @class classes.NodeHelper
     * @extends classes.EventListener
     */
    cls.NodeHelper = context.oo.Singleton(function() {
      /** @lends classes.NodeHelper */
      return {
        /**
         *
         * @param {number} appId
         * @param {number} nodeId
         * @returns {string}
         */
        getUid: function(appId, nodeId) {
          return "a_" + appId + "_n_" + nodeId;
        },
        /**
         *
         * @param {string} nodeTag
         */
        getDefaultAttributes: function(nodeTag) {
          var result = context.constants.nodeAttributes[nodeTag];
          if (!result) {
            debug.log("tag has no definition : " + nodeTag);
          }
          return result || [];
        },
        /**
         *
         * @param {classes.NodeBase} node
         * @param {string} attributeName
         */
        setAttributeDefaultValue: function(node, attributeName) {
          node._attributes[attributeName] = this.getAttributeDefaultValue(node._tag, attributeName);
        },
        /**
         *
         * @param {string} nodeTag
         * @param {string} attributeName
         */
        getAttributeDefaultValue: function(nodeTag, attributeName) {
          var value = null;
          var defaultsForTag = context.constants.attributeDefaultValuesByNodeType[nodeTag];
          var defaultsForAny = context.constants.attributeDefaultValues;

          if (!!defaultsForTag && defaultsForTag.hasOwnProperty(attributeName)) {
            value = defaultsForTag[attributeName];
          } else {
            value = defaultsForAny[attributeName];
          }
          return value;
        },
        /**
         *
         * @param {classes.NodeBase} node
         * @param {classes.NodeBase=} originNode
         */
        addToParentWidget: function(node, originNode) {
          originNode = originNode || node;
          if (!originNode.getController()) {
            this.failed("adding from node without controller", originNode._tag);
          } else if (!originNode.getController().getWidget()) {
            this.failed("adding from node without widget", originNode._tag);
          } else {
            node = node.getParentNode();
            if (!node) {
              this.failed("could not find parent widget", originNode._tag);
            } else {
              if (!node.getController()) {
                this.addToParentWidget(node, originNode);
              } else {
                if (!node.getController().getWidget()) {
                  this.addToParentWidget(node, originNode);
                } else {
                  if (!node.getController().getWidget().addChildWidget) {
                    this.failed("Parent widget cannot hosts children");
                  } else {
                    node.getController().getWidget().addChildWidget(originNode.getController().getWidget());
                  }
                }
              }
            }
          }
        },
        /**
         *
         * @param msg
         * @params {*[]} params
         */
        failed: function(msg) {

          //console.warn(msg, Array.prototype.slice.call(arguments, 1));
        }
      };
    });
  });
