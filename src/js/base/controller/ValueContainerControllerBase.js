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

modulum('ValueContainerControllerBase', ['ControllerBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Base controller for an AUI node.
     * Manages client side life cycle representation of the node.
     * @class classes.ValueContainerControllerBase
     * @extends classes.ControllerBase
     */
    cls.ValueContainerControllerBase = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.ValueContainerControllerBase.prototype */
      return {
        __name: "ValueContainerControllerBase",

        /**
         * Creates a new widget depending on the dialog type
         * @returns {classes.WidgetBase}
         */
        createWidget: function() {
          if (!this._widget) {
            var dialogType = null;

            // Determine the widget kind of a valueNode
            if (this.getAnchorNode()) {
              dialogType = this.getAnchorNode().attribute('dialogType');
            }
            if (!dialogType && this.getNodeBindings().decorator) {
              dialogType = this.getNodeBindings().decorator.attribute('dialogType');
            }
            if (!dialogType && this.getNodeBindings().container) {
              dialogType = this.getNodeBindings().container.attribute('dialogType');
            }

            this._widget = this._createWidget(dialogType);
            if (this._widget) {
              this._widget._setAuiTag(this.getAnchorNode()._id);
            }
          }
          return this._widget;
        },

        /**
         * Sends the updated value to the DVM
         * @private
         */
        sendWidgetValue: function() {
          var valueNode = this.getNodeBindings().anchor;
          var decoratorNode = this.getNodeBindings().decorator;
          var widget = this.getWidget();

          if (widget.isEnabled()) {
            var value = widget.getValue();
            if (value === null || value === undefined) {
              value = "";
            }

            if (decoratorNode) {
              switch (decoratorNode.attribute('shift')) {
                case 'up':
                  value = value.toUpperCase();
                  break;
                case 'down':
                  value = value.toLowerCase();
                  break;
              }
            }

            var valstr = value.toString();
            if (valstr !== valueNode.attribute("value").toString()) {
              var eventParams = {
                value: valstr
              };
              if (widget.getCursors && valueNode.getTag() === "FormField") {
                var cursors = widget.getCursors();
                eventParams.cursor = cursors.start;
                eventParams.cursor2 = cursors.end;
              }
              var event = new cls.VMConfigureEvent(valueNode.getId(), eventParams);
              valueNode.getApplication().event(event);
            }
          }
        }
      };
    });
  });
