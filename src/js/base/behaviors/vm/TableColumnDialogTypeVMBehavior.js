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

modulum('TableColumnDialogTypeVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnDialogTypeVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableColumnDialogTypeVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TableColumnDialogTypeVMBehavior.prototype */
      return {
        __name: "TableColumnDialogTypeVMBehavior",
        /** @type {classes.NodeBase} */
        _dialogTypeNode: null,
        /**
         * @constructs {classes.TableColumnDialogTypeVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} dialogTypeNode
         */
        constructor: function(controller, dialogTypeNode) {
          $super.constructor.call(this, controller);
          this._dialogTypeNode = dialogTypeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget().getParentWidget(); // to get the TableColumnItemWidget
          if (widget && widget.setDndEnabled) {
            var dialogType = this._dialogTypeNode.attribute('dialogType');
            widget.setDndEnabled(dialogType === "DisplayArray");
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._dialogTypeNode,
            attribute: 'dialogType'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._dialogTypeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
