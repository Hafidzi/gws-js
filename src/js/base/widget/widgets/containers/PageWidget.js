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

modulum('PageWidget', ['WidgetGroupBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Page widget.
     * @class classes.PageWidget
     * @extends classes.WidgetGroupBase
     */
    cls.PageWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.PageWidget.prototype */
      return {
        __name: "PageWidget",

        /**
         * the title widget
         * @type {classes.PageTitleWidget}
         */
        _title: null,

        _initElement: function() {
          $super._initElement.call(this);
          this._title = cls.WidgetFactory.create("PageTitle");
          this._title.on(context.constants.widgetEvents.click, function(event) {
            this.emit(context.constants.widgetEvents.click);
          }.bind(this));
        },
        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.PageLayoutEngine(this);
        },

        /**
         * @returns {classes.PageTitleWidget} the title widget
         */
        getTitleWidget: function() {
          return this._title;
        },

        /**
         * @param {classes.WidgetBase} widget the child widget. A Page widget can only have one single child.
         */
        addChildWidget: function(widget, options) {
          if (this._children.length !== 0) {
            throw "A page can only contain a single child";
          }
          $super.addChildWidget.call(this, widget, options);
        },

        /**
         * @param {string} text the text to display in the header
         */
        setText: function(text) {
          this._title.setText(text);
        },

        /**
         * @returns {string} the text to display in the header
         */
        getText: function() {
          return this._title.getText();
        },

        /**
         * @param {string} image the URL of the image or a font-image URL: font:[fontname]:[character]:[color] to display in the header
         */
        setImage: function(image) {
          this._title.setImage(image);
        },

        /**
         * @returns {string} the URL of the displayed image or a font-image URL: font:[fontname]:[character]:[color]
         */
        getImage: function() {
          return this._title.getImage();
        },
        setHidden: function(hidden) {
          $super.setHidden.call(this, hidden);
          this._title.setHidden(hidden);
          // if current is hidden
          if (this.getParentWidget().getCurrentPage() === this && this.isHidden()) {
            // set next visible as currentPage
            this.getParentWidget().updateCurrentPage();
          }
        },
        isVisible: function() {
          return this.getParentWidget().getCurrentPage() === this && !this.isHidden();
        }
      };
    });
    cls.WidgetFactory.register('Page', cls.PageWidget);
  });
