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

modulum('HLineWidget', ['ColoredWidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * HLine widget.
     * @class classes.HLineWidget
     * @extends classes.ColoredWidgetBase
     */
    cls.HLineWidget = context.oo.Class(cls.ColoredWidgetBase, function($super) {
      /** @lends classes.HLineWidget.prototype */
      return {
        __name: "HLineWidget",

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        }
      };
    });
    cls.WidgetFactory.register('HLine', cls.HLineWidget);
  });
