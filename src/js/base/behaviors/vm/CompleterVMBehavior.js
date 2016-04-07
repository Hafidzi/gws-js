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

modulum('CompleterVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the completer items
     * @class classes.CompleterVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.CompleterVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.CompleterVMBehavior.prototype */
      return {
        //TODO : BEHAVIOR
        __name: "CompleterVMBehavior",
        /** @type {classes.NodeBase} */
        _widgetNode: null,
        _completerNode: null,
        /** @type {HandleRegistration} */
        _widgetHandle: null,
        _sizeAttrHandle: null,

        _changedProperties: null,

        _propertyDict: null,

        /**
         * @constructs {classes.CompleterVMBehavior}
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
          if (this._completerNode && widget.addCompleterWidget) {
            widget.addCompleterWidget();
          }

          var completerWidget = widget._completerWidget;

          if (completerWidget && this._completerNode) {
            //completerWidget.clearChoices();

            var children = this._completerNode.getChildren();
            var size = this._completerNode.attribute("size");
            completerWidget.clearChoices();
            completerWidget.setSize(size);

            for (var i = 0; i < size; i++) {
              completerWidget.addChoice(children[i].attribute("text"));
            }

            if (size > 0) {
              completerWidget.show(true);
            } else {
              completerWidget.show(false);
            }

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
            this._completerNode = this._widgetNode._children[0];
            //this._size = this._completerNode.attribute("size");

            this._sizeAttrHandle = this._bindAttribute(this._completerNode, "size");

            var children = this._completerNode.getChildren();
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
          //this._sizeAttrHandle();
          $super.destroy.call(this);
        }
      };
    });
  });
