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

modulum('WindowNode', ['StandardNode', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.WindowNode
     * @extends classes.StandardNode
     */
    cls.WindowNode = context.oo.Class(cls.StandardNode, function() {
      /** @lends classes.WindowNode.prototype */
      return {

        isCurrentWindowNode: function() {
          var ui = this.getAncestor('UserInterface');
          return ui.attribute('currentWindow') === this.getId();
        },

        getActiveDialog: function() {
          var length = this._children.length;
          for (var i = length - 1; i >= 0; --i) {
            var child = this._children[i];
            if (child._tag === 'Menu' || child._tag === 'Dialog') {
              if (child.attribute('active') === 1) {
                return child;
              }
            }
          }
        },

        isModal: function() {
          var windowTypeAttr = this.getStyleAttribute("windowType");
          return windowTypeAttr === "modal" || windowTypeAttr === "popup";
        }
      };
    });
    cls.NodeFactory.register("Window", cls.WindowNode);
  });
