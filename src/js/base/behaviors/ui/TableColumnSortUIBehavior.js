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

modulum('TableColumnSortUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnSortUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.TableColumnSortUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.TableColumnSortUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "TableColumnSortUIBehavior",

        /** @type {classes.NodeBase} */
        _tableColumnNode: null,
        /** @type {HandleRegistration} */
        _clickHandle: null,

        /**
         * @constructs {classes.TableColumnSortUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableColumnNode
         */
        constructor: function(controller, tableColumnNode) {
          $super.constructor.call(this, controller);
          this._tableColumnNode = tableColumnNode;
        },

        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._clickHandle = widget.on(gbc.constants.widgetEvents.tableHeaderClick, this._sortColumn.bind(this));
        },

        _detachWidget: function() {
          if (this._clickHandle) {
            this._clickHandle();
            this._clickHandle = null;
          }
        },

        /**
         * Sort table column (send event to VM)
         * @private
         */
        _sortColumn: function(opt) {
          var reset = opt.data.length > 0 && opt.data[0] === "reset";

          var tableNode = this._tableColumnNode.getParentNode();
          var widget = this._controller.getWidget();
          var columnIndex = widget.getColumnIndex();
          var sortType = "";
          if (columnIndex > -1) {
            sortType = tableNode.attribute('sortType') === "asc" ? "desc" : "asc";
          }

          //reset sort order
          columnIndex = reset ? -1 : columnIndex;

          var event = new cls.VMConfigureEvent(tableNode.getId(), {
            sortColumn: columnIndex,
            sortType: sortType
          });
          this._tableColumnNode.getApplication().event(event);

        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._tableColumnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
