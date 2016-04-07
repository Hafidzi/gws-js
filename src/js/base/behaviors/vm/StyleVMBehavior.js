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

modulum('StyleVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.StyleVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.StyleVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.StyleVMBehavior.prototype */
      return {
        /** @lends classes.StyleVMBehavior */
        $static: {
          SPACES_RE: /\s+/
        },
        __name: "StyleVMBehavior",
        /** @type {classes.NodeBase} */
        _styleNode: null,

        /**
         * @constructs {classes.StyleVMBehavior}
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
          var widget = this._controller.getWidget();
          var i = 0;
          if (widget) {
            var style = this._styleNode.attribute('style');
            if (style !== undefined) {
              var styles = style.split(cls.StyleVMBehavior.SPACES_RE);
              for (i = 0; i < styles.length; ++i) {
                var styleItem = styles[i];
                if (styleItem.length > 0) {
                  var className = 'gbc_style_' + styleItem;
                  if (!widget.hasClass(className)) {
                    widget.addClass(className);
                  }
                }
              }
            }
          }
          this._styleNode.updateApplicableStyles();
          var start = this._controller._behaviors.indexOf(this);
          for (i = start; i < this._controller._behaviors.length; i++) {
            if (this._controller._behaviors[i].styleBased) {
              this._controller._behaviors[i]._setDirty();
            }
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
