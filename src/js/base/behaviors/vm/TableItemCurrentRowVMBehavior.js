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

modulum('TableItemCurrentRowVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableItemCurrentRowVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableItemCurrentRowVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TableItemCurrentRowVMBehavior.prototype */
      return {
        __name: "TableItemCurrentRowVMBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,
        /**
         * @constructs {classes.CurrentRowVMBehavior}
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
          if (widget && widget.setEnabled) {
            var dialogType = this._tableNode.attribute('dialogType');

            if (dialogType === "Input" || dialogType === "Construct") {
              var currentRow = this._tableNode.attribute('currentRow');
              var offset = this._tableNode.attribute('offset');
              var itemNode = this._controller.getAnchorNode();
              var index = itemNode.getParentNode().getChildren().indexOf(itemNode);
              var enabled = (index === (currentRow - offset)) && (itemNode.getParentNode().getParentNode().attribute('active') ===
                1);
              widget.setEnabled(enabled);
            }

          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._tableNode,
            attribute: 'currentRow'
          }, {
            node: this._tableNode,
            attribute: 'offset'
          }, {
            node: this._tableNode,
            attribute: 'dialogType'
          }, {
            node: this._tableNode,
            attribute: 'active'
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
