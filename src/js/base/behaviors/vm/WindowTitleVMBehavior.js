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

modulum('WindowTitleVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowTitleVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.WindowTitleVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.WindowTitleVMBehavior.prototype */
      return {
        __name: "WindowTitleVMBehavior",
        /** @type {classes.NodeBase} */
        _nameNode: null,
        /** @type {classes.NodeBase} */
        _textNode: null,
        /**
         * @constructs {classes.WindowTitleVMBehavior}
         * @param {classes.WindowController} controller
         * @param {classes.NodeBase} nameNode
         * @param {classes.NodeBase} textNode
         */
        constructor: function(controller, nameNode, textNode) {
          $super.constructor.call(this, controller);
          this._nameNode = nameNode;
          this._textNode = textNode;
        },
        /**
         * Switches the current window
         */
        _apply: function() {
          var text = this._textNode.attribute('text');
          var name = this._nameNode.attribute('name');
          this._controller.getWidget().getSidebarWidget().setWindowName(text || name);
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._nameNode,
            attribute: 'name'
          }, {
            node: this._textNode,
            attribute: 'text'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._nameNode = null;
          this._textNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
