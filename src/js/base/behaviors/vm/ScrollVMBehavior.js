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

modulum('ScrollVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ScrollVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.ScrollVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.ScrollVMBehavior.prototype */
      return {
        __name: "ScrollVMBehavior",
        /** @type {classes.NodeBase} */
        _offsetNode: null,
        /** @type {classes.NodeBase} */
        _pageSizeNode: null,
        /** @type {classes.NodeBase} */
        _sizeNode: null,
        /** @type {Function} */
        _onScrollHandler: null,

        /**
         * @constructs {classes.ScrollVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} pageSizeAttributeNode
         * @param {classes.NodeBase} offsetAttributeNode
         * @param {classes.NodeBase} sizeAttributeNode
         */
        constructor: function(controller, pageSizeAttributeNode, offsetAttributeNode, sizeAttributeNode) {
          $super.constructor.call(this, controller);
          this._pageSizeNode = pageSizeAttributeNode;
          this._offsetNode = offsetAttributeNode;
          this._sizeNode = sizeAttributeNode;

        },
        _apply: function() {
          if (!this._controller.getScrollableWidget) {
            return;
          }
          var widget = this._controller.getScrollableWidget();
          if (widget && widget.setPageSize && widget.setSize) {
            var pageSize = this._pageSizeNode.attribute('pageSize');
            var size = this._sizeNode.attribute('size');

            var scrollWidget = this._controller.getScrollableWidget()._scrollWidget;
            if (scrollWidget) {
              var offset = this._offsetNode.attribute('offset');
              scrollWidget.setOffset(offset);
              scrollWidget.setSize(size);
              scrollWidget.setTotalHeight(scrollWidget._lineHeight * size);

              if (this._onScrollHandler) {
                this._onScrollHandler();
                this._onScrollHandler = null;
              }
              var layoutService = this._pageSizeNode.getApplication().layout;
              this._onScrollHandler = layoutService.afterLayout(function() {
                widget.setPageSize(pageSize);
                widget.setSize(size);

                // update scrollarea & scroller height & refresh scrollWidget
                scrollWidget.refresh();
                layoutService.prepareLayout(scrollWidget);

                if (this._onScrollHandler) {
                  this._onScrollHandler();
                  this._onScrollHandler = null;
                }
              });
            }
          } else {
            this._failed("Could not apply behavior");
          }

        },

        _getWatchedAttributes: function() {
          return [{
            node: this._offsetNode,
            attribute: 'offset'
          }, {
            node: this._sizeNode,
            attribute: 'size'
          }, {
            node: this._pageSizeNode,
            attribute: 'pageSize'
          }];
        },
        /**
         *
         */
        destroy: function() {
          if (this._onScrollHandler) {
            this._onScrollHandler();
            this._onScrollHandler = null;
          }
          this._offsetNode = null;
          this._sizeNode = null;
          this._pageSizeNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
