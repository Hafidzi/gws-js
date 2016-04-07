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

modulum('TitleVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TitleVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TitleVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TitleVMBehavior.prototype */
      return {
        __name: "TitleVMBehavior",
        /** @type {classes.NodeBase} */
        _commentNode: null,
        /**
         * @constructs {classes.TitleVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} commentAttributeNode
         */
        constructor: function(controller, commentAttributeNode) {
          $super.constructor.call(this, controller);
          this._commentNode = commentAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setTitle) {
            var text = this._commentNode.attribute('comment');
            widget.setTitle(text);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._commentNode,
            attribute: 'comment'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._commentNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
