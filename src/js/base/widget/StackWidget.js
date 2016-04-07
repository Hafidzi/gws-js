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

modulum('StackWidget', ['WidgetGroupBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for widget group.
     * @class classes.StackWidget
     * @extends classes.WidgetGroupBase
     */
    cls.StackWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.StackWidget.prototype */
      return {
        __name: "StackWidget",

        _currentWidget: null,

        destroy: function() {
          this._currentWidget = null;
          $super.destroy.call(this);
        },

        /**
         * @returns {classes.WidgetBase} the current displayed widget or null
         */
        getCurrentWidget: function() {
          return this._currentWidget;
        },

        /**
         * @param {classes.WidgetBase} widget the widget to display
         */
        setCurrentWidget: function(widget) {
          if (this._currentWidget) {
            this._currentWidget.remove();
          }
          this._currentWidget = widget;
          this._containerElement.appendChild(widget.getElement());
        },

        /**
         * @inheritDoc
         */
        addChildWidget: function(widget, options) {
          $super.addChildWidget.call(this, widget, {
            noDOMInsert: true
          });
          if (this._containerElement.children.length === 0) {
            this.setCurrentWidget(widget);
          }
        },

        /**
         * @inheritDoc
         */
        removeChildWidget: function(widget) {
          var index = this._children.indexOf(widget);
          $super.removeChildWidget.call(this, widget);
          if (widget === this._currentWidget) {
            if (index >= this._children.length) {
              index = this._children.length - 1;
            }
            if (index >= 0) {
              this.setCurrentWidget(this._children[index]);
            } else {
              this._currentWidget = null;
            }
          }
        }
      };
    });
  });
