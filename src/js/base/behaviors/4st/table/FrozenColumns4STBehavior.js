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

modulum('FrozenColumns4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FrozenColumns4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.FrozenColumns4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.FrozenColumns4STBehavior.prototype */
      return {
        __name: "FrozenColumns4STBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,

        _leftFrozenDefaultValue: null,
        _rightFrozenDefaultValue: null,

        /**
         * @constructs {classes.FrozenColumns4STBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, tableNode) {
          $super.constructor.call(this, controller);
          this._tableNode = tableNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget) {
            var leftFrozenColumns = this._tableNode.getStyleAttribute("leftFrozenColumns");
            var rightFrozenColumns = this._tableNode.getStyleAttribute("rightFrozenColumns");

            if (widget.setLeftFrozenColumns && widget.setRightFrozenColumns) {
              // NOTE don't reset value from style if it doesn't change because it can reset the value set by the table contextmenu
              if (leftFrozenColumns && (this._leftFrozenDefaultValue !== leftFrozenColumns)) {
                widget.setLeftFrozenColumns(leftFrozenColumns);
                this._leftFrozenDefaultValue = leftFrozenColumns;
              }
              if (rightFrozenColumns && (this._rightFrozenDefaultValue !== rightFrozenColumns)) {
                widget.setRightFrozenColumns(rightFrozenColumns);
                this._rightFrozenDefaultValue = rightFrozenColumns;
              }
            } else {
              this._failed("Could not apply behavior");
            }
          }
        },

        /**
         *
         */
        destroy: function() {
          this._tableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
