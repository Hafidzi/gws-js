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

modulum('WidgetGroupBase', ['TextWidgetBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for widget group.
     * @class classes.WidgetGroupBase
     * @extends classes.TextWidgetBase
     */
    cls.WidgetGroupBase = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.WidgetGroupBase.prototype */
      return {
        __name: "WidgetGroupBase",
        /**
         * @protected
         * @type Element
         */
        _containerElement: null,
        /**
         * @protected
         * @type {classes.WidgetBase[]}
         */
        _children: null,
        /**
         * @constructs {classes.WidgetGroupBase}
         */
        constructor: function() {
          this._children = [];
          $super.constructor.call(this);
          this._initContainerElement();
        },
        _initContainerElement: function() {
          var elt = this._element;
          this._containerElement = elt.hasClass("containerElement") ? elt : elt.querySelector(".containerElement");
          if (!this._containerElement) {
            throw "Widgets inheriting WidgetGroupBase must have one container with class containerElement in its template";
          }
        },
        destroy: function() {
          this._containerElement = null;
          $super.destroy.call(this);
        },
        getContainerElement: function() {
          return this._containerElement;
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         * @param {Object=} options - possible options
         * @param {boolean=} options.noDOMInsert - won't add child to DOM
         * @param {number=} options.position - insert position
         * @param {string=} options.tag - context tag
         * @param {string=} options.mode - context mode : null|"replace"
         */
        addChildWidget: function(widget, options) {
          options = options || {};
          var position = Object.isNumber(options.position) ? options.position : (this._children.length);
          widget.setParentWidget(this);
          if (!options.noDOMInsert) {
            this._addChildWidgetToDom(widget, position);
          }
          this._children.splice(position, 0, widget);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         * @param {number} position
         */
        _addChildWidgetToDom: function(widget, position) {
          widget._element.insertAt(position, this._containerElement);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        removeChildWidget: function(widget) {
          this._removeChildWidgetFromDom(widget);
          widget.setParentWidget(null);
          this._children.remove(widget);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        _removeChildWidgetFromDom: function(widget) {
          if (widget._element.parentNode === this._containerElement) {
            widget._element.remove();
          }
        },
        /**
         *
         * @param {classes.WidgetBase} oldWidget
         * @param {classes.WidgetBase} newWidget
         */
        replaceChildWidget: function(oldWidget, newWidget) {
          var index = this.getIndexOfChild(oldWidget);
          newWidget.getLayoutInformation().setOwningGrid(oldWidget.getLayoutInformation().getOwningGrid());
          this.removeChildWidget(oldWidget);
          this.addChildWidget(newWidget, {
            position: index,
            mode: "replace"
          });
        },
        /**
         * Remove all children
         */
        empty: function() {
          var remove = this._children.slice();
          for (var i = 0; i < remove.length; i++) {
            this.removeChildWidget(remove[i]);
          }
        },
        /**
         *
         * @param widget
         * @returns {Number} widget position
         */
        getIndexOfChild: function(widget) {
          return this._children.indexOf(widget);
        },
        /**
         * @returns {classes.WidgetBase[]} the list of children of this widget group
         */
        getChildren: function() {
          return this._children;
        },
        /**
         * Set widget at position 'pos' as Current Widget by adding 'current' class on its element
         * @param {Number} position of the widget to set
         * @returns {Widget}
         */
        setCurrentChildren: function(pos) {
          var currentChildren = null;
          for (var i = 0; i < this._children.length; i++) {
            var item = this._children[i].getElement();
            if (i === pos) {
              if (!item.hasClass("current")) {
                item.addClass("current");
                currentChildren = this._children[i];
              }
            } else {
              item.removeClass("current");
            }
          }
          return currentChildren;
        },
        /**
         * Scroll to widget line if needed (widget not visible on screen)
         * @param {Widget} widget
         * @param {Boolean} if true, once scrolled widget appears at the top of the scroll container, otherwise at bottom
         */
        scrollChildrenIntoView: function(child, alignToTop) {
          var elemTop = child.getElement().offsetTop;
          var elemHeight = child.getElement().offsetHeight;
          var containerHeight = this.getElement().scrollTop + (!alignToTop ? this.getElement().offsetHeight : 0);
          var scroll = alignToTop ? (elemTop < containerHeight) : ((elemTop + elemHeight) > containerHeight);
          if (scroll) {
            child.getElement().scrollIntoView(alignToTop);
          }
        },
        /**
         * Returns current widget (flagged with 'current' class)
         * @returns {Widget}
         */
        getCurrentChildren: function() {
          for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (child.getElement().hasClass("current")) {
              return child;
            }
          }
          return null;
        }

      };
    });
  });
