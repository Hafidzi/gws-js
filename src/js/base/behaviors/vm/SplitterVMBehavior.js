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

modulum('SplitterVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.SplitterVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.SplitterVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.SplitterVMBehavior.prototype */
      return {
        __name: "SplitterVMBehavior",
        /** @type {classes.NodeBase} */
        _splitterNode: null,
        /**
         * @constructs {classes.SplitterVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} splitterAttributeNode
         */
        constructor: function(controller, splitterAttributeNode) {
          $super.constructor.call(this, controller);
          this._splitterNode = splitterAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setSplitter) {
            var splitter = this._splitterNode.attribute('splitter');
            widget.setSplitter(splitter);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._splitterNode,
            attribute: 'splitter'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._splitterNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
