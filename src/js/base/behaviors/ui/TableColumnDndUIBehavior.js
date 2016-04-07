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

modulum('TableColumnDnDUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnDndUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.TableColumnDndUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.TableColumnDndUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "TableColumnDnDUIBehavior",

        /** @type {classes.NodeBase} */
        _columnNode: null,
        /** @type {HandleRegistration} */
        _dndStartHandle: null,
        /** @type {HandleRegistration} */
        _dndEndHandle: null,
        /** @type {HandleRegistration} */
        _dndDropHandle: null,
        /** @type {HandleRegistration} */
        _dndOverHandle: null,
        /** @type {HandleRegistration} */
        _dndLeaveHandle: null,

        /**
         * @constructs {classes.TableColumnDndUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} columnNode
         */
        constructor: function(controller, columnNode) {
          $super.constructor.call(this, controller);
          this._columnNode = columnNode;
        },

        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._dndStartHandle = widget.on(gbc.constants.widgetEvents.tableDragStart, this._onTableDragStart.bind(this));
          this._dndEndHandle = widget.on(gbc.constants.widgetEvents.tableDragEnd, this._onTableDragEnd.bind(this));
          this._dndDropHandle = widget.on(gbc.constants.widgetEvents.tableDrop, this._onTableDrop.bind(this));
          this._dndOverHandle = widget.on(gbc.constants.widgetEvents.tableDragOver, this._onTableDragOver.bind(this));
          this._dndLeaveHandle = widget.on(gbc.constants.widgetEvents.tableDragLeave, this._onTableDragLeave.bind(this));
        },

        /**
         * Get value node corresponding to index in the column
         * @param index
         * @returns {*|classes.NodeBase}
         * @private
         */
        _getValueNode: function(index) {
          var valueListNode = this._columnNode.getFirstChild("ValueList");
          return valueListNode.getChildren()[index];
        },

        /**
         * Handle tableDragStart event
         * @private
         */
        _onTableDragStart: function(event, sender, index, evt) {
          context.DndService.onDragStart(this._columnNode.getParentNode(), this._getValueNode(index), evt);
        },

        /**
         * Handle tableDragEnd event
         * @private
         */
        _onTableDragEnd: function() {
          context.DndService.onDragEnd();
        },

        /**
         * Handle tableDrop event
         * @private
         */
        _onTableDrop: function(event, sender, index) {
          context.DndService.onDrop(this._getValueNode(index));
        },

        /**
         * Handle tableDragOver event
         * @private
         */
        _onTableDragOver: function(event, sender, index, evt) {
          context.DndService.onDragOver(this._columnNode.getParentNode(), this._getValueNode(index), evt);
        },

        /**
         * Handle tableDragLeave event
         * @private
         */
        _onTableDragLeave: function(event, sender, index, evt) {
          context.DndService.onDragLeave(this._columnNode.getParentNode(), this._getValueNode(index), evt);
        },

        /**
         * @inheritDoc
         * @private
         */
        _detachWidget: function() {
          if (this._dndStartHandle) {
            this._dndStartHandle();
            this._dndStartHandle = null;
          }
          if (this._dndEndHandle) {
            this._dndEndHandle();
            this._dndEndHandle = null;
          }
          if (this._dndDropHandle) {
            this._dndDropHandle();
            this._dndDropHandle = null;
          }
          if (this._dndOverHandle) {
            this._dndOverHandle();
            this._dndOverHandle = null;
          }
          if (this._dndLeaveHandle) {
            this._dndLeaveHandle();
            this._dndLeaveHandle = null;
          }
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._columnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
