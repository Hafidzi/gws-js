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

modulum('DropDownContainerWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * DropDown widget.
     * @class classes.DropDownContainerWidget
     * @extends classes.WidgetGroupBase
     */
    cls.DropDownContainerWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.DropDownContainerWidget.prototype */
      return {
        __name: "DropDownContainerWidget",
        __templateName: "DropDownWidget",

        /*
         _initLayout: function() {
         $super._initLayout.call(this);
         this._layoutEngine = new cls.LeafLayoutEngine(this);
         },
         */

        _initContainerElement: function() {
          $super._initContainerElement.call(this);
        },

        getCurrentDropDown: function() {
          return this._children[0];
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         * @param {classes.WidgetBase} options.parent - dropdown associated with a parent dropdown
         * @param {boolean=} options.noDOMInsert - won't add child to DOM
         * @param {number=} options.position - insert position
         */
        addChildWidget: function(widget, options) {
          options = options || {};
          if (!options.parent) {
            this.empty();
          }
          var position = Object.isNumber(options.position) ? options.position : (this._children.length);
          if (!options.noDOMInsert) {
            this._addChildWidgetToDom(widget, position);
          }
          this._children.splice(position, 0, widget);
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        removeChildWidget: function(widget) {
          //widget.unbindBlur();
          widget.emit(context.constants.widgetEvents.close);
          this._removeChildWidgetFromDom(widget);
          this._children.remove(widget);
          //widget.destroy();
        },

        empty: function() {
          var widget = this.getCurrentDropDown();
          if (widget) {
            var parent = widget.getParentWidget();
            if (parent) {
              this.show(parent, widget, false);
            }
          }
          $super.empty.call(this);
        },

        /**
         * Set position & size of dropdown container
         * @param {cls.DropDownWidget} parent
         */
        setPosition: function(parent, widget) {
          var parentElement = $(parent.getElement());
          var poffset = parentElement.offset();
          // detect if dropdown has enough space to display
          var minWidth = parent.getElement().offsetWidth;
          var docHeight = document.body.offsetHeight;
          var elemHeight = parent.getElement().offsetHeight + 1;
          var maxHeight = Math.min((this._element.scrollHeight), 300) || 300;

          /* Auto positioning */
          var top = poffset.top;
          var left = poffset.left;
          if (widget.alignToLeft === false && window.event && window.event.clientX) { // TO IMPROVE BECAUSE OF FF
            left = window.event.clientX;
          }
          var placeTop = docHeight - top >= maxHeight;
          if (!placeTop) {
            if (top < maxHeight) {
              placeTop = true;
              top = 0;
            } else {
              top = docHeight - top;
            }
          } else {
            top += elemHeight;
            if (this.getParentWidget()) { // sub dropdown, place according to parent dropdown
              left += minWidth;
              top -= elemHeight;
            }
            top = Math.max(0, top);
          }

          /* Custom positioning */
          if (widget.x) {
            left = widget.x;
            if (widget.x === "CENTER") {
              left = (window.innerWidth / 2);
            }
          }
          if (widget.y) {
            top = widget.y;
            placeTop = true;
            if (widget.y === "CENTER") {
              top = (window.innerHeight / 2);
            }
          }

          /* Set style  */
          var cssPos = {
            left: left + "px"
          };
          if (widget.autoSize === true) {
            cssPos["min-width"] = minWidth + "px";
            if (maxHeight === 300) {
              cssPos["max-height"] = 300 + "px";
            }
          } else {
            cssPos["max-height"] = (docHeight - top - 5) + "px";
          }
          if (placeTop) {
            cssPos.top = top + "px";
            cssPos.bottom = "auto";
          } else {
            cssPos.top = "auto";
            cssPos.bottom = top + "px";
          }
          this.setStyle(cssPos);
        },
        /**
         * @param {classes.WidgetBase} parent
         * @param {classes.DropDownWidget} widget
         * @param {boolean} visible
         */
        show: function(parent, widget, visible) {
          this._element.toggleClass("active", !!visible)
            .toggleClass("dd_" + parent.getName(), !!visible);

          if (visible) {
            this.setPosition(parent, widget);
          }
        }
      };
    });
    cls.WidgetFactory.register('DropDownContainer', cls.DropDownContainerWidget);
  });
