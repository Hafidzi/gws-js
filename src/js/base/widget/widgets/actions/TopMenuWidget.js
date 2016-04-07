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

modulum('TopMenuWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * TopMenu widget.
     * @class classes.TopMenuWidget
     * @extends classes.WidgetGroupBase
     */
    cls.TopMenuWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.TopMenuWidget.prototype */
      return {
        __name: "TopMenuWidget",
        /**
         * Priority of this menu
         * @param {number} order
         */
        setOrder: function(order) {
          this.setStyle({
            order: order
          });
        },

        /**
         * @returns {number} priority of this menu
         */
        getOrder: function() {
          return this.getStyle('order');
        }
      };
    });
    cls.WidgetFactory.register('TopMenu', cls.TopMenuWidget);
  });
