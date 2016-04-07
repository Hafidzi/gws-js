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

modulum('TableColumnNode', ['NodeBase', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableColumnNode
     * @extends classes.NodeBase
     */
    cls.TableColumnNode = context.oo.Class(cls.NodeBase, function() {
      /** @lends classes.TableColumnNode.prototype */
      return {
        /**
         *
         * @protected
         */
        _createChildrenControllers: function() {
          for (var i = 1; i < this._children.length; i++) {
            var child = this._children[i];
            if (child._tag === "ValueList") {
              for (var j = 0; j < child._children.length; j++) { // create value controller
                child._children[j].createController();
              }
            } else {
              child.createController();
            }
          }
        },
        /**
         *
         * @returns {classes.ControllerBase}
         * @protected
         */
        _createController: function() {
          var decoratorNode = this._children[0];

          return cls.ControllerFactory.create(this._tag, new cls.ControllerBindings(this, {
            decorator: decoratorNode
          }));
        }
      };
    });
    cls.NodeFactory.register("TableColumn", cls.TableColumnNode);
  });
