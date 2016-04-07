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

modulum('CurrentWindowVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.CurrentWindowVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.CurrentWindowVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.CurrentWindowVMBehavior.prototype */
      return {
        __name: "CurrentWindowVMBehavior",
        /** @type {classes.NodeBase} */
        _currentWindowNode: null,
        /**
         * @constructs {classes.CurrentWindowVMBehavior}
         * @param {classes.UserInterfaceController} controller
         * @param {classes.NodeBase} currentWindowNode
         */
        constructor: function(controller, currentWindowNode) {
          $super.constructor.call(this, controller);
          this._currentWindowNode = currentWindowNode;
        },
        /**
         * Switches the current window
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setCurrentWindowId) {
            var currentWindowId = this._currentWindowNode.attribute('currentWindow');
            widget.setCurrentWindowId(currentWindowId);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._currentWindowNode,
            attribute: 'currentWindow'
          }];
        },
        /**
         * @inheritDoc
         */
        destroy: function() {
          this._currentWindowNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
