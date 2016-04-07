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

modulum('TableColumnWidthVMBehavior', ['BehaviorBase'],
  /**
   * Manage "width" attribute on widgets to set table column width
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnWidthVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableColumnWidthVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TableColumnWidthVMBehavior.prototype */
      return {
        __name: "TableColumnWidthVMBehavior",
        /** @type {classes.NodeBase} */
        _widthNode: null,

        __savedWidth: null,
        /**
         * @constructs {classes.TableColumnWidthVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} widthAttributeNode
         */
        constructor: function(controller, widthAttributeNode) {
          $super.constructor.call(this, controller);
          this._widthNode = widthAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setWidth) {
            var width = this._widthNode.attribute('width');
            if (this.__savedWidth !== width) {
              this.__savedWidth = width;
              // Transform nb of characters to pixels
              var fontInfo = cls.Measurement.fontInfo(widget.getElement());
              width = cls.Measurement.measuredWidth(fontInfo["font-family"], fontInfo["font-size"], width);

              widget.setWidth(width);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._widthNode,
            attribute: 'width'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._widthNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
