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

modulum('WindowWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for widgets.
     * @class classes.WindowWidget
     * @extends classes.WidgetGroupBase
     */
    cls.WindowWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.WindowWidget.prototype */
      return {
        __name: "WindowWidget",
        _modalWidget: null,

        /**
         * title
         * @type {string}
         */
        _text: null,
        _image: null,
        /** @type {classes.SessionSidebarWindowItemWidget} */
        _sidebarWidget: null,
        /** @type {classes.TopMenuWidget} */
        _topMenuWidget: null,
        /** @type {classes.MenuWidget} */
        _menuWidget: null,
        /** @type {classes.ToolBarWidget} */
        _toolBarWidget: null,
        /** @type {classes.WidgetBase} */
        _closeHostMenuWidget: null,
        _topContainer: null,
        _toolBarContainer: null,

        /**
         * @type {Boolean}
         */
        isModal: false,

        constructor: function() {
          $super.constructor.call(this);
          this._sidebarWidget = cls.WidgetFactory.create("SessionSidebarWindowItem");
          this._sidebarWidget.setWindowWidget(this);
          this._sidebarWidget.onClose(this.emit.bind(this, context.constants.widgetEvents.close));
          this._closeHostMenuWidget = cls.WidgetFactory.create("ApplicationHostWindowCloseMenu");
          this._closeHostMenuWidget.onClick(this.emit.bind(this, context.constants.widgetEvents.close));

          this._topContainer = this._element.querySelector(".gbc_WindowMenuContainerTop");
          this._toolBarContainer = this._element.querySelector(".gbc_WindowToolbarContainer");

          context.HostService.getApplicationHostWidget().getMenu().addChildWidget(this._closeHostMenuWidget);
        },

        destroy: function() {
          if (this._modalWidget) {
            this._modalWidget.hide();
            this._modalWidget.destroy();
            this._modalWidget = null;
          }
          this._topContainer = null;
          this._toolBarContainer = null;
          context.HostService.getApplicationHostWidget().getMenu().removeChildWidget(this._closeHostMenuWidget);
          $super.destroy.call(this);
          this._sidebarWidget.destroy();
          this._sidebarWidget = null;
        },
        /**
         * @param {string} text window title
         */
        setText: function(text) {
          this._text = text;
        },

        /**
         * @returns {string} window title
         */
        getText: function() {
          return this._text;
        },

        setImage: function(image) {
          this._image = image;
          this.getSidebarWidget().setWindowIcon(image);
        },

        getImage: function() {
          return this._image;
        },

        unfreeze: function() {
          this._element.removeClass("frozenWindow");
          this._sidebarWidget.setFrozen(false);
        },
        freeze: function() {
          this._element.addClass("frozenWindow");
          this._sidebarWidget.setFrozen(true);
        },

        /**
         * @param hidden {boolean} true if the widget is hidden, false otherwise
         */
        setHidden: function(hidden) {
          if (this._modalWidget) {
            this._modalWidget.hide();
          }
          if (this._topMenuWidget) {
            this._topMenuWidget.setHidden(hidden);
          }
          if (this._toolBarWidget) {
            this._toolBarWidget.setHidden(hidden);
          }
        },

        /**
         * Defines the menu to be displayed as a modal one
         */
        setAsModal: function() {
          if (!this._modalWidget) {
            this._modalWidget = cls.WidgetFactory.create("Modal");
            this.getParentWidget().getElement().appendChild(this._modalWidget.getElement());
          }
          this._modalWidget.setHeader(this.getText());
          this._modalWidget.setClosable(false);

          this._modalWidget.setContent(this.getElement());
          this.isModal = true;
          this._modalWidget.show();
        },

        /**
         * @returns {boolean} true if the widget is hidden, false otherwise
         */
        isHidden: function() {
          return this._element.hasClass("windowHidden");
        },
        getSidebarWidget: function() {
          return this._sidebarWidget;
        },
        onClose: function(hook) {
          this.on(gbc.constants.widgetEvents.close, hook);
        },
        setClosable: function(closable) {
          this._sidebarWidget.setClosable(closable);
          this._closeHostMenuWidget.setActive(closable);
        },
        enableActions: function() {
          this._closeHostMenuWidget.setHidden(false);
        },
        disableActions: function() {
          this._closeHostMenuWidget.setHidden(true);
        },

        /**
         * @param {classes.TopMenuWidget} topMenu
         */
        addTopMenu: function(topMenu, order, topMenuContainer) {
          this.addChildWidget(topMenu, {
            noDOMInsert: true
          });
          this._topMenuWidget = topMenu;
          if (topMenuContainer !== this) {
            topMenuContainer.addTopMenu(this._topMenuWidget, order);
          } else {
            this._topContainer.appendChild(this._topMenuWidget.getElement());
          }
          this._topMenuWidget.setHidden(!this.isVisible());
        },
        addToolBar: function(toolBar, order, toolBarContainer) {
          this.addChildWidget(toolBar, {
            noDOMInsert: true
          });
          this._toolBarWidget = toolBar;
          if (toolBarContainer !== this) {
            toolBarContainer.addToolBar(this._toolBarWidget, order);
          } else {
            this._toolBarContainer.appendChild(this._toolBarWidget.getElement());
          }
          this._toolBarWidget.setHidden(!this.isVisible());
        },
        addMenu: function(widget) {
          this._menuWidget = widget;
          this.addChildWidget(widget, {
            noDOMInsert: true
          });
          // Default = right panel
          var defaultPanel = this._element.querySelector(".gbc_WindowMenuContainerRight");
          defaultPanel.appendChild(widget.getElement());
        }

      };
    });
    cls.WidgetFactory.register('Window', cls.WindowWidget);
  });
