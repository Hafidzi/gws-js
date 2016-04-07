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

modulum('ToolBarWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * ToolBar widget.
     * @class classes.ToolBarWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ToolBarWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ToolBarWidget.prototype */
      return {
        __name: "ToolBarWidget",

        /**
         * Priority of this toolbar
         * @param {number} order
         */
        setOrder: function(order) {
          this.setStyle({
            order: order
          });
        },

        /**
         * @returns {number} priority of this toolbar
         */
        getOrder: function() {
          return this.getStyle('order');
        },

        setButtonTextHidden: function(state) {
          if (state) {
            this.getElement().addClass("buttonTextHidden");
          } else {
            this.getElement().removeClass("buttonTextHidden");
          }
        }
      };
    });
    cls.WidgetFactory.register('ToolBar', cls.ToolBarWidget);
  });
