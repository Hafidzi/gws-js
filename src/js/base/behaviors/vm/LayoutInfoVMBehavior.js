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

modulum('LayoutInfoVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.LayoutInfoVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.LayoutInfoVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.LayoutInfoVMBehavior.prototype */
      return {
        __name: "LayoutInfoVMBehavior",
        /** @type {classes.NodeBase} */
        _layoutInfoNode: null,
        /** @type {classes.NodeBase} */
        _containerNode: null,
        /**
         * @constructs {classes.LayoutInfoVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} layoutInfoAttributeNode
         * @param {classes.NodeBase=} containerNode
         */
        constructor: function(controller, layoutInfoAttributeNode, containerNode) {
          $super.constructor.call(this, controller);
          this._layoutInfoNode = layoutInfoAttributeNode;
          this._containerNode = containerNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.getLayoutInformation) {
            var info = widget.getLayoutInformation();
            var layoutEngine = widget.getLayoutEngine();
            if (layoutEngine && layoutEngine.setHint) {
              var widthHint = this._layoutInfoNode.attribute('width');
              var heightHint = this._layoutInfoNode.attribute('height');
              layoutEngine.setHint(widthHint, heightHint);
            }
            info.setSizePolicyMode(this._layoutInfoNode.attribute('sizePolicy'));

            info.setGridWidth(this._layoutInfoNode.attribute('gridWidth'));
            if (widget.setCols) {
              var rawWidth = this._layoutInfoNode.attribute('width');
              if (!this._layoutInfoNode.attribute('gridWidth') && cls.Size.isCols(rawWidth)) {
                widget.setCols(parseInt(rawWidth, 10));
              } else {
                widget.setCols(this._layoutInfoNode.attribute('gridWidth') || 1);
              }
            }
            info.setGridHeight(this._layoutInfoNode.attribute('gridHeight'));

            var position = {
              x: this._layoutInfoNode.attribute('posX') || 0,
              y: this._layoutInfoNode.attribute('posY') || 0
            };
            var anchor = this._controller.getNodeBindings().anchor;
            if (this._containerNode && (this._containerNode !== anchor)) {
              var index = anchor.getParentNode()._children.indexOf(anchor),
                columnCount = this._containerNode.attribute('columnCount') || 1,
                stepX = (this._containerNode.attribute('stepX') || 0),
                stepY = (this._containerNode.attribute('stepY') || 0);
              var shiftX = index % columnCount;
              var shiftY = Math.floor(index / columnCount);

              position.x += (shiftX * stepX); //TODO
              position.y += (shiftY * stepY);
            }

            info.setGridX(position.x);
            info.setGridY(position.y);
            var stretch = this._layoutInfoNode.attribute('stretch');
            if (stretch) {
              info.getStretched().setX(stretch === 'x' || stretch === 'both');
              info.getStretched().setY(stretch === 'y' || stretch === 'both');
            }
            var gridChildrenInParent = +(this._layoutInfoNode.attribute('gridChildrenInParent') || 0);
            if (widget.setGridChildrenInParent) {
              widget.setGridChildrenInParent(!!gridChildrenInParent);
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._layoutInfoNode,
            attribute: 'width'
          }, {
            node: this._layoutInfoNode,
            attribute: 'gridWidth'
          }, {
            node: this._layoutInfoNode,
            attribute: 'height'
          }, {
            node: this._layoutInfoNode,
            attribute: 'gridHeight'
          }, {
            node: this._layoutInfoNode,
            attribute: 'posX'
          }, {
            node: this._layoutInfoNode,
            attribute: 'posY'
          }, {
            node: this._layoutInfoNode,
            attribute: 'stretch'
          }, {
            node: this._layoutInfoNode,
            attribute: 'sizePolicy'
          }, {
            node: this._containerNode,
            attribute: 'gridChildrenInParent',
            optional: true
          }, {
            node: this._containerNode,
            attribute: 'stepX',
            optional: true
          }, {
            node: this._containerNode,
            attribute: 'stepY',
            optional: true
          }, {
            node: this._containerNode,
            attribute: 'columnCount',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._layoutInfoNode = null;
          this._containerNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
