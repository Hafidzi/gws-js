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

modulum('ItemVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the completer items
     * @class classes.ItemVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ItemVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ItemVMBehavior.prototype */
      return {
        //TODO : BEHAVIOR
        __name: "ItemVMBehavior",
        /** @type {classes.NodeBase} */
        _widgetNode: null,
        _comboboxNode: null,
        /** @type {HandleRegistration} */
        _widgetHandle: null,
        _sizeAttrHandle: null,

        _changedProperties: null,

        _propertyDict: null,

        /**
         * @constructs {classes.ItemVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} propertyAttributeNode
         */
        constructor: function(controller, widgetNode) {
          $super.constructor.call(this, controller);
          this._changedProperties = [];
          this._propertyDict = {};
          this._widgetNode = widgetNode;
        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var widget = this._controller.getWidget();

          if (widget && widget.addChoices) {
            //completerWidget.clearChoices();

            var children = this._widgetNode._children;
            widget.clearChoices();
            widget.addChoices(children.map(function(child) {
              return {
                text: child.attribute("text"),
                value: child.attribute("name")
              };
            }));
          } else {
            this._failed("Could not apply behavior");
          }
        },

        _getWatchedAttributes: function() {
          var watchedAttributes = [];
          var onChange = function(node, attributeName) {
            this._changedProperties.push(node);
          }.bind(this);

          if (this._widgetNode._children.length > 0) {
            this._comboboxNode = this._widgetNode._children[0];
            //this._size = this._comboboxNode.attribute("size");

            //this._sizeAttrHandle = this._bindAttribute(this._comboboxNode, "size");

            var children = this._comboboxNode.getChildren();
            for (var i = 0; i < children.length; i++) {
              watchedAttributes.push({
                node: children[i],
                attribute: 'text',
                onChange: onChange
              });
            }
          }
          return watchedAttributes;
        },

        /**
         * @inheritDoc
         * @protected
         */
        _attach: function() {
          //on new Item node
          this._onNodeCreateHandle = this._widgetNode.onNodeCreated(this._onNodeCreated.bind(this), "Item");
          this._onNodeRemoveHandle = this._widgetNode.onNodeRemoved(this._onNodeCreated.bind(this), "Item");
        },

        _onNodeCreated: function(event, src, node) {
          this._handles.push(this._bindAttribute(node, "text", this._changedProperties.push.bind(this._changedProperties, node)));
          this._changedProperties.push(node);
          this._setDirty();
        },

        /**
         * @inheritDoc
         * @protected
         */
        _detach: function() {
          /* if (this._propertyNameHandle) {
             this._propertyNameHandle();
             this._propertyNameHandle = null;
           }
           if (this._propertyValueHandle) {
             this._propertyValueHandle();
             this._propertyValueHandle = null;
           }*/
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._widgetNode = null;
          this._onNodeCreateHandle();
          this._onNodeRemoveHandle();
          //this._sizeAttrHandle();
          $super.destroy.call(this);
        }
      };
    });
  });
