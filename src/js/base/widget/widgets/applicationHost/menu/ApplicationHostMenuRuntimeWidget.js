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

modulum('ApplicationHostMenuRuntimeWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostMenuRuntimeWidget
     * @extends classes.WidgetBase
     */
    cls.ApplicationHostMenuRuntimeWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ApplicationHostMenuRuntimeWidget.prototype */
      return {
        __name: "ApplicationHostMenuRuntimeWidget",
        _initElement: function() {
          $super._initElement.call(this);

        },

        setIdle: function() {
          this.addClass("hidden");
        },
        setProcessing: function() {
          this.removeClass("hidden");
        }
      };
    });
    cls.WidgetFactory.register('ApplicationHostMenuRuntime', cls.ApplicationHostMenuRuntimeWidget);
  });
