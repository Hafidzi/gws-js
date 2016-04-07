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

modulum('EnabledVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's 'enabled' state
     * @class classes.EnabledVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.EnabledVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.EnabledVMBehavior.prototype */
      return {
        __name: "EnabledVMBehavior",
        /** @type {classes.NodeBase} */
        _activeNode: null,
        /** @type {classes.NodeBase} */
        _dialogTypeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveNode: null,
        /**
         * @constructs {classes.EnabledVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         * @param {classes.NodeBase=} dialogTypeAttributeNode
         * @param {string=} actionActiveAttributeNode
         */
        constructor: function(controller, activeAttributeNode, dialogTypeAttributeNode, actionActiveAttributeNode) {
          $super.constructor.call(this, controller);
          this._activeNode = activeAttributeNode;
          this._dialogTypeNode = dialogTypeAttributeNode;
          this._actionActiveNode = actionActiveAttributeNode;
        },
        /**
         * Sets the widget 'enabled' or  'disabled' depending on the AUI tree state.
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (!!widget && widget.setEnabled) {
            var activeValue = false;
            if (!!this._activeNode) {
              activeValue |= this._activeNode.attribute('active');
            }
            if (!!this._actionActiveNode) {
              activeValue |= this._actionActiveNode.attribute('actionActive');
            }
            var enabled = activeValue === 1;
            if (!!this._dialogTypeNode) {
              var dialogTypeValue = this._dialogTypeNode.attribute('dialogType');
              enabled = enabled &&
                dialogTypeValue !== context.constants.dialogType.display &&
                dialogTypeValue !== context.constants.dialogType.displayArray;
            }

            var noEntry = !!this._activeNode ? this._activeNode.attribute('noEntry') : 0;
            if (noEntry === 1 && widget.setReadOnly) {
              widget.setReadOnly(true);
            } else {
              widget.setEnabled(enabled);
            }

          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._activeNode,
            attribute: 'active'
          }, {
            node: this._activeNode,
            attribute: 'noEntry'
          }, {
            node: this._dialogTypeNode,
            attribute: 'dialogType',
            optional: true
          }, {
            node: this._actionActiveNode,
            attribute: 'actionActive',
            optional: true
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._activeNode = null;
          this._dialogTypeNode = null;
          this._actionActiveNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
