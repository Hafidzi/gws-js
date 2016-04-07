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

modulum('StartMenuSeparatorWidget', ['ColoredWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * StartMenuSeparator widget.
     * @class classes.StartMenuSeparatorWidget
     * @extends classes.ColoredWidgetBase
     */
    cls.StartMenuSeparatorWidget = context.oo.Class(cls.ColoredWidgetBase, function($super) {
      /** @lends classes.StartMenuSeparatorWidget.prototype */
      return {
        __name: "StartMenuSeparatorWidget"
      };
    });
    cls.WidgetFactory.register('StartMenuSeparator', cls.StartMenuSeparatorWidget);
  });
