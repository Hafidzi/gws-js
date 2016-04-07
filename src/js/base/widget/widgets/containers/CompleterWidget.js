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

modulum('CompleterWidget', ['TextWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.CompleterWidget
     * @extends classes.TextWidgetBase
     */
    cls.CompleterWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.CompleterWidget.prototype */
      return {
        __name: "CompleterWidget",
        _dropDown: null,
        _isVisible: null,
        _size: 0,
        _current: null,
        _valueSet: false,
        _input: null,
        _value: null,
        _initElement: function() {
          $super._initElement.call(this);

          this._dropDown = cls.WidgetFactory.create("ChoiceDropDown");
          this._dropDown.setParentWidget(this);

          this.on(context.constants.widgetEvents.enter, function(event, sender, domEvent) {
            this._dropDown.emit(context.constants.widgetEvents.enter, domEvent);

          }.bind(this));
          this.on(context.constants.widgetEvents.esc, function(event, sender, domEvent) {
            this._dropDown.emit(context.constants.widgetEvents.esc, domEvent);
          }.bind(this));
        },

        /**
         * Will add a completer to the parent widget
         */
        addCompleterWidget: function(parentWidget) {
          this.setParentWidget(parentWidget);
          $(parentWidget.getElement()).after(this.getElement());
          var input = parentWidget.getElement().getElementsByTagName("input")[0];
          cls.KeyboardHelper.bindKeyboardNavigation(input, this);
          context.keyboard(input).bind(['esc'], function(evt) {
            this.emit(context.constants.widgetEvents.esc, evt);
          }.bind(this));
          context.keyboard(input).bind(['tab'], function() {
            this.show(false);
          }.bind(this));
          context.keyboard(input).bind(['shift+tab'], function() {
            this.show(false);
          }.bind(this));
        },

        navigateTo: function(jump, up) {
          if (this._dropDown.isVisible()) {
            this._dropDown.jumpTo(jump, up);
          }
        },

        addChoice: function(choice) {
          var label = cls.WidgetFactory.create("Label");
          label.setValue(choice);
          this._dropDown.addChildWidget(label, function() {
            this.getParentWidget().setValue(this.getValue());
            this._valueSet = true;
          }.bind(this));
        },

        clearChoices: function() {
          this._dropDown.empty();
        },

        setSize: function(size) {
          this._size = size;
        },

        getSize: function() {
          return this._size;
        },

        getValue: function() {
          return this._value;
        },

        setValue: function(value) {
          this._value = value;
        },

        hasFocus: function() {
          return this.getParentWidget().hasFocus();
        },

        show: function(visible) {
          if (this._valueSet === false) {
            this._dropDown.show(visible, true);
          }
          this._valueSet = false;
        }
      };
    });
    cls.WidgetFactory.register('Completer', cls.CompleterWidget);
  });
