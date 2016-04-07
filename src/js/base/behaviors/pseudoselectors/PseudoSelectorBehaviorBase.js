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

modulum('PseudoSelectorBehaviorBase', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.PseudoSelectorBehaviorBase
     * @extends classes.BehaviorBase
     */
    cls.PseudoSelectorBehaviorBase = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.PseudoSelectorBehaviorBase.prototype */
      return {
        __name: "PseudoSelectorBehaviorBase",

        _apply: Function.noop,

        setStyleBasedBehaviorsDirty: function(rootNode) {
          rootNode.forThisAndEachDescendant(function(node) {
            var controller = node.getController();
            if (!!controller) {
              controller.setStyleBasedBehaviorsDirty();
            }
          });
        }
      };
    });
  });
