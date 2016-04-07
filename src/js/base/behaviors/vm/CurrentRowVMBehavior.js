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

modulum('CurrentRowVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.CurrentRowVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.CurrentRowVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.CurrentRowVMBehavior.prototype */
      return {
        __name: "CurrentRowVMBehavior",
        /** @type {classes.NodeBase} */
        _currentRowNode: null,
        /** @type {classes.NodeBase} */
        _offsetNode: null,
        /**
         * @constructs {classes.CurrentRowVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} currentRowAttributeNode
         */
        constructor: function(controller, currentRowAttributeNode, offsetAttributeNode) {
          $super.constructor.call(this, controller);
          this._currentRowNode = currentRowAttributeNode;
          this._offsetNode = offsetAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setCurrentRow) {
            var currentRow = this._currentRowNode.attribute('currentRow');
            var offset = this._offsetNode.attribute('offset');
            widget.setCurrentRow(currentRow - offset);

            // TODO should we really to this here
            // =====================================
            if (this._controller._updateMultiRowSelectionRoot) {
              this._controller._multiRowSelectionRoot = currentRow;
            }
            this._controller._updateMultiRowSelectionRoot = true;
            // =====================================

          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._currentRowNode,
            attribute: 'currentRow'
          }, {
            node: this._offsetNode,
            attribute: 'offset'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._currentRowNode = null;
          this._offsetNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
