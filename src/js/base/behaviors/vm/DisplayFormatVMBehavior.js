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

modulum('DisplayFormatVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.IsPasswordBehavior
     * @extends classes.BehaviorBase
     */
    cls.DisplayFormatVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DisplayFormatVMBehavior.prototype */
      return {
        __name: "DisplayFormatVMBehavior",
        /** @type {classes.NodeBase} */
        _keyboardHintNode: null,
        /** @type {classes.NodeBase} */
        _vartypeNode: null,
        styleBased: true,

        /**
         * @constructs {classes.DisplayFormatVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} keyboardHintAttributeNode
         * @param {classes.NodeBase} varTypeAttributeNode
         */
        constructor: function(controller, varTypeAttributeNode) {
          $super.constructor.call(this, controller);
          this._vartypeNode = varTypeAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFormat) {
            var varType = this._vartypeNode.attribute('varType');
            widget.setFormat(varType);
          } else {
            this._failed("Could not apply behavior");
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
