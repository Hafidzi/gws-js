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

modulum('ComponentTypeVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ComponentTypeVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ComponentTypeVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ComponentTypeVMBehavior.prototype */
      return {
        __name: "ComponentTypeVMBehavior",
        /** @type {classes.NodeBase} */
        _componentTypeNode: null,
        /**
         * @constructs {classes.ComponentTypeVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} componentTypeAttributeNode
         */
        constructor: function(controller, componentTypeAttributeNode) {
          $super.constructor.call(this, controller);
          this._componentTypeNode = componentTypeAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (!(widget && widget.setWebComponentType)) {
            this._failed("Could not apply behavior");
          } else {
            var componentType = this._componentTypeNode.attribute('componentType');
            var isApi = componentType ? true : false;
            widget.setWebComponentType(componentType ? "api" : "url");
            if (isApi) {
              var webcompUrl = this._componentTypeNode.getApplication().info().webComponent;
              widget.setUrl(webcompUrl + "/" + componentType + "/" + componentType + ".html");
            }
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._componentTypeNode,
            attribute: 'componentType'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._componentTypeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
