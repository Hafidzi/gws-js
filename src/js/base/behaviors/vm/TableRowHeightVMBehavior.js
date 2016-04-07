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

modulum('TableRowHeightVMBehavior', ['BehaviorBase'],
  /**
   * Manage "height" attribute on widgets to set table row height
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableRowHeightVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableRowHeightVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TableRowHeightVMBehavior.prototype */
      return {
        __name: "TableRowHeightVMBehavior",
        /** @type {classes.NodeBase} */
        _heightNode: null,

        __savedHeight: null,
        /**
         * @constructs {classes.TableRowHeightVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} heightAttributeNode
         */
        constructor: function(controller, heightAttributeNode) {
          $super.constructor.call(this, controller);
          this._heightNode = heightAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setRowHeight) {
            var height = this._heightNode.attribute('height');
            if (this.__savedHeight !== height && height > 1) {
              this.__savedHeight = height;
              // Transform nb of characters to pixels
              var fontInfo = cls.Measurement.fontInfo(widget.getElement());
              height = cls.Measurement.measuredHeight(fontInfo["font-family"], fontInfo["font-size"], height);

              widget.setRowHeight(height);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._heightNode,
            attribute: 'height'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._heightNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
