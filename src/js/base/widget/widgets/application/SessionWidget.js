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

modulum('SessionWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.SessionWidget
     * @extends classes.WidgetGroupBase
     */
    cls.SessionWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.SessionWidget.prototype */
      return {
        __name: "SessionWidget",
        _waiter: null,
        _sidebarWidget: null,
        _endWidget: null,
        __zIndex: 0,
        _currentWidgetStack: null,
        constructor: function() {
          this._currentWidgetStack = [];
          $super.constructor.call(this);
        },
        _initElement: function() {
          $super._initElement.call(this);
          this._endWidget = cls.WidgetFactory.create('SessionEnd');
          this._endWidget.setHidden(true);
          this._element.appendChild(this._endWidget.getElement());
        },

        addChildWidget: function(widget, options) {
          $super.addChildWidget.call(this, widget, options);
          if (widget instanceof cls.ApplicationWidget) {
            this.getSidebarWidget().addChildWidget(widget.getSidebarWidget());
          }
        },

        removeChildWidget: function(widget) {
          if (widget instanceof cls.ApplicationWidget) {
            var displayedWidget = this._currentWidgetStack.length > 1 ? this._currentWidgetStack[this._currentWidgetStack.length -
              2] : null;
            this.setCurrentWidget(displayedWidget);

            this.getSidebarWidget().removeChildWidget(widget.getSidebarWidget());
          }
          $super.removeChildWidget.call(this, widget);
        },

        /**
         *
         * @param {classes.ApplicationWidget} widget
         */
        setCurrentWidget: function(widget) {
          var previousWidget = this.getCurrentWidget();
          if (previousWidget) {
            previousWidget.disable();
          }

          var currentWidget = this._currentWidgetStack.length && this._currentWidgetStack[this._currentWidgetStack.length - 1];
          if (currentWidget && currentWidget.getLayoutInformation()) {
            currentWidget.getLayoutInformation().needLayout = false;
          }
          this._currentWidgetStack.remove(widget);
          this._currentWidgetStack.push(widget);
          if (widget) {
            widget.setStyle({
              "z-index": ++this.__zIndex
            });
            if (widget.getLayoutInformation()) {
              widget.getLayoutInformation().needLayout = true;
            }
            widget.activate();
          }
        },
        getCurrentWidget: function() {
          if (this._currentWidgetStack && this._currentWidgetStack.length) {
            return this._currentWidgetStack[this._currentWidgetStack.length - 1];
          }
          return null;
        },
        getSidebarWidget: function() {
          return this._sidebarWidget;
        },
        setSidebarWidget: function(widget) {
          this._sidebarWidget = widget;
        },
        showEnd: function() {
          this._endWidget.setHidden(false);
        },
        getEndWidget: function() {
          return this._endWidget;
        }
      };
    });
    cls.WidgetFactory.register('Session', cls.SessionWidget);
  });
