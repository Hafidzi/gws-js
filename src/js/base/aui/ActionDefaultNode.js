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

modulum('ActionDefaultNode', ['NodeBase', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionDefaultNode
     * @extends classes.NodeBase
     */
    cls.ActionDefaultNode = context.oo.Class(cls.NodeBase, function($super) {
      /** @lends classes.ActionDefaultNode.prototype */
      return {
        constructor: function(parent, tag, id, attributes, app) {
          $super.constructor.call(this, parent, tag, id, attributes, app);
          context.keyboard.registerActionDefault(this);
        },
        destroy: function() {
          context.keyboard.unregisterActionDefault(this);
          $super.destroy.call(this);
        }
      };
    });
    cls.NodeFactory.register("ActionDefault", cls.ActionDefaultNode);
  });
