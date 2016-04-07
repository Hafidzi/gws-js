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

modulum('ActionNode', ['StandardNode', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ActionNode
     * @extends classes.StandardNode
     */
    cls.ActionNode = context.oo.Class(cls.StandardNode, function($super) {
      /** @lends classes.ActionNode.prototype */
      return {
        constructor: function(parent, tag, id, attributes, app) {
          $super.constructor.call(this, parent, tag, id, attributes, app);
        },
        destroy: function() {
          $super.destroy.call(this);
        }
      };
    });
    cls.NodeFactory.register("Action", cls.ActionNode);
  });
