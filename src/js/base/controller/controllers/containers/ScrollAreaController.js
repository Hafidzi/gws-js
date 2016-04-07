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

modulum('ScrollAreaController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ScrollAreaController
     * @extends classes.ControllerBase
     */
    cls.ScrollAreaController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.ScrollAreaController.prototype */
      return {
        __name: "ScrollAreaController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;

          // These behaviors should stay added at first
          // WARNING : DO NOT ADD BEHAVIORS BEFORE
          this._addBehavior(new cls.LayoutInfoVMBehavior(this, anchor));
          // END WARNING

          // vm behaviors

          this._addBehavior(new cls.EnabledVMBehavior(this, anchor));
          this._addBehavior(new cls.ScrollUIBehavior(this, anchor, anchor, anchor));
          this._addBehavior(new cls.ScrollVMBehavior(this, anchor, anchor, anchor));

          this._matrix = this.findRelatedMatrix();
        },

        //overide function to not create a new widget but attach the grid
        /*
         createWidget: function() {
         var scrollableWidget = this.getScrollableWidget();
         if (!scrollableWidget._scrollWidget && scrollableWidget.setScrollWidget) {
         scrollableWidget.setScrollWidget();
         //scrollableWidget._scrollWidget.setThinScrollBar(1); //1 second before fade...
         }
         return null;
         },
         */

        getScrollableWidget: function() {
          return this.getWidget();
        },

        findRelatedMatrix: function() {
          var srName = this.getAnchorNode().attribute("name");
          var matrix = this._nodeBindings.anchor.getParentNode().getChildrenWithAttribute("Matrix", "screenRecord", srName)[0];
          return matrix;
        },

        _createWidget: function() {
          return cls.WidgetFactory.create('ScrollArea', this.getAnchorNode().attribute('style'));
        }

      };
    });
    cls.ControllerFactory.register("ScrollArea", cls.ScrollAreaController);

  });
