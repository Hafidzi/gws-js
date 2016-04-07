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

modulum('FolderWidget', ['WidgetGroupBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Folder widget.
     * @class classes.FolderWidget
     * @extends classes.WidgetGroupBase
     */
    cls.FolderWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.FolderWidget.prototype */
      return {
        __name: "FolderWidget",
        _tabsElement: null,
        _tabsBarElement: null,
        _tabsTitlesElement: null,
        _tabsPosition: "top",
        /**
         * @type {classes.PageWidget}
         */
        _currentPage: null,

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.FolderLayoutEngine(this);
        },

        _initContainerElement: function() {
          $super._initContainerElement.call(this);
          this._tabsElement = $(this._element);
          this._tabsBarElement = $(this._element).find(">.mt-tabs>.mt-tabbar");
          this._tabsTitlesElement = this._tabsBarElement.find(">.mt-tab-titles");
        },

        /**
         * @param {classes.PageWidget} page the page to add to the folder
         */
        addChildWidget: function(page, options) {
          if (page.__name !== "PageWidget") {
            throw "Only PageWidgets can be added in FolderWidgets";
          }
          $super.addChildWidget.call(this, page, options);
          var titleWidget = page.getTitleWidget();
          this._tabsTitlesElement.append(titleWidget.getElement());
          titleWidget.on(gbc.constants.widgetEvents.click, this.setCurrentPage.bind(this, page));
          titleWidget.on(gbc.constants.widgetEvents.close, this.removeChildWidget.bind(this, page));
          if (this._children.length === 1) {
            // First page to be added, set it as current
            this.setCurrentPage(page);
          }
        },

        /**
         * @param {classes.PageWidget} page the page to remove from the folder
         */
        removeChildWidget: function(page) {
          var titleWidget = page.getTitleWidget();
          var nextCurrentIndex = null;
          if (titleWidget.isCurrent()) {
            nextCurrentIndex = this._children.indexOf(page) - 1;
            if (nextCurrentIndex < 0) {
              nextCurrentIndex = 0;
            }
          }
          titleWidget.getElement().remove();
          page.getElement().remove();
          $super.removeChildWidget.call(this, page);
          if (!!this._children.length && nextCurrentIndex !== null) {
            this.setCurrentPage(this._children[nextCurrentIndex]);
          }
        },

        /**
         * @param {classes.PageWidget} page the new current page
         */
        setCurrentPage: function(page) {
          var container = $(this._containerElement);
          for (var i = 0; i < this._children.length; ++i) {
            var child = this._children[i];
            child.getTitleWidget().setCurrent(child === page);
          }
          if (this._currentPage) {
            this._currentPage.getElement().removeClass("currentPage");
          }
          this._currentPage = page;
          this._currentPage.getElement().addClass("currentPage");

          // Force relayout
          if (this.getParentWidget()) {
            this.getUserInterfaceWidget().getParentWidget().layoutRequest();
          }
        },

        updateCurrentPage: function() {
          if (this._children) {
            for (var i = 0; i < this._children.length; i++) {
              var page = this._children[i];
              if (!page.isHidden()) {
                this.setCurrentPage(page);
                break;
              }
            }
          }
        },

        /**
         * @returns {classes.PageWidget} the current page
         */
        getCurrentPage: function() {
          return this._currentPage;
        },

        getTabsPosition: function() {
          return this._tabsPosition;
        },

        setTabsPosition: function(position) {
          if (position) {
            this._tabsPosition = position;
          } else {
            this._tabsPosition = "top";
          }
          switch (this._tabsPosition) {
            case "top":
            case "bottom":
              this.setStyle({
                "flex-direction": (this._tabsPosition === "top" ? "column" : "column-reverse")
              });
              this.setStyle(">.mt-tabs>.mt-tabbar", {
                "flex-direction": "row"
              });
              this.setStyle(">.mt-tabs>.mt-tabbar>.mt-tab-titles", {
                "flex-direction": "row"
              });
              //this._tabsBarElement.css("flex-direction", "row");
              //this._tabsTitlesElement.css("flex-direction", "row");
              break;
            case "left":
            case "right":
              //this._tabsElement.css("flex-direction", (this._tabsPosition === "left" ? "row" : "row-reverse"));
              this.setStyle({
                "flex-direction": (this._tabsPosition === "left" ? "row" : "row-reverse")
              });
              this.setStyle(">.mt-tabs>.mt-tabbar", {
                "flex-direction": "column"
              });
              this.setStyle(">.mt-tabs>.mt-tabbar>.mt-tab-titles", {
                "flex-direction": "column"
              });
              //this._tabsBarElement.css("flex-direction", "column");
              //this._tabsTitlesElement.css("flex-direction", "column");
              break;
          }
        }

      };
    });
    cls.WidgetFactory.register('Folder', cls.FolderWidget);
  });
