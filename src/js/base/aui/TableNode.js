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

modulum('TableNode', ['StandardNode', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableNode
     * @extends classes.NodeBase
     */
    cls.TableNode = context.oo.Class(cls.StandardNode, function($super) {
      /** @lends classes.TableNode.prototype */
      return {
        updateAttributes: function(attributes) {
          $super.updateAttributes.call(this, attributes);
          if (attributes.bufferSize !== undefined) {
            var treeInfo = this.getFirstChild('TreeInfo');
            if (treeInfo) {
              treeInfo.applyBehaviors(true);
            }
          }
        },

        getCurrentRowValueIndex: function() {
          return this.attribute('currentRow') - this.attribute('offset');
        },

        getCurrentValueNode: function() {
          var dialogType = this.attribute('dialogType');
          if (dialogType.startsWith("Input") || dialogType === "Construct") {
            var valueIndex = this.getCurrentRowValueIndex();
            var columnNodes = this.getChildren('TableColumn');
            var currentColumn = this.attribute('currentColumn');
            if (currentColumn < columnNodes.length) {
              var columnNode = columnNodes[currentColumn];
              var valueListNode = columnNode.getFirstChild('ValueList');
              if (valueListNode) {
                var valueNodes = valueListNode.getChildren();
                if (valueIndex >= 0 && valueIndex < valueNodes.length) {
                  return valueNodes[valueIndex];
                }
              }
            }
          }
          return null;
        }
      };
    });
    cls.NodeFactory.register("Table", cls.TableNode);
  });
