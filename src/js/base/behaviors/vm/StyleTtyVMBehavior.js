/**
 * Created by amp on 10/08/15.
 */
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

modulum('StyleTtyVMBehavior', ['BehaviorBase'],
  /**
   * Manage "name" & "value" attribute
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.StyleTtyVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.StyleTtyVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.StyleTtyVMBehavior.prototype */
      return {
        __name: "StyleTtyVMBehavior",
        /** @type {classes.NodeBase} */
        _styleNode: null,

        /**
         * @constructs {classes.StyleTtyVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} styleNode
         */
        constructor: function(controller, styleNode) {
          $super.constructor.call(this, controller);
          this._styleNode = styleNode;
        },
        /**
         *
         */
        _apply: function() {
          if (this._styleNode) {
            var widget = this._controller.getWidget();
            var style = this._styleNode.attribute("style");

            if (widget) {
              if (style === "dialog" && widget.setAsModal) {
                widget.setAsModal();
              }
            }

          } else {
            this._failed("Could not apply behavior");
          }

        },
        _getWatchedAttributes: function() {
          return [{
            node: this._styleNode,
            attribute: 'style'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._styleNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
