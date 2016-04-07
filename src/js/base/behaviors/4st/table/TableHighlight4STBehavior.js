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

modulum('TableHighlight4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableHighlight4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableHighlight4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.TableHighlight4STBehavior.prototype */
      return {
        __name: "TableHighlight4STBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,

        /**
         * @constructs {classes.TableHighlight4STBehavior}
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
            var highlightColor = this._tableNode.getStyleAttribute("highlightColor");
            var highlightCurrentCell = this._tableNode.getStyleAttribute("highlightCurrentCell");
            var highlightCurrentRow = this._tableNode.getStyleAttribute("highlightCurrentRow");
            var highlightTextColor = this._tableNode.getStyleAttribute("highlightTextColor");
            var dialogType = this._tableNode.attribute("dialogType");

            if (widget.setHighlightColor && widget.setHighlightCurrentCell && widget.setHighlightCurrentRow && widget.setHighlightTextColor) {

              // Defines the highlight color of rows for the table, used for selected rows.
              if (highlightColor) {
                widget.setHighlightColor(highlightColor);
              }
              // Defines the highlighted text color of rows for the table, used for selected rows.
              if (highlightTextColor) {
                widget.setHighlightTextColor(highlightTextColor);
              }

              if (highlightCurrentCell && dialogType === "InputArray") {
                widget.setHighlightCurrentCell(this.isSAYesLike(highlightCurrentCell));
              }

              var apply = (highlightCurrentRow === null && dialogType === "DisplayArray") || (this.isSAYesLike(highlightCurrentRow));
              widget.setHighlightCurrentRow(apply);

            } else {
              this._failed("Could not apply behavior");
            }
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
