/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('RequestFocusUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RequestFocusUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.RequestFocusUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.RequestFocusUIBehavior.prototype */
      return {
        __name: "RequestFocusUIBehavior",

        /** @type {classes.NodeBase} */
        _containerNode: null,

        _focusListener: null,

        /**
         * @constructs {classes.RequestFocusUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} containerNode
         */
        constructor: function(controller, containerNode) {
          $super.constructor.call(this, controller);
          this._containerNode = containerNode;
        },

        /**
         *
         * @protected
         */
        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._focusListener = widget.on(context.constants.widgetEvents.focus, function() {
            // Keep capture allowed value when the event is received.
            var restoringFocus = context.FocusService.isRestoringFocus();
            if (!restoringFocus) {
              var focusRequested = false;
              switch (this._containerNode.getTag()) {
                case 'Matrix':
                  focusRequested = this.requestMatrixFocus();
                  break;
                case 'TableColumn':
                  focusRequested = this.requestTableFocus();
                  break;
                default:
                  focusRequested = this.requestFieldFocus();
              }
              if (focusRequested) {
                context.FocusService.focusChange();
              }
            }
          }.bind(this));
        },
        /**
         *
         * @protected
         */
        _detachWidget: function() {
          this._focusListener();
        },

        /**
         * Requests the focus on a classic field
         * @returns {boolean} true if the focus has been requested, false if it wasn't necessary
         */
        requestFieldFocus: function() {
          if (this._containerNode.attribute('active') === 0) {
            // Restore the focus to its previous location
            return true;
          }
          var app = this._containerNode.getApplication();
          var ui = app.getNode(0);
          if (ui.attribute('focus') !== this._containerNode.getId()) {
            var cursors = {
              start: 0,
              end: 0
            };
            var widget = this._controller.getWidget();
            if (widget && widget.getCursors) {
              cursors = widget.getCursors();
            }
            var event = new cls.VMConfigureEvent(this._containerNode.getId(), {
              cursor: cursors.start,
              cursor2: cursors.end
            });
            event.directFire = true;
            app.event(event);
            return true;
          }
          return false;
        },

        /**
         * Requests the focus on a Matrix
         * @returns {boolean} true if the focus has been requested, false if it wasn't necessary
         */
        requestMatrixFocus: function() {
          if (this._containerNode.attribute('active') === 0) {
            // Restore the focus to its previous location
            return true;
          }
          var app = this._containerNode.getApplication();
          var ui = app.getNode(0);

          var valueNodeIndex = this._controller.getAnchorNode().getIndex();
          var offset = this._containerNode.attribute('offset');
          var currentRow = valueNodeIndex + offset;

          var isSameCurrentRow = currentRow === this._containerNode.getController()._currentRow;

          var cursors = {
            start: 0,
            end: 0
          };
          var widget = this._controller.getWidget();
          if (widget && widget.getCursors) {
            cursors = widget.getCursors();
          }

          if (ui.attribute('focus') !== this._containerNode.getId() || !isSameCurrentRow) {
            var event = new cls.VMConfigureEvent(this._containerNode.getId(), {
              currentRow: currentRow,
              cursor: cursors.start,
              cursor2: cursors.end
            });
            event.directFire = true;
            app.event(event);
            return true;
          }
          return false;
        },

        /**
         * Requests the focus on a Table
         * @returns {boolean} true if the focus has been requested, false if it wasn't necessary
         */
        requestTableFocus: function() {
          if (this._containerNode.attribute('active') === 0 && this._containerNode.attribute('noEntry') === 0) {
            // Restore the focus to its previous location
            return true;
          }
          var tableNode = this._containerNode.getParentNode();
          var app = tableNode.getApplication();
          var ui = app.getNode(0);

          var eventParams = {};
          var valueNodeIndex = this._controller.getAnchorNode().getIndex();
          var offset = tableNode.attribute('offset');
          eventParams.currentRow = valueNodeIndex + offset;

          var needFocus = ui.attribute('focus') !== tableNode.getId() ||
            eventParams.currentRow !== tableNode.attribute('currentRow');

          var dialogType = this._containerNode.attribute('dialogType');
          var displayDialog = dialogType.startsWith('Display');
          if (!displayDialog) { // Input, InputArray or Construct
            eventParams.currentColumn = this._containerNode.getIndex('TableColumn');
            needFocus = needFocus || eventParams.currentColumn !== tableNode.attribute('currentColumn');
          }

          if (needFocus) {
            var event = new cls.VMConfigureEvent(tableNode.getId(), eventParams);
            var events = [event];

            event.directFire = true;

            if (!displayDialog) {

              var widget = tableNode.getController().getWidget().getItemWidget(eventParams.currentColumn, valueNodeIndex);
              if (widget.getCursors) {
                var cursors = widget.getCursors();
                var event2 = new cls.VMConfigureEvent(this._containerNode.getId(), {
                  cursor: cursors.start,
                  cursor2: cursors.end
                });
                event.directFire = false;
                event2.directFire = true;
                events = events.concat(event2);
              }

            }
            app.event(events);

            return true;
          }
          return false;
        }
      };
    });
  });
