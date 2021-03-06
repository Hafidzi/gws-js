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

modulum('WaitingWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.WaitingWidget
     * @extends classes.WidgetBase
     */
    cls.WaitingWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.WaitingWidget.prototype */
      return {
        __name: "WaitingWidget"
      };
    });
    cls.WidgetFactory.register('Waiting', cls.WaitingWidget);
  });
