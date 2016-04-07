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

modulum('ApplicationHostMenuDebugWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostMenuDebugWidget
     * @extends classes.WidgetBase
     */
    cls.ApplicationHostMenuDebugWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ApplicationHostMenuDebugWidget.prototype */
      return {
        __name: "ApplicationHostMenuDebugWidget",
        _initElement: function() {
          $super._initElement.call(this);
          this._element.on("click.ApplicationHostMenuDebugWidget", function() {
            context.DebugService.show();
          }.bind(this));
        }
      };
    });
    cls.WidgetFactory.register('ApplicationHostDebugMenu', cls.ApplicationHostMenuDebugWidget);
  });
