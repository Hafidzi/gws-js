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

modulum('RowSelectionUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.RowSelectionUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.RowSelectionUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.RowSelectionUIBehavior.prototype */
      return {
        __name: "RowSelectionUIBehavior",

        /** @type {classes.NodeBase} */
        _tableNode: null,
        /** @type {classes.NodeBase} */
        _anchorNode: null,
        /** @type {HandleRegistration} */
        _onClickHandle: null,

        /**
         * @constructs {classes.RowSelectionUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, anchorNode, tableNode) {
          $super.constructor.call(this, controller);
          this._anchorNode = anchorNode;
          this._tableNode = tableNode;
        },

        _onClick: function(event, sender, domEvent) {
          if (this._tableNode.attribute('multiRowSelection') !== 0) {
            var offset = this._tableNode.attribute('offset');
            var index = this._anchorNode.getIndex();
            var clickedRow = offset + index;

            var vmEvent = this._tableNode.getController().buildRowSelectionEvent(clickedRow, domEvent.ctrlKey, domEvent.shiftKey);
            this._tableNode.getApplication().event(vmEvent);
          }
        },

        /**
         * @inheritDoc
         * @protected
         */
        _attachWidget: function() {
          var widget = this._controller.getWidget();
          this._onClickHandle = widget.on(context.constants.widgetEvents.click, this._onClick.bind(this));
        },
        /**
         * @inheritDoc
         * @protected
         */
        _detachWidget: function() {
          if (this._onClickHandle) {
            this._onClickHandle();
            this._onClickHandle = null;
          }
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._tableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
