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

modulum('UserInterfaceWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * UserInterface widget.
     * @class classes.UserInterfaceWidget
     * @extends classes.WidgetGroupBase
     */
    cls.UserInterfaceWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.UserInterfaceWidget.prototype */
      return {
        __name: "UserInterfaceWidget",

        $static: {
          startMenuPosition: 'gStartMenuPosition'
        },

        _text: "",
        _image: null,
        _topMenuContainer: null,
        _toolBarContainer: null,
        _startMenuContainer: null,
        _sidebarWidget: null,
        /** @type {number} */
        _currentWindowIdRef: null,
        /** @type {classes.WidgetBase} */
        _focusedWidget: null,
        _dbDate: "MDY4/", // default format

        constructor: function() {
          $super.constructor.call(this);
          this._topMenuContainer = this._element.querySelector(".gbc_topMenuContainer");
          this._toolBarContainer = this._element.querySelector(".gbc_toolBarContainer");
          this._startMenuContainer = this._element.querySelector(".gbc_startMenuContainer");
        },
        destroy: function() {
          this._topMenuContainer = null;
          this._toolBarContainer = null;
          $super.destroy.call(this);
        },
        getSidebarWidget: function() {
          return this._sidebarWidget;
        },
        setSidebarWidget: function(widget) {
          this._sidebarWidget = widget;
        },
        /**
         * @inheritDoc
         */
        addChildWidget: function(widget, options) {
          $super.addChildWidget.call(this, widget, options);
          if (widget instanceof cls.WindowWidget && !!this.getSidebarWidget()) {
            this.getSidebarWidget().addChildWidget(widget.getSidebarWidget());
          }
          this._syncCurrentWindow();
        },

        removeChildWidget: function(widget) {
          if (widget instanceof cls.WindowWidget && !!this.getSidebarWidget()) {
            this.getSidebarWidget().removeChildWidget(widget.getSidebarWidget());
          }
          $super.removeChildWidget.call(this, widget);
        },

        addTopMenu: function(widget, order) {
          widget.setOrder(order);
          if (widget.getParentWidget() === null) {
            this.addChildWidget(widget, {
              noDOMInsert: true
            });
          }
          this._topMenuContainer.appendChild(widget.getElement());
        },

        addStartMenu: function(widget) {
          this._startMenuContainer.appendChild(widget.getElement());
        },

        addToolBar: function(widget, order) {
          widget.setOrder(order);
          if (widget.getParentWidget() === null) {
            this.addChildWidget(widget, {
              noDOMInsert: true
            });
          }
          this._toolBarContainer.appendChild(widget._element);
        },
        /**
         * Sets the current window
         * @param {classes.WindowWidget} window the window to set as current
         */
        setCurrentWindowId: function(windowIdRef) {
          this._currentWindowIdRef = windowIdRef;
          this._syncCurrentWindow();
        },

        _syncCurrentWindow: function() {
          var currentWin = this.getCurrentWindow();
          if (currentWin) {
            if (currentWin.$().nextAll().is(".gbc_WindowWidget")) {
              this._containerElement.appendChild(currentWin.getElement());
            }
            // If a window becomes the current one and is on the top of the stack,
            // we still need to restore its ToolBars and TopMenus
            for (var i = 0; i < this.getChildren().length; ++i) {
              var win = this.getChildren()[i];
              if (win._topMenuWidget) {
                win._topMenuWidget.setHidden(win !== currentWin);
              }
              if (win._toolBarWidget) {
                win._toolBarWidget.setHidden(win !== currentWin);
              }
            }
            currentWin._sidebarWidget.setCurrent();

            context.HostService.setDisplayedWindow(currentWin);
            this.emit(cls.UserInterfaceWidget.startMenuPosition, currentWin._auiTag);
          }
        },
        /**
         * @returns {classes.WindowWidget} the current window
         */
        getCurrentWindow: function() {
          for (var i = 0; i < this.getChildren().length; ++i) {
            var win = this.getChildren()[i];
            if (win._auiTag === this._currentWindowIdRef) {
              return win;
            }
          }
          return null;
        },
        /**
         *
         * @param {classes.WidgetBase} widget which gains VM focus
         */
        setFocusedWidget: function(focusedWidget) {
          if (this._focusedWidget && this._focusedWidget !== focusedWidget) {
            if (this._focusedWidget.getElement()) {
              this._focusedWidget.getElement().removeClass("gbc_Focus");
            }
            this._focusedWidget.loseFocus();
          }
          this._focusedWidget = focusedWidget;
          this._focusedWidget.getElement().addClass("gbc_Focus");
        },
        /**
         * @returns {classes.WidgetBase} current focused widget (by VM)
         */
        getFocusedWidget: function() {
          return this._focusedWidget;
        },
        /**
         * @param {String} text The window title
         */
        setText: function(text) {
          this._text = text;
        },
        /**
         * @returns {String} The window title
         */
        getText: function() {
          return this._text;
        },

        setImage: function(image) {
          this._image = image;
          this.getSidebarWidget().setApplicationIcon(image);
        },

        getImage: function() {
          return this._image;
        },

        getDbDateFormat: function() {
          return this._dbDate;
        },

        setDbDateFormat: function(format) {
          this._dbDate = format;
        }
      };
    });
    cls.WidgetFactory.register('UserInterface', cls.UserInterfaceWidget);
  });
