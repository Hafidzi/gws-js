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

modulum('TableColumnOrderUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnOrderUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.TableColumnOrderUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.TableColumnOrderUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "TableColumnOrderUIBehavior",

        /** @type {classes.NodeBase} */
        _tableColumnNode: null,
        /** @type {HandleRegistration} */
        _orderHandle: null,

        /**
         * @constructs {classes.TableColumnOrderUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableColumnNode
         */
        constructor: function(controller, tableColumnNode) {
          $super.constructor.call(this, controller);
          this._tableColumnNode = tableColumnNode;
        },

        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._orderHandle = widget.on(gbc.constants.widgetEvents.tableOrderColumn, this._orderColumn.bind(this));
        },

        _detachWidget: function() {
          if (this._orderHandle) {
            this._orderHandle();
            this._orderHandle = null;
          }
        },

        /**
         * Order table column (send event to VM)
         * @private
         */
        _orderColumn: function(opt) {

          var event = new cls.VMConfigureEvent(this._tableColumnNode.getId(), {
            tabIndex: opt.data[0]
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
