/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('WidgetFactory', ['Factory', 'LogService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WidgetFactory
     */
    cls.WidgetFactory = context.oo.Singleton(function() {
      var defaultFactory = new cls.Factory("Widget");
      var styleFactories = null;
      var STYLES_RE = /\s+/;

      /** @lends classes.WidgetFactory */
      return {
        /**
         *
         * @param {string} id
         * @param {string} style style of the widget
         * @param {Function?} constructor constructor of the widget
         */
        register: function(id, style, constructor) {
          if (!constructor) {
            constructor = style;
            style = null;
          }
          if (style) {
            if (!styleFactories) {
              styleFactories = {};
            }
            var factory = styleFactories[style];
            if (!factory) {
              factory = new cls.Factory("Widget");
              styleFactories[style] = factory;
            }
            factory.register(id, constructor);
          } else {
            defaultFactory.register(id, constructor);
          }
        },
        /**
         *
         * @param {string} id
         */
        unregister: function(id) {},
        /**
         *
         * @param {string} id
         * @param {string} id
         * @returns {classes.WidgetBase}
         */
        create: function(id, styles, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
          if (styleFactories && styles) {
            var styleList = styles.split(STYLES_RE);
            for (var i = 0; i < styleList.length; ++i) {
              var style = styleList[i];
              var factory = styleFactories[style];
              if (factory) {
                return factory.create(id, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
              }
            }
          }
          return defaultFactory.create(id, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        }
      };
    });
  });
