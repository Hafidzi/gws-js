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

modulum('KeyboardHintVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.IsPasswordBehavior
     * @extends classes.BehaviorBase
     */
    cls.KeyboardHintVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.KeyboardHintVMBehavior.prototype */
      return {
        __name: "KeyboardHintVMBehavior",
        /** @type {classes.NodeBase} */
        _keyboardHintNode: null,
        /** @type {classes.NodeBase} */
        _vartypeNode: null,
        styleBased: true,

        /**
         * @constructs {classes.KeyboardHintVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} keyboardHintAttributeNode
         * @param {classes.NodeBase} varTypeAttributeNode
         */
        constructor: function(controller, keyboardHintAttributeNode, varTypeAttributeNode) {
          $super.constructor.call(this, controller);
          this._keyboardHintNode = keyboardHintAttributeNode;
          this._vartypeNode = varTypeAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setType) {
            var keyboardHint = null;
            var keyboardVal = this._keyboardHintNode.attribute('keyboardHint');
            if (!!keyboardVal) {
              keyboardHint = keyboardVal.toLowerCase();
            }
            var varType = null;
            var attrVal = this._vartypeNode.attribute('varType');
            if (!!attrVal) {
              attrVal = attrVal.toLowerCase();
              var pattern = /(\w+)/;
              var match = attrVal.match(pattern);
              varType = match[1];
            }

            switch (keyboardHint) {
              case "email":
                widget.setType("email");
                break;
              case "number":
                widget.setType("text");
                break;
              case "phone":
                widget.setType("tel");
                break;
              case "default":
                /* falls through */
              default:
                switch (varType) {
                  case "bigint":
                  case "byte":
                  case "decimal":
                  case "float":
                  case "integer":
                  case "interval":
                  case "smallFloat":
                  case "smallInt":
                  case "tinyInt":
                    widget.setType("text");
                    break;

                  case "date":
                  case "datetime":
                  case "char":
                  case "string":
                  case "text":
                  case "varchar":
                  case "money":
                    /* falls through */
                  default:
                    var dataTypeHint = this._controller.getAnchorNode().getStyleAttribute('dataTypeHint');
                    if (dataTypeHint) {
                      widget.setType(dataTypeHint);
                    } else {
                      widget.setType("text");
                    }
                }
            }
          }
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._keyboardHintNode,
            attribute: 'keyboardHint'
          }, {
            node: this._vartypeNode,
            attribute: 'varType',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._keyboardHintNode = null;
          this._vartypeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
