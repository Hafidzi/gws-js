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

modulum('VisibleIdVmBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.VisibleIdVmBehavior
     * @extends classes.BehaviorBase
     */
    cls.VisibleIdVmBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.VisibleIdVmBehavior.prototype */
      return {
        __name: "VisibleIdVmBehavior",
        /** @type {classes.NodeBase} */
        _formNode: null,
        /**
         * @constructs {classes.VisibleIdVmBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} splitterAttributeNode
         */
        constructor: function(controller, formNode) {
          $super.constructor.call(this, controller);
          this._formNode = formNode;
        },
        /**
         *
         */
        _apply: function() {

          var visibleId = this._formNode.attribute('visibleId');
          if (visibleId >= 0) {
            var visibleNode = this._formNode.getApplication().getNode(visibleId);
            this._setVisible(visibleNode);
          }
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._formNode,
            attribute: 'visibleId'
          }];
        },

        /**
         * routine
         * @param node
         * @private
         */
        _setVisible: function(node) {
          var pageNode = null;
          if (node && node._tag === "Page") {
            pageNode = node;
          } else {
            pageNode = node.getAncestor("Page");
          }

          // Be sure we are in a Folder context
          if (pageNode) {
            var pageWidget = pageNode.getController().getWidget();
            var parentWidget = pageWidget.getParentWidget();
            if (parentWidget && parentWidget.setCurrentPage) {
              parentWidget.setCurrentPage(pageWidget);
              var pageAncestorNode = pageNode.getAncestor("Page");
              // Redo operation if cascading multiple Folder
              if (pageAncestorNode) {
                this._setVisible(pageAncestorNode);
              }
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },

        /**
         *
         */
        destroy: function() {
          this._formNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
