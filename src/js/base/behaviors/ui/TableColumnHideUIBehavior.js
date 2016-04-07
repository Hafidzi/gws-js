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

modulum('TableColumnHideUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnHideUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.TableColumnHideUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.TableColumnHideUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "TableColumnHideUIBehavior",

        /** @type {classes.NodeBase} */
        _tableColumnNode: null,
        /** @type {HandleRegistration} */
        _clickHandle: null,

        /**
         * @constructs {classes.TableColumnHideUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableColumnNode
         */
        constructor: function(controller, tableColumnNode) {
          $super.constructor.call(this, controller);
          this._tableColumnNode = tableColumnNode;
        },

        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._clickHandle = widget.on(gbc.constants.widgetEvents.tableShowHideCol, this._showHideColumn.bind(this));
        },

        _detachWidget: function() {
          if (this._clickHandle) {
            this._clickHandle();
            this._clickHandle = null;
          }
        },

        /**
         * Show or hide table column (send event to VM)
         * @param opt true to show the column, false to hide it, empty to toggle it
         * @private
         */
        _showHideColumn: function(opt) {

          var widget = this._controller.getWidget();
          var columnIndex = widget.getColumnIndex();
          var hidden = context.constants.visibility.hiddenByProgram;
          if (opt.data.length > 0) {
            hidden = opt.data[0] === true ? context.constants.visibility.visible : context.constants.visibility.hiddenByProgram;
          } else if (columnIndex > -1) {
            hidden = this._tableColumnNode.attribute('hidden') === context.constants.visibility.hiddenByProgram ? context.constants
              .visibility.visible : hidden;
          }

          var event = new cls.VMConfigureEvent(this._tableColumnNode.getId(), {
            hidden: hidden
          });

          if (hidden === 0 || this._getNbColumnsVisible() > 1) {
            this._tableColumnNode.getApplication().event(event);
          }
        },

        /**
         * Returns the number of columns which are not hidden
         * @returns {number} number of visible columns
         */
        _getNbColumnsVisible: function() {
          var tableNode = this._tableColumnNode.getParentNode();

          var nb = 0;
          var children = tableNode.getChildren();
          for (var c = 0; c < children.length; c++) {
            var n = children[c];
            if (n._tag === "TableColumn" && n.attribute('hidden') === 0) {
              nb++;
            }
          }
          return nb;

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
