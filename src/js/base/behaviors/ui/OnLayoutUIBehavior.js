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

modulum('OnLayoutUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnLayoutUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnLayoutUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnLayoutUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnLayoutUIBehavior",

        /** @type {classes.NodeBase} */
        _node: null,

        /** @type {HandleRegistration} */
        _layoutHandle: null,

        /**
         * @constructs {classes.OnLayoutUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} node
         */
        constructor: function(controller, node) {
          $super.constructor.call(this, controller);
          this._node = node;
          controller.getWidget().on(gbc.constants.widgetEvents.layout, this._onLayout.bind(this));
        },

        _attachWidget: function() {
          this._layoutHandle = this._node.getApplication().layout.afterLayout(this._onLayout.bind(
            this));
        },

        _detachWidget: function() {
          if (this._layoutHandle) {
            this._layoutHandle();
            this._layoutHandle = null;
          }
        },

        /**
         * On layout widget event: send new page size to vm
         * @private
         */
        _onLayout: function() {
          var pageSize = this._node.attribute('pageSize');
          var bufferSize = this._node.attribute('bufferSize');
          var size = this._node.attribute('size');

          var widget = this._controller.getWidget();
          if (!widget.getLayoutInformation().__layoutPassHidden) {

            var dataAreaHeight = widget.getDataAreaHeight();
            var rowHeight = widget.getRowHeight();

            var newPageSize = Math.floor(dataAreaHeight / rowHeight);
            newPageSize = Number.isNaN(newPageSize) ? 1 : Math.max(newPageSize, 1);
            var newBufferSize = newPageSize + 1;

            if (pageSize !== newPageSize || bufferSize !== newBufferSize) {
              var event = new cls.VMConfigureEvent(this._node.getId(), {
                pageSize: newPageSize,
                bufferSize: newBufferSize
              });

              this._node.getApplication().event(event);
            }
          }
        },

        /**
         * @inheritDoc
         */
        destroy: function() {
          this._node = null;
          $super.destroy.call(this);
        }
      };
    });
  });
