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

modulum('ApplicationHostWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ApplicationHostWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ApplicationHostWidget.prototype */
      return {
        __name: "ApplicationHostWidget",
        /**
         * @type {classes.ApplicationHostSidebarWidget}
         */
        _sidebar: null,
        /**
         * @type {classes.ApplicationHostSidebarBackdropWidget}
         */
        _sidebarBackdrop: null,
        /**
         * @type {classes.ApplicationHostMenuWidget}
         */
        _menu: null,
        _launcher: null,
        _initContainerElement: function() {
          $super._initContainerElement.call(this);
          this._sidebar = cls.WidgetFactory.create('ApplicationHostSidebar');
          this._sidebar.setParentWidget(this);
          this._sidebar.onDisplayChanged(this._onDisplayedChanged);
          this._element.prependChild(this._sidebar.getElement());
          this._sidebarBackdrop = cls.WidgetFactory.create('ApplicationHostSidebarBackdrop');
          this._sidebarBackdrop.setParentWidget(this);
          this._element.appendChild(this._sidebarBackdrop.getElement());
          this._menu = cls.WidgetFactory.create('ApplicationHostMenu');
          this._menu.setParentWidget(this);
          this._containerElement.parentNode.insertBefore(this._menu.getElement(), this._containerElement);
          this._menu.on(cls.ApplicationHostMenuWidget.toggleClickEvent, this._showSidebar.bind(this));
          this._sidebarBackdrop.onClick(this._hideSidebar.bind(this));
          this._launcher = cls.WidgetFactory.create('ApplicationLauncher');
          this._launcher.setHidden(true);
          this.addChildWidget(this._launcher);
        },
        getLauncher: function() {
          return this._launcher;
        },
        getSideBar: function() {
          return this._sidebar;
        },
        getMenu: function() {
          return this._menu;
        },
        _showSidebar: function() {
          this._element.addClass("mt-sidebar-displayed");
        },
        _hideSidebar: function() {
          this._element.removeClass("mt-sidebar-displayed");
        },
        enableSidebar: function(enable) {
          this._element.toggleClass("mt-sidebar-unavailable", !enable);
          this._hideSidebar();
        },
        _onDisplayedChanged: function() {
          var app = context.SessionService.getCurrent() && context.SessionService.getCurrent().getCurrentApplication();
          if (app && app.layout) {
            app.layout.refresh();
          }
        }

      };
    });
    cls.WidgetFactory.register('ApplicationHost', cls.ApplicationHostWidget);
  });
