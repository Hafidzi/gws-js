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

modulum('TableImageVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableImageVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableImageVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.TableImageVMBehavior.prototype */
      return {
        __name: "TableImageVMBehavior",
        /** @type {classes.NodeBase} */
        _imageNode: null,
        /**
         * @constructs {classes.TableImageVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} imageAttributeNode
         */
        constructor: function(controller, imageAttributeNode) {
          $super.constructor.call(this, controller);
          this._imageNode = imageAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (!widget) {
            return;
          }
          var tableItemWidget = widget.getParentWidget();
          if (tableItemWidget && tableItemWidget.setImage) {
            var image = this._imageNode.attribute('image');
            tableItemWidget.setImage(image);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._imageNode,
            attribute: 'image'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._imageNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
