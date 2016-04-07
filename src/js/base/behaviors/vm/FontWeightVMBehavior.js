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

modulum('FontWeightVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FontWeightVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.FontWeightVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.FontWeightVMBehavior.prototype */
      return {
        __name: "FontWeightVMBehavior",
        /** @type {classes.NodeBase} */
        _boldNode: null,
        /**
         * @constructs {classes.FontWeightVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase=} boldAttributeNode
         */
        constructor: function(controller, boldAttributeNode, boldAttributeValueNode) {
          $super.constructor.call(this, controller);
          this._boldNode = boldAttributeNode;
          this._boldValueNode = boldAttributeValueNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFontWeight) {
            var boldNode = this._boldValueNode || this._boldNode;
            if (boldNode && boldNode.isAttributesSetByVM('bold')) {
              var bold = boldNode.attribute('bold') === 1;
              widget.setFontWeight(bold ? "bold" : null);
            } else {
              var font = this._controller.getAnchorNode().getStyleAttribute('fontWeight');
              if (font) {
                widget.setFontWeight(font);
              }
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._boldNode,
            attribute: 'bold'
          }, {
            node: this._boldValueNode,
            attribute: 'bold',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._boldNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
