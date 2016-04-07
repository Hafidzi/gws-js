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

modulum('ApplicationHostMenuWindowCloseWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostMenuWindowCloseWidget
     * @extends classes.WidgetBase
     */
    cls.ApplicationHostMenuWindowCloseWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ApplicationHostMenuWindowCloseWidget.prototype */
      return {
        __name: "ApplicationHostMenuWindowCloseWidget",
        _activated: false,
        _initElement: function() {
          $super._initElement.call(this);
          this._element.on("click.ApplicationHostMenuWindowCloseWidget", function() {
            this.emit(context.constants.widgetEvents.click);
          }.bind(this));
        },
        setActive: function(active) {
          this._active = active;
          this._element.toggleClass("gbc_Invisible", !active);
        },
        onClick: function(hook) {
          return this.on(context.constants.widgetEvents.click, hook);
        }
      };
    });
    cls.WidgetFactory.register('ApplicationHostWindowCloseMenu', cls.ApplicationHostMenuWindowCloseWidget);
  });
