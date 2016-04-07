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

modulum('MainContainerWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MainContainerWidget
     * @extends classes.WidgetGroupBase
     */
    cls.MainContainerWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.MainContainerWidget.prototype */
      return {
        __name: "MainContainerWidget",
      };
    });
    cls.WidgetFactory.register('MainContainer', cls.MainContainerWidget);
  });
