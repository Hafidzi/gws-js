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

modulum('ApplicationHostSidebarWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostSidebarWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ApplicationHostSidebarWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ApplicationHostSidebarWidget.prototype */
      return {
        /** @lends classes.ApplicationHostSidebarWidget */
        $static: {
          displayChangedEvent: "displayChanged"
        },
        __name: "ApplicationHostSidebarWidget",
        _resizerElement: null,
        _dragHandle: null,
        _titleElement: null,
        _currentSize: null,
        _initElement: function() {
          this._currentSize = cls.Size.translate(null, context.constants.theme["gbc-sidebar-default-width"]);
          $super._initElement.call(this);
          this._titleElement = this._element.querySelector(".mt-title");
          this._element.on("transitionend.ApplicationHostSidebarWidget", this._onTransitionEnd.bind(this));
          this._element.on("oTransitionend.ApplicationHostSidebarWidget", this._onTransitionEnd.bind(this));
          this._element.on("webkitTransitionend.ApplicationHostSidebarWidget", this._onTransitionEnd.bind(this));

          this._resizerElement = this._element.querySelector("div.resizer");
          this._dragHandle = this._resizerElement.querySelector("div.firefox_placekeeper");
          this._resizerElement.setAttribute("draggable", "true");
          this._resizerElement.on("dragstart.ApplicationHostSidebarWidget", this._onDragStart.bind(this));
          this._resizerElement.on("dragend.ApplicationHostSidebarWidget", this._onDragEnd.bind(this));
          this._resizerElement.on("drag.ApplicationHostSidebarWidget", this._onDrag.throttle(5).bind(this));
          if (window.browserInfo.isIE || window.browserInfo.isEdge) {
            this._resizerElement.on("mousedown.ApplicationHostSidebarWidget", function() {
              this._resizerElement.style.opacity = 0;
            }.bind(this));
            this._resizerElement.on("mouseup.ApplicationHostSidebarWidget", function() {
              this._resizerElement.style.opacity = "";
            }.bind(this));
          }
          window.addEventListener("resize", this.updateResize.debounce().bind(this, null));
        },
        _onTransitionEnd: function(evt) {
          if (evt.target.hasClass("mt-sidebar")) {
            if (evt.target.offsetLeft || this.getParentWidget().getElement().hasClass("mt-sidebar-displayed")) {
              this.getParentWidget().setStyle(">.mt-centralcontainer", {
                left: 0
              });
            } else {
              this.getParentWidget().setStyle(">.mt-centralcontainer", {
                left: this._currentSize + "px"
              });
            }
            this.emit(cls.ApplicationHostSidebarWidget.displayChangedEvent);
          }
        },
        getTitle: function() {
          return this._titleElement.textContent;
        },
        setTitle: function(title) {
          this._titleElement.textContent = title;
        },
        onDisplayChanged: function(hook) {
          return this.on(cls.ApplicationHostSidebarWidget.displayChangedEvent, hook);
        },

        _onDragOver: function(evt) {
          this._pageX = evt.screenX || evt.pageX;
          evt.preventDefault();
        },
        _onDragStart: function(evt) {
          document.body.on("dragover.ApplicationHostSidebarWidget", this._onDragOver.bind(this));
          this._isDragging = true;
          if (window.browserInfo.isFirefox) {
            evt.dataTransfer.setData('text', ''); // for Firefox compatibility
          }
          if (evt.dataTransfer.setDragImage) {
            evt.dataTransfer.setDragImage(this._dragHandle, 0, 0);
          }
          evt.dataTransfer.effectAllowed = "move";
          this._pageX = this._resizerDragX = evt.screenX || evt.pageX;
          this._origin = this._currentSize;
        },
        _onDragEnd: function(evt) {
          document.body.off("dragover.ApplicationHostSidebarWidget");
          this._isDragging = false;
        },
        _onDrag: function(evt) {
          if (this._isDragging) {
            var deltaX = this._pageX - this._resizerDragX;
            this.updateResize(deltaX);
          }
          //evt.preventDefault();
        },
        updateResize: function(deltaX) {
          if (deltaX !== null) {
            this._currentSize = this._origin + deltaX;
            if (this._currentSize < 16) {
              this._currentSize = 16;
            }
          } else {
            this.getParentWidget()._hideSidebar();
          }
          var ol = this._element.offsetLeft;
          if (!!ol || this.getParentWidget().getElement().hasClass("mt-sidebar-displayed")) {
            this.getParentWidget().setStyle(">.mt-centralcontainer", {
              left: 0
            });
          } else {
            this.getParentWidget().setStyle(">.mt-centralcontainer", {
              left: this._currentSize + "px"
            });
          }
          this.setStyle({
            width: this._currentSize + "px"
          });
          this.emit(cls.ApplicationHostSidebarWidget.displayChangedEvent);
        },
        setActiveWindow: function(win) {
          var apps = this.getChildren();
          for (var a = 0; a < apps.length; a++) {
            var sidebarAppItem = apps[a];
            var wins = sidebarAppItem.getChildren();
            for (var w = 0; w < wins.length; w++) {
              var sidebarWinItem = wins[w];
              sidebarWinItem._element.removeClass('activeWindow');
              var subs = sidebarWinItem.getChildren();
              for (var s = 0; s < subs.length; s++) {
                var sidebarSubWinItem = subs[s];
                var isActiveWindow = sidebarSubWinItem._windowWidget === win;
                sidebarSubWinItem._element.toggleClass('visibleWindow', isActiveWindow);
                if (isActiveWindow) {
                  sidebarWinItem._element.addClass('activeWindow');
                }
              }
            }
          }
        }
      };
    });
    cls.WidgetFactory.register('ApplicationHostSidebar', cls.ApplicationHostSidebarWidget);
  });
