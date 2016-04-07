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

modulum('PropertyVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's Property
     * @class classes.PropertyVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.PropertyVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.PropertyVMBehavior.prototype */
      return {
        __name: "PropertyVMBehavior",
        /** @type {classes.NodeBase} */
        _webComponentNode: null,
        _onNodeCreateHandle: null,
        _changedProperties: null,

        /**
         * @constructs {classes.PropertyVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} webComponentNode
         */
        constructor: function(controller, webComponentNode) {
          $super.constructor.call(this, controller);
          this._changedProperties = [];
          this._webComponentNode = webComponentNode;
        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var widget = this._controller.getWidget();

          if (widget && widget._setProperty) {
            while (this._changedProperties.length) {
              var property = {};
              property[this._changedProperties[0]._attributes.name] = this._changedProperties[0]._attributes.value;
              widget._setProperty(JSON.stringify(property));
              this._changedProperties.shift();
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },

        _getWatchedAttributes: function() {
          var watchedAttributes = [];

          if (this._webComponentNode._children.length > 0) {
            var children = this._webComponentNode._children[0].getChildren();
            for (var i = 0; i < children.length; i++) {
              watchedAttributes.push({
                node: children[i],
                attribute: 'value',
                onChange: this._onChange.bind(this)
              });
              this._changedProperties.push(children[i]);
            }
          }
          return watchedAttributes;
        },
        _attach: function() {
          //on new Property node
          this._onNodeCreateHandle = this._webComponentNode.onNodeCreated(this._onNodeCreated.bind(this), "Property");
        },

        _onNodeCreated: function(event, src, node) {
          this._handles.push(this._bindAttribute(node, "value", true, this._onChange.bind(this)));
          this._changedProperties.push(node);
        },
        _onChange: function(node, attributeName) {
          this._changedProperties.push(node);
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._webComponentNode = null;
          this._onNodeCreateHandle();
          $super.destroy.call(this);
        }
      };
    });
  });
