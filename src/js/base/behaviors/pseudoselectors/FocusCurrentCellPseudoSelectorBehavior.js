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

modulum('FocusCurrentCellPseudoSelectorBehavior', ['PseudoSelectorBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FocusCurrentCellPseudoSelectorBehavior
     * @extends classes.PseudoSelectorBehaviorBase
     */
    cls.FocusCurrentCellPseudoSelectorBehavior = context.oo.Class(cls.PseudoSelectorBehaviorBase, function($super) {
      /** @lends classes.FocusCurrentCellPseudoSelectorBehavior.prototype */
      return {
        __name: "FocusCurrentCellPseudoSelectorBehavior",
        /** @type {classes.NodeBase} */
        _currentRowNode: null,
        /** @type {classes.NodeBase} */
        _currentColumnNode: null,

        /**
         * @constructs
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} uiNode
         */
        constructor: function(controller, container) {
          $super.constructor.call(this, controller);
          if (container.getTag() === 'Matrix') {
            this._currentRowNode = container;
          } else {
            this._currentRowNode = container.getParentNode();
            this._currentColumnNode = container.getParentNode();
          }
        },

        /**
         *
         */
        currentCellChanged: function(event, data) {
          var currentRow = this._currentRowNode.attribute('currentRow');
          var previousCurrentRow = this._currentRowNode.attribute('currentRow', true);
          if (!!this._currentColumnNode) {
            var currentColumn = this._currentColumnNode.attribute('currentColumn');
            var previousCurrentColumn = this._currentColumnNode.attribute('currentColumn', true);
            this._setTableCellStyleBasedBehaviorsDirty(this._currentColumnNode, previousCurrentRow, previousCurrentColumn);
            this._setTableCellStyleBasedBehaviorsDirty(this._currentColumnNode, currentRow, currentColumn);
          } else {
            this._setColumnCellStyleBasedBehaviorsDirty(this._currentRowNode, previousCurrentRow);
            this._setColumnCellStyleBasedBehaviorsDirty(this._currentRowNode, currentRow);
          }
        },

        _setTableCellStyleBasedBehaviorsDirty: function(table, rowIndex, columnIndex) {
          var column = table.getChildren('TableColumn')[columnIndex];
          if (!!column) {
            this._setColumnCellStyleBasedBehaviorsDirty(column, rowIndex);
          }
        },

        _setColumnCellStyleBasedBehaviorsDirty: function(container, rowIndex) {
          var valueList = container.getFirstChild('ValueList');
          if (!!valueList) {
            var value = valueList.getChildren()[rowIndex];
            if (!!value) {
              var ctrl = value.getController();
              if (!!ctrl) {
                ctrl.setStyleBasedBehaviorsDirty();
              }
            }
          }
        },

        _getWatchedAttributes: function() {
          var watches = [{
            node: this._currentRowNode,
            attribute: 'currentRow',
            onChange: this.currentCellChanged.bind(this)
          }];
          if (!!this._currentColumnNode) {
            watches.push({
              node: this._currentColumnNode,
              attribute: 'currentColumn',
              onChange: this.currentCellChanged.bind(this)
            });
          }
          return watches;
        },
        /**
         *
         */
        destroy: function() {
          this._currentRowNode = null;
          this._currentColumnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
