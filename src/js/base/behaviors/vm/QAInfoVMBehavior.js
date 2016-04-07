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

modulum('QAInfoVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.QAInfoVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.QAInfoVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.QAInfoVMBehavior.prototype */
      return {
        __name: "QAInfoVMBehavior",
        /** @type {classes.NodeBase} */
        _nameNode: null,
        /** @type {classes.NodeBase} */
        _offsetNode: null,
        /** @type {String} */
        _type: null,
        /**
         * @constructs {classes.QAInfoVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} nameAttributeNode
         * @param {String=} type
         * @param {classes.NodeBase=} offsetAttributeNode
         */
        constructor: function(controller, nameAttributeNode, type, offsetAttributeNode) {
          $super.constructor.call(this, controller);
          this._nameNode = nameAttributeNode;
          this._type = type;
          this._offsetNode = offsetAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setQAInfo) {
            var name = this._nameNode.attribute('name') || this._nameNode.attribute('tabName');
            widget.setQAInfo(this._type || 'name', name);
            var bindings = this._controller.getNodeBindings().getRawBindings();
            widget.setQAInfo('bindings', JSON.stringify(bindings));
            if (this._offsetNode) {
              var offset = this._offsetNode.attribute('offset');
              widget.setQAInfo('index', offset + this._controller.getAnchorNode().getParentNode().getChildren().indexOf(this._controller
                .getAnchorNode()));
            }

          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._nameNode,
            attribute: 'name'
          }, {
            node: this._offsetNode,
            attribute: 'offset',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._nameNode = null;
          this._offsetNode = null;
          this._type = null;
          $super.destroy.call(this);
        }
      };
    });
  });
