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

modulum('ShowGrid4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ShowGrid4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.ShowGrid4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.ShowGrid4STBehavior.prototype */
      return {
        __name: "ShowGrid4STBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,

        /**
         * @constructs {classes.ShowGrid4STBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, tableNode) {
          $super.constructor.call(this, controller);
          this._tableNode = tableNode;
        },

        /**
         * Indicates if the grid lines must be visible in a table.
         * Values can be "yes" (default when INPUT ARRAY),"no" (default when DISPLAY ARRAY). (1 or 0 on older front-ends).
         *
         * By default, when a Table is in editable mode (INPUT ARRAY), the front-end displays grid lines in the table.
         * You can change this behavior by setting this attribute to "no".
         *
         * By default, when a Table is in editable mode (DISPLAY ARRAY), the front-end does not display grid lines in the table.
         * You can change this behavior by setting this attribute to "yes".
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          var showGrid = this._tableNode.getStyleAttribute("showGrid");
          var dialogType = this._tableNode.attribute("dialogType");
          if (widget && widget.setShowGrid) {

            var apply = (showGrid === null && (dialogType.startsWith("Input") || dialogType === "Construct")) || (this.isSAYesLike(
              showGrid));

            widget.setShowGrid(apply);
          } else {
            this._failed("Could not apply behavior");
          }
        },

        /**
         *
         * @private
         */
        _getWatchedAttributes: function() {
          return [{
            node: this._tableNode,
            attribute: 'dialogType'
          }];
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
