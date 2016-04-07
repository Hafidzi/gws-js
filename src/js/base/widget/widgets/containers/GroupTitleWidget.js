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

modulum('GroupTitleWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Group widget.
     * @class classes.GroupTitleWidget
     * @extends classes.WidgetBase
     */
    cls.GroupTitleWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.GroupTitleWidget.prototype */
      return {
        __name: "GroupTitleWidget",

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },
        /**
         * @param {string} text text describing the group content
         */
        setText: function(text) {
          this._element.textContent = text;
          this._element.toggleClass("empty", !text);
          this.getLayoutInformation().invalidateMeasure();
        },

        /**
         * @returns {string} text describing the group content
         */
        getText: function() {
          return this._element.textContent;
        }
      };
    });
    cls.WidgetFactory.register('GroupTitle', cls.GroupTitleWidget);
  });
