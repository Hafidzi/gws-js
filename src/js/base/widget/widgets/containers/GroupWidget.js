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

modulum('GroupWidget', ['WidgetGridLayoutBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Group widget.
     * @class classes.GroupWidget
     * @extends classes.WidgetGridLayoutBase
     */
    cls.GroupWidget = context.oo.Class(cls.WidgetGridLayoutBase, function($super) {
      /** @lends classes.GroupWidget.prototype */
      return {
        __name: "GroupWidget",
        /**
         * @type {classes.GroupTitleWidget}
         */
        _title: null,
        /**
         * @type {HandleRegistration}
         */
        _gridWidthHandle: null,
        constructor: function() {
          $super.constructor.call(this);
          this._title = cls.WidgetFactory.create("GroupTitle");
          this._gridWidthHandle = this.getLayoutInformation().onGridInfoChanged(this._onGridWidthChanged.bind(this));
          this._element.querySelector(".mt-card>.gbc_GroupWidgetContent").prependChild(this._title.getElement());
        },
        _onGridWidthChanged: function() {
          this._title.getLayoutInformation().setGridWidth(this.getLayoutInformation().getGridWidth());
        },
        destroy: function() {
          this._title.destroy();
          this._gridWidthHandle();
          this._gridWidthHandle = null;
          $super.destroy.call(this);
        },
        setGridChildrenInParent: function(isGridChildrenInParent) {
          if (this._isGridChildrenInParent !== isGridChildrenInParent) {
            if (!isGridChildrenInParent) {
              this._title.getElement().remove();
            }
            $super.setGridChildrenInParent.call(this, isGridChildrenInParent);
            if (isGridChildrenInParent) {
              this.addChildWidget(this._title);
            } else {
              this._element.querySelector(".mt-card>.gbc_GroupWidgetContent").prependChild(this._title.getElement());
            }
          }
        },
        /**
         * @param {string} text text describing the group content
         */
        setText: function(text) {
          this._title.setText(text);
          this.getLayoutInformation().invalidateMeasure();
        },

        /**
         * @returns {string} text describing the group content
         */
        getText: function() {
          return this._title.getText();
        }
      };
    });
    cls.WidgetFactory.register('Group', cls.GroupWidget);
  });
