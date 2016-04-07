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

modulum('EnabledButtonVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's 'enabled' state
     * @class classes.EnabledButtonVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.EnabledButtonVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.EnabledButtonVMBehavior.prototype */
      return {
        __name: "EnabledButtonVMBehavior",
        /** @type {classes.NodeBase} */
        _activeNode: null,
        /** @type {classes.NodeBase} */
        _dialogTypeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveNode: null,
        /** @type {classes.NodeBase} */
        _runtimeStatusNode: null,
        /**
         * @constructs {classes.EnabledButtonVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         * @param {classes.NodeBase} runtimeStatusNode
         * @param {classes.NodeBase} actionActiveAttributeNode
         */
        constructor: function(controller, activeAttributeNode, runtimeStatusNode, actionActiveAttributeNode) {
          $super.constructor.call(this, controller);
          this._activeNode = activeAttributeNode;
          this._runtimeStatusNode = runtimeStatusNode;
          this._actionActiveNode = actionActiveAttributeNode;
        },
        /**
         * Sets the widget 'enabled' or  'disabled' depending on the AUI tree state.
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          var isInterrupt = this._activeNode.attribute("name") === "interrupt";
          var isProcessing = this._runtimeStatusNode.attribute("runtimeStatus") === "processing";

          if (!!widget && widget.setEnabled) {
            var hidden = false;
            var activeValue = false;
            if (!!this._activeNode) {
              activeValue = activeValue || this._activeNode.attribute('active');
              if (this._activeNode.getParentNode().attribute("style") === "popup") {
                hidden = !activeValue;
              }
            }
            if (!!this._actionActiveNode) {
              activeValue = activeValue || this._actionActiveNode.attribute('actionActive');
            }

            var enabled = activeValue === 1;
            if (isInterrupt) {
              enabled = isInterrupt && isProcessing;
            }

            widget.setEnabled(enabled);

            //hide it if menu popup
            if (hidden && widget.setHidden) {
              widget.setHidden(hidden);
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
            node: this._runtimeStatusNode,
            attribute: 'runtimeStatus',
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
          this._runtimeStatusNode = null;
          this._actionActiveNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
