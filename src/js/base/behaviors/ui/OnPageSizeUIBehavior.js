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

modulum('OnPageSizeUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnPageSizeUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnPageSizeUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnPageSizeUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnPageSizeUIBehavior",

        /** @type {classes.NodeBase} */
        _pageSizeNode: null,
        /** @type {classes.NodeBase} */
        _activeAttributeNode: null,
        /** @type {classes.NodeBase} */
        _actionActiveAttributeNode: null,
        /** @type {HandleRegistration} */
        _pageSizeHandle: null,
        _requestedPageSize: false,
        /**
         * @constructs {classes.OnPageSizeUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} actionNode
         * @param {classes.NodeBase=} activeAttributeNode
         * @param {classes.NodeBase=} actionActiveAttributeNode
         */
        constructor: function(controller, actionNode) {
          $super.constructor.call(this, controller);
          this._pageSizeNode = actionNode;
        },

        _attachWidget: function() {
          this._pageSizeHandle = this._controller.getWidget().on(gbc.constants.widgetEvents.pageSize, this._onPageSize.bind(this));
        },

        _detachWidget: function() {
          if (this._pageSizeHandle) {
            this._pageSizeHandle();
            this._pageSizeHandle = null;
          }
        },
        /**
         * Creates an action event and sends it to the VM
         */
        _onPageSize: function(event, src, actionName) {

          var widget = this._controller.getWidget();
          this._requestedPageSize = false;

          widget.getLayoutEngine().onLayoutApplied(this._onLayoutApplied.bind(this, widget));
        },

        _onLayoutApplied: function(widget) {
          var layoutInfo = widget.getLayoutInformation();
          var pageSize = this._pageSizeNode.attribute('pageSize');
          var allocatedHeight = layoutInfo._allocated._height;
          var availableHeight = layoutInfo._available._height;

          // Calculate one line height to determine the quantity of needed lines
          var lineHeight = allocatedHeight / pageSize;
          var requestedPageSize = Math.floor(availableHeight / lineHeight);

          if (requestedPageSize !== this._requestedPageSize) {
            var event = new cls.VMConfigureEvent(this._pageSizeNode.getId(), {
              pageSize: requestedPageSize,
              bufferSize: requestedPageSize
            });
            // Tell the VM we want a new PageSize for this Widget
            this._pageSizeNode.getApplication().event(event);
            this._requestedPageSize = requestedPageSize;
          }
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._pageSizeNode = null;
          this._actionActiveAttributeNode = null;
          this._activeAttributeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
