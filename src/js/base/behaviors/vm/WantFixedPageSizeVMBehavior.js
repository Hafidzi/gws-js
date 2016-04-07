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

modulum('WantFixedPageSizeVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Behavior controlling the stretchable scrollGrid
     * @class classes.HiddenVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.WantFixedPageSizeVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.HiddenVMBehavior.prototype */
      return {
        __name: "WantFixedPageSizeVMBehavior",
        /** @type {classes.NodeBase} */
        _activeNode: null,

        _hasBeenStretched: false,
        /**
         * @constructs {classes.WantFixedPageSizeVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} activeAttributeNode
         */
        constructor: function(controller, wantFixedPageSizeNode) {
          $super.constructor.call(this, controller);
          this._wantFixedPageSizeNode = wantFixedPageSizeNode;

        },
        /**
         * Updates the widget's visibility depending on the AUI tree information
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFixedPageSize) {
            var wantFixedPageSize = true;
            if (!!this._wantFixedPageSizeNode) {
              wantFixedPageSize = this._wantFixedPageSizeNode.attribute('wantFixedPageSize');
            }
            widget.setFixedPageSize(!!wantFixedPageSize);
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._wantFixedPageSizeNode,
            attribute: 'active'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._wantFixedPageSizeNode = null;
          $super.destroy.call(this);
        }

      };
    });
  });
