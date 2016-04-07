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

modulum('MessageController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MessageController
     * @extends classes.ControllerBase
     */
    cls.MessageController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.MessageController.prototype */
      return {
        __name: "MessageController",
        _initBehaviors: function() {
          $super._initBehaviors.call(this);
          var anchor = this.getNodeBindings().anchor;
          // 4st behaviors
          this._addBehavior(new cls.FontStyle4STBehavior(this));
          this._addBehavior(new cls.FontSize4STBehavior(this));
          this._addBehavior(new cls.Border4STBehavior(this));
          // vm behaviors
          this._addBehavior(new cls.StyleVMBehavior(this, anchor));
          this._addBehavior(new cls.ColorMessageVMBehavior(this, anchor, anchor, anchor));
          this._addBehavior(new cls.BackgroundColorMessageVMBehavior(this, anchor, anchor, anchor));
          this._addBehavior(new cls.FontWeightVMBehavior(this, anchor));
          this._addBehavior(new cls.FontFamilyVMBehavior(this));
          this._addBehavior(new cls.TextDecorationVMBehavior(this, anchor));
          this._addBehavior(new cls.DisplayMessageVMBehavior(this, anchor));
          this._addBehavior(new cls.TextVMBehavior(this, anchor));
          // ui behaviors
        },

        /**
         * Avoid destruction of the shared message widget
         */
        destroy: function() {
          this._widget.setHidden(true);
          this._widget = null;
          $super.destroy.call(this);
        },

        /**
         * Override default method to use the shared message widget
         */
        createWidget: function() {
          this._widget = this.getAnchorNode().getApplication().getUI().getWidget().getMessageWidget();
        }
      };
    });
    cls.ControllerFactory.register("Message", cls.MessageController);

  });
