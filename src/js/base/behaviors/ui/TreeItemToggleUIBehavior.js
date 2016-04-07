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

modulum('TreeItemToggleUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TreeItemToggleUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.TreeItemToggleUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.TreeItemToggleUIBehavior.prototype */
      return {
        __name: "TreeItemToggleUIBehavior",
        /** @type {classes.NodeBase} */
        _treeViewColumnNode: null,
        /** @type {HandleRegistration} */
        _onClickHandle: null,

        /**
         * @constructs {classes.TreeItemToggleUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} treeViewColumnNode
         */
        constructor: function(controller, treeViewColumnNode) {
          $super.constructor.call(this, controller);
          this._treeViewColumnNode = treeViewColumnNode;
        },

        /**
         *
         * @param event
         * @param sender
         * @param index
         * @private
         */
        _toggleState: function(event, sender, index) {
          var tableNode = this._treeViewColumnNode.getParentNode();
          var treeItemNode = tableNode.findNodeWithAttributeValue("TreeItem", "row", index);

          if (treeItemNode.attribute('hasChildren') !== 0) {
            var expanded = treeItemNode.attribute('expanded');
            if (expanded === 0) {
              expanded = 1;
            } else {
              expanded = 0;
            }
            var vmEvent = new cls.VMConfigureEvent(treeItemNode.getId(), {
              expanded: expanded
            });
            treeItemNode.getApplication().event(vmEvent);
          }
        },

        /**
         *
         * @protected
         */
        _attachWidget: function() {
          var treeViewColumnWidget = this._controller.getWidget();
          if (treeViewColumnWidget) {
            this._onClickHandle = treeViewColumnWidget.on(context.constants.widgetEvents.click, this._toggleState.bind(this));
          }

        },
        /**
         *
         * @protected
         */
        _detachWidget: function() {
          if (this._onClickHandle) {
            this._onClickHandle();
            this._onClickHandle = null;
          }
        },
        /**
         *
         */
        destroy: function() {
          this._treeItemNode = null;
          this._treeViewColumnNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
