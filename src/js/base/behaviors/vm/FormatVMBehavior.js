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

modulum('FormatVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FormatVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.FormatVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.FormatVMBehavior.prototype */
      return {
        __name: "FormatVMBehavior",
        /** @type {classes.NodeBase} */
        _formatNode: null,
        /**
         * @constructs {classes.FormatVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} formatNode
         */
        constructor: function(controller, formatNode) {
          $super.constructor.call(this, controller);
          this._formatNode = formatNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFormat) {
            if (this._formatNode && this._formatNode.isAttributesSetByVM('format')) {
              var formatNode = this._formatNode.attribute('format');
              widget.setFormat(formatNode.toUpperCase());
            } else {
              var dbDate = widget.getUserInterfaceWidget().getDbDateFormat();
              var tradionalFormat = cls.DateTimeHelper.parseDbDateFormat(dbDate);
              widget.setFormat(tradionalFormat);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._formatNode,
            attribute: 'format'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._formatNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
