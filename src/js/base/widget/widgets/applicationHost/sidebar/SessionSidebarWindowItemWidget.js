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

modulum('SessionSidebarWindowItemWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.SessionSidebarWindowItemWidget
     * @extends classes.WidgetBase
     */
    cls.SessionSidebarWindowItemWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.SessionSidebarWindowItemWidget.prototype */
      return {
        __name: "SessionSidebarWindowItemWidget",
        _windowName: null,
        _windowIconImage: null,
        _windowWidget: null,
        _initElement: function() {
          $super._initElement.call(this);
          this._windowName = this._element.querySelector(".windowName");
          this._element.on("click.SessionSidebarWindowItemWidget", function() {
            var ui = this._windowWidget.getUserInterfaceWidget();
            this.setActiveWindow(this._windowWidget);
            ui.setCurrentWindowId(this._windowWidget._auiTag);
            this.getParentWidget().closeSidebar();
          }.bind(this));
          this._element.querySelector(".close").on("click.SessionSidebarWindowItemWidget", function() {
            this.emit(context.constants.widgetEvents.close);
          }.bind(this));
        },
        destroy: function() {
          this._windowWidget = null;
          $super.destroy.call(this);
        },
        setWindowName: function(text) {
          this._windowName.textContent = text;
          this._windowName.setAttribute("title", text);
        },
        getWindowName: function() {
          return this._windowName.textContent;
        },
        setWindowIcon: function(image) {
          if (!this._windowIconImage) {
            this._windowIconImage = cls.WidgetFactory.create("Image");
            this._element.querySelector(".windowIcon").prependChild(this._windowIconImage.getElement());
          }
          this._windowIconImage.setHidden(true);
          if (image && image !== "") {
            this._windowIconImage.setSrc(image);
            this._windowIconImage.setHidden(false);
          }
        },
        setWindowWidget: function(widget) {
          this._windowWidget = widget;
        },
        onClose: function(hook) {
          this.on(context.constants.widgetEvents.close, hook);
        },
        setCurrent: function() {
          if (!this.getParentWidget() || !this.getParentWidget().getParentWidget()) {
            return;
          }
          var sessionSidebar = this.getParentWidget().getParentWidget().getParentWidget();
          var apps = sessionSidebar.getChildren();
          for (var a = 0; a < apps.length; a++) {
            var sidebarAppItem = apps[a];
            var wins = sidebarAppItem.getChildren();
            for (var w = 0; w < wins.length; w++) {
              var sidebarWinItem = wins[w];
              sidebarWinItem._element.toggleClass('activeWindow', sidebarWinItem === this.getParentWidget());
              var subs = sidebarWinItem.getChildren();
              for (var s = 0; s < subs.length; s++) {
                var sidebarSubWinItem = subs[s];
                this.setActiveWindow(this._windowWidget);
              }
            }
          }
        },

        setActiveWindow: function(win) {
          var sessionSidebar = this.getParentWidget().getParentWidget().getParentWidget();
          var apps = sessionSidebar.getChildren();
          for (var a = 0; a < apps.length; a++) {
            var sidebarAppItem = apps[a];
            var wins = sidebarAppItem.getChildren();
            for (var w = 0; w < wins.length; w++) {
              var sidebarWinItem = wins[w];
              sidebarWinItem._element.toggleClass('activeWindow', sidebarWinItem === this.getParentWidget());
              var subs = sidebarWinItem.getChildren();
              for (var s = 0; s < subs.length; s++) {
                var sidebarSubWinItem = subs[s];
                sidebarSubWinItem._element.toggleClass('visibleWindow', sidebarSubWinItem._windowWidget === win);
              }
            }
          }
        },

        isCurrent: function() {
          return this._element.hasClass('activeWindow');
        },
        setFrozen: function(frozen) {
          this._element.toggleClass("frozenWindow", !!frozen);
        },
        setClosable: function(closable) {
          this._element.toggleClass("closableWindow", !!closable);
        }
      };
    });
    cls.WidgetFactory.register('SessionSidebarWindowItem', cls.SessionSidebarWindowItemWidget);
  });
