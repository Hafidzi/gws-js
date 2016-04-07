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

modulum('SendValueUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the widget's visibility
     * @class classes.SendValueUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.SendValueUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.SendValueUIBehavior.prototype */
      return {
        __name: "SendValueUIBehavior",
        /** @type {classes.NodeBase} */
        _valueNode: null,
        /** @type {HandleRegistration} */
        _changeHandle: null,
        /** @type {HandleRegistration} */
        _blurHandle: null,
        /**
         * @constructs {classes.SendValueUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} valueNode
         */
        constructor: function(controller, valueNode) {
          $super.constructor.call(this, controller);
          this._valueNode = valueNode;
        },

        _attachWidget: function() {
          this._changeHandle = this._controller.getWidget().on(context.constants.widgetEvents.change, this._onChange.bind(this));
          this._blurHandle = this._controller.getWidget().on(context.constants.widgetEvents.blur, this._onBlur.bind(this));
        },

        _detachWidget: function() {
          if (this._changeHandle) {
            this._changeHandle();
            this._changeHandle = null;
          }
          if (this._blurHandle) {
            this._blurHandle();
            this._blurHandle = null;
          }
        },

        /**
         * This method gets called when the widget emits its 'changed' event
         * @private
         */
        _onChange: function(event, sender, nativeEvent, isTextEntry) {
          if (this._hasValueChanged()) {
            var window = this._valueNode.getAncestor("Window");
            var dialog = window.getActiveDialog();
            if (dialog) {
              var dialogTouchedNode = dialog.getFirstChildWithAttribute('Action', 'name', 'dialogtouched');
              if (dialogTouchedNode && dialogTouchedNode.attribute('active') === 1) {
                this._controller.getAnchorNode().getApplication().action.execute(dialogTouchedNode.getId());
              } else if (!isTextEntry) {
                var dialogInfo = dialog.getFirstChild('DialogInfo');
                if (dialogInfo) {
                  var container = this._controller.getNodeBindings().container.getId();
                  var fieldInfo = dialogInfo.getFirstChildWithAttribute('FieldInfo', 'nodeIdRef', container);
                  if (fieldInfo) {
                    var onChangeDialogEvent = fieldInfo.getFirstChildWithAttribute('DialogEvent', 'dialogEventType', 'OnChange');
                    if (onChangeDialogEvent) {
                      this._controller.sendWidgetValue();
                    }
                  }
                }
              }
            }
          }
        },

        /**
         * This method gets called when the widget emits its 'blur' event
         * @private
         */
        _onBlur: function() {
          if (this._hasValueChanged()) {
            this._controller.sendWidgetValue();
          }
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
          var auiValue = this._valueNode.attribute('value').toString();
          return widgetValue !== auiValue;
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._valueNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
