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

modulum('ToolBarSeparatorWidget', ['ColoredWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * ToolBarSeparator widget.
     * @class classes.ToolBarSeparatorWidget
     * @extends classes.ColoredWidgetBase
     */
    cls.ToolBarSeparatorWidget = context.oo.Class(cls.ColoredWidgetBase, function($super) {
      /** @lends classes.ToolBarSeparatorWidget.prototype */
      return {
        __name: "ToolBarSeparatorWidget"
      };
    });
    cls.WidgetFactory.register('ToolBarSeparator', cls.ToolBarSeparatorWidget);
  });
