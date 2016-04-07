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

modulum('DateTimeValueVMBehavior', ['BehaviorBase'],
  /**
   * Manage "Text" attribute only for Label widgets
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DateTimeValueVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.DateTimeValueVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.DateTimeValueVMBehavior.prototype */
      return {
        __name: "DateTimeValueVMBehavior",
        /** @type {classes.NodeBase} */
        _valueNode: null,
        _formFieldNode: null,
        /**
         * @constructs {classes.DateTimeValueVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} formFieldNode
         */
        constructor: function(controller, formFieldNode, valueNode) {
          $super.constructor.call(this, controller);
          this._formFieldNode = formFieldNode;
          this._valueNode = valueNode;
        },

        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget) { // for label the function to change text is setValue
            var type = this._formFieldNode.attribute('varType');
            var value = this._valueNode.attribute('value');
            if (type || value) {
              // true if minute not found, false otherwise
              var sec = !type || !~type.toLowerCase().indexOf("minute");
              if (moment.locale() !== navigator.language) {
                moment.locale(navigator.language);
              }
              if (value && !this._isConstruct()) {
                value = cls.DateTimeHelper.toLocaleFormat(value, sec);
              }
              var displayFormat = cls.DateTimeHelper.getLocaleFormat(sec);

              if (widget.setFormat) {
                widget.setFormat(displayFormat);
              }
              if (widget.setValue) {
                widget.setValue(value);
              }
            } else {
              this._failed("Could not apply behavior");
            }
          }
        },

        _isConstruct: function() {
          return this._formFieldNode.attribute('dialogType') === "Construct";
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._valueNode,
            attribute: 'value'
          }, {
            node: this._formFieldNode,
            attribute: 'varType'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._valueNode = null;
          this._formFieldNode = null;
          //this._displayFormat = null;
          $super.destroy.call(this);
        }
      };
    });
  });
