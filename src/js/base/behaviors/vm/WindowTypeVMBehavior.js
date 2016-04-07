/**
 * Created by amp on 21/08/15.
 */
/**
 * Created by amp on 20/08/15.
 */
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

modulum('WindowTypeVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowTypeVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.WindowTypeVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.WindowTypeVMBehavior.prototype */
      return {
        __name: "WindowTypeVMBehavior",
        /** @type {classes.NodeBase} */
        _styleNode: null,

        /**
         * @constructs {classes.WindowTypeVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} styleAttributeNode
         */
        constructor: function(controller, styleAttributeNode) {
          $super.constructor.call(this, controller);
          this._styleNode = styleAttributeNode;
        },

        /**
         *
         */
        _apply: function() {
          var widget = this._styleNode.getController().getWidget();
          if (widget && widget.setAsModal) {
            var windowTypeAttr = this._styleNode.attribute("style");
            if (!this._isMenuSpecial(widget, windowTypeAttr)) {
              windowTypeAttr = this._styleNode.getStyleAttribute("windowType");
            }
            if (this._isMenuSpecial(widget, windowTypeAttr)) {
              widget.setAsModal(windowTypeAttr);
            } else if (widget.__name === "WindowWidget" && this._styleNode.isModal()) {
              widget.setAsModal(windowTypeAttr);
            }

          }
        },
        _isMenuSpecial: function(widget, styleAttr) {
          return (widget.__name === "MenuWidget" && (styleAttr === "winmsg" || styleAttr === "dialog" || styleAttr === "popup"));
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
