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

modulum('MonitorWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MonitorWidget
     * @extends classes.WidgetBase
     */
    cls.MonitorWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.MonitorWidget.prototype */
      return {
        __name: "MonitorWidget",
        _initElement: function() {
          $super._initElement.call(this);
        }
      };
    });
    cls.WidgetFactory.register('Monitor', cls.MonitorWidget);
  });
