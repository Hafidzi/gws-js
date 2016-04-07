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

modulum('SendDateTimeValueUIBehavior', ['SendValueUIBehavior'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's visibility
     * @class classes.SendDateTimeValueUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.SendDateTimeValueUIBehavior = context.oo.Class(cls.SendValueUIBehavior, function($super) {
      /** @lends classes.SendDateTimeValueUIBehavior.prototype */
      return {
        __name: "SendDateTimeValueUIBehavior",
        /** @type {classes.NodeBase} */
        _valueNode: null,
        _formFieldNode: null,
        _isoDateTime: null,
        /**
         * @constructs {classes.SendDateTimeValueUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} valueNode
         */
        constructor: function(controller, formFieldNode, valueNode) {
          $super.constructor.call(this, controller);
          this._formFieldNode = formFieldNode;
          this._valueNode = valueNode;
        },

        /**
         * Checks if the value has changed
         * @returns {boolean} true if the value has changed, false otherwise
         * @private
         */
        _hasValueChanged: function() {
          var value = this._controller.getWidget().getValue();
          if (value === null || value === undefined) {
            value = "";
          }
          var widgetValue = value.toString();
          if (widgetValue && !this._isConstruct()) {
            widgetValue = cls.DateTimeHelper.toISOFormat(widgetValue);
          }
          var auiValue = this._valueNode.attribute('value').toString();
          return widgetValue !== auiValue;
        },

        _isConstruct: function() {
          return this._formFieldNode.attribute('dialogType') === "Construct";
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._valueNode = null;
          this._formFieldNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
