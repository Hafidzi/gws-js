/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('ButtonTextHiddenVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ButtonTextHiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ButtonTextHiddenVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ButtonTextHiddenVMBehavior.prototype */
      return {
        __name: "ButtonTextHiddenVMBehavior",
        /** @type {classes.NodeBase} */
        _toolBarNode: null,
        /**
         * @constructs {classes.ButtonTextHiddenVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} toolBarNode
         */
        constructor: function(controller, toolBarNode) {
          $super.constructor.call(this, controller);
          this._toolBarNode = toolBarNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (!(widget && widget.setButtonTextHidden)) {
            this._failed("Could not apply behavior");
          } else {
            var buttonTextHidden = this._toolBarNode.attribute('buttonTextHidden');
            widget.setButtonTextHidden(buttonTextHidden);
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._toolBarNode,
            attribute: 'buttonTextHidden'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._toolBarNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
