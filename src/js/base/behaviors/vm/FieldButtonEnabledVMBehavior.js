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

modulum('FieldButtonEnabledVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Handles the enabled / disabled state of a button included in a field (ex. ButtonEdit)
     * @class classes.FieldButtonEnabledVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.FieldButtonEnabledVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.FieldButtonEnabledVMBehavior.prototype */
      return {
        __name: "FieldButtonEnabledVMBehavior",
        /** @type {classes.NodeBase} */
        _activeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveNode: null,
        /**
         * @constructs {classes.FieldButtonEnabledVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         * @param {classes.NodeBase} actionActiveAttributeNode
         */
        constructor: function(controller, activeAttributeNode, actionActiveAttributeNode) {
          $super.constructor.call(this, controller);
          this._activeNode = activeAttributeNode;
          this._actionActiveNode = actionActiveAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setButtonEnabled) {
            var isEnabled = this._activeNode.attribute('active') === 1 &&
              this._actionActiveNode.attribute('actionActive') === 1;
            widget.setButtonEnabled(isEnabled);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._activeNode,
            attribute: 'active'
          }, {
            node: this._actionActiveNode,
            attribute: 'actionActive'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._activeNode = null;
          this._actionActiveNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
