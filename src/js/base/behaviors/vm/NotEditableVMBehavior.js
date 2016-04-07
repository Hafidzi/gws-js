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

modulum('NotEditableVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.NotEditableVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.NotEditableVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.NotEditableVMBehavior.prototype */
      return {
        __name: "NotEditableVMBehavior",
        /** @type {classes.NodeBase} */
        _notEditableNode: null,
        /**
         * @constructs {classes.NotEditableVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} notEditableAttributeNode
         */
        constructor: function(controller, notEditableAttributeNode) {
          $super.constructor.call(this, controller);
          this._notEditableNode = notEditableAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setReadOnly) {
            var notEditable = this._notEditableNode.attribute('notEditable');
            if (notEditable) {
              widget.setReadOnly(notEditable);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._notEditableNode,
            attribute: 'notEditable'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._notEditableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
