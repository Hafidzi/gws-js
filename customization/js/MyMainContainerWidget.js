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

modulum('MyMainContainerWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.MyMainContainerWidget
     * @extends classes.WidgetGroupBase
     */
    cls.MyMainContainerWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.MyMainContainerWidget.prototype */
      return {
        __name: "MyMainContainerWidget",

        constructor: function() {
          $super.constructor.call(this);

          var headerBar = new cls.MyHeaderBarWidget();
          headerBar.setParentWidget(this);
          this.getElement().querySelector("header").appendChild(headerBar.getElement());
        },
      };
    });
    cls.WidgetFactory.register('MainContainer', cls.MyMainContainerWidget);
  });
