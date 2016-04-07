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

modulum('RowAndSelectionUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RowAndSelectionUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.RowAndSelectionUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.RowAndSelectionUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "RowAndSelectionUIBehavior",

        /** @type {classes.NodeBase} */
        _tableNode: null,
        /** @type {HandleRegistration} */
        _downHandle: null,
        /** @type {HandleRegistration} */
        _upHandle: null,
        /** @type {HandleRegistration} */
        _pageDownHandle: null,
        /** @type {HandleRegistration} */
        _pageUpHandle: null,
        /** @type {HandleRegistration} */
        _homeHandle: null,
        /** @type {HandleRegistration} */
        _endHandle: null,
        /** @type {HandleRegistration} */
        _spaceHandle: null,
        /** @type {HandleRegistration} */
        _selectAllHandle: null,

        /**
         * @constructs {classes.RowAndSelectionUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, tableNode) {
          $super.constructor.call(this, controller);
          this._tableNode = tableNode;
        },

        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._downHandle = widget.on(gbc.constants.widgetEvents.keyDown, this._onKeyDown.bind(this));
          this._upHandle = widget.on(gbc.constants.widgetEvents.keyUp, this._onKeyUp.bind(this));
          this._pageDownHandle = widget.on(gbc.constants.widgetEvents.keyPageDown, this._onKeyPageDown.bind(this));
          this._pageUpHandle = widget.on(gbc.constants.widgetEvents.keyPageUp, this._onKeyPageUp.bind(this));
          this._homeHandle = widget.on(gbc.constants.widgetEvents.keyHome, this._onKeyHome.bind(this));
          this._endHandle = widget.on(gbc.constants.widgetEvents.keyEnd, this._onKeyEnd.bind(this));
          this._spaceHandle = widget.on(gbc.constants.widgetEvents.keySpace, this._onKeySpace.bind(this));
          this._selectAllHandle = widget.on(gbc.constants.widgetEvents.selectAll, this._onSelectAll.bind(this));
        },

        _detachWidget: function() {
          if (this._downHandle) {
            this._downHandle();
            this._downHandle = null;
          }
          if (this._upHandle) {
            this._upHandle();
            this._upHandle = null;
          }
          if (this._pageDownHandle) {
            this._pageDownHandle();
            this._pageDownHandle = null;
          }
          if (this._pageUpHandle) {
            this._pageUpHandle();
            this._pageUpHandle = null;
          }
          if (this._homeHandle) {
            this._homeHandle();
            this._homeHandle = null;
          }
          if (this._endHandle) {
            this._endHandle();
            this._endHandle = null;
          }
          if (this._spaceHandle) {
            this._spaceHandle();
            this._spaceHandle = null;
          }
          if (this._selectAllHandle) {
            this._selectAllHandle();
            this._selectAllHandle = null;
          }
        },

        /**
         * On keyDown widget event
         * @private
         */
        _onKeyDown: function(event, sender, domEvent) {
          var currentRow = this._tableNode.attribute('currentRow');
          var sendSelect = domEvent.ctrlKey && !domEvent.shiftKey ? false : true;
          this._sendEvents(currentRow + 1, domEvent.ctrlKey, domEvent.shiftKey, sendSelect);
        },

        /**
         * On keyUp widget event
         * @private
         */
        _onKeyUp: function(event, sender, domEvent) {
          var currentRow = this._tableNode.attribute('currentRow');
          var sendSelect = domEvent.ctrlKey && !domEvent.shiftKey ? false : true;
          this._sendEvents(currentRow - 1, domEvent.ctrlKey, domEvent.shiftKey, sendSelect);
        },

        /**
         * On keyPageDown widget event
         * @private
         */
        _onKeyPageDown: function(event, sender, domEvent) {
          var pageSize = this._tableNode.attribute('pageSize');
          var currentRow = this._tableNode.attribute('currentRow');
          var sendSelect = domEvent.ctrlKey && !domEvent.shiftKey ? false : true;
          this._sendEvents(currentRow + pageSize, domEvent.ctrlKey, domEvent.shiftKey, sendSelect);
        },

        /**
         * On keyPageUp widget event
         * @private
         */
        _onKeyPageUp: function(event, sender, domEvent) {
          var pageSize = this._tableNode.attribute('pageSize');
          var currentRow = this._tableNode.attribute('currentRow');
          var sendSelect = domEvent.ctrlKey && !domEvent.shiftKey ? false : true;
          this._sendEvents(currentRow - pageSize, domEvent.ctrlKey, domEvent.shiftKey, sendSelect);
        },

        /**
         * On keyHome widget event
         * @private
         */
        _onKeyHome: function(event, sender, domEvent) {
          var sendSelect = domEvent.ctrlKey && !domEvent.shiftKey ? false : true;
          this._sendEvents(0, domEvent.ctrlKey, domEvent.shiftKey, sendSelect);
        },

        /**
         * On keyEnd widget event
         * @private
         */
        _onKeyEnd: function(event, sender, domEvent) {
          var size = this._tableNode.attribute('size');
          var sendSelect = domEvent.ctrlKey && !domEvent.shiftKey ? false : true;
          this._sendEvents(size - 1, domEvent.ctrlKey, domEvent.shiftKey, sendSelect);
        },

        /**
         * On keySpace widget event
         * @private
         */
        _onKeySpace: function(event, sender, domEvent) {
          var currentRow = this._tableNode.attribute('currentRow');
          this._sendEvents(currentRow, domEvent.ctrlKey, domEvent.shiftKey, true);
        },

        /**
         * On selectAll widget event
         * @private
         */
        _onSelectAll: function() {
          if (this._tableNode.attribute('multiRowSelection') !== 0) {
            this._selectAllRows();
          }
        },

        /**
         * Creates an configure events and sends them to the VM
         * @param {number} newCurrentRow new current row value
         * @param {boolean} ctrlKey - true if ctrl key is pressed
         * @param {boolean} shiftKey - true if shift key is pressed
         * @param {boolean} sendSelect - if true row selection event is sent
         */
        _sendEvents: function(newCurrentRow, ctrlKey, shiftKey, sendSelect) {

          var size = this._tableNode.attribute('size');
          if (newCurrentRow >= size) {
            newCurrentRow = size - 1;
          } else if (newCurrentRow < 0) {
            newCurrentRow = 0;
          }

          var currentRow = this._tableNode.attribute('currentRow');
          var events = [];

          if (newCurrentRow !== currentRow) {
            var event = new cls.VMConfigureEvent(this._tableNode.getId(), {
              currentRow: newCurrentRow
            });

            events.push(event);
          }

          if (this._tableNode.attribute('multiRowSelection') !== 0 && sendSelect) {
            // Row selection event
            events.push(this._controller.buildRowSelectionEvent(newCurrentRow, ctrlKey, shiftKey));
          }
          // if there are some events send them
          if (Object.size(events) > 0) {
            this._tableNode.getApplication().event(events);
          }
        },

        /**
         *  Send selection row event to select all rows
         */
        _selectAllRows: function() {
          var node = this._tableNode;

          var event = new cls.VMRowSelectionEvent(node.getId(), {
            startIndex: 0,
            endIndex: node.attribute('size') - 1,
            selectionMode: "set"
          });
          this._tableNode.getApplication().event(event);
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._tableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
