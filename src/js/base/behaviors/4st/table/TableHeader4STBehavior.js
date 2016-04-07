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

modulum('TableHeader4STBehavior', ['StyleBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.TableType4STBehavior
     * @extends classes.BehaviorBase
     */
    cls.TableHeader4STBehavior = context.oo.Class(cls.StyleBehaviorBase, function($super) {
      /** @lends classes.TableHeader4STBehavior.prototype */
      return {
        __name: "TableHeader4STBehavior",
        /** @type {classes.NodeBase} */
        _tableNode: null,

        /**
         * @constructs {classes.TableHeader4STBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} tableNode
         */
        constructor: function(controller, tableNode) {
          $super.constructor.call(this, controller);
          this._tableNode = tableNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget) {
            var headerHidden = this._tableNode.getStyleAttribute("headerHidden");
            var headerAlignment = this._tableNode.getStyleAttribute("headerAlignment");
            if (widget.setHeaderHidden && widget.setHeaderAlignment) {
              if (headerHidden) {
                widget.setHeaderHidden(this.isSAYesLike(headerHidden));
              }
              if (headerAlignment) {
                if (headerAlignment === "default") {
                  headerAlignment = "left"; // default is left
                }
                widget.setHeaderAlignment(headerAlignment);
              }
            } else {
              this._failed("Could not apply behavior");
            }
          }
        },

        /**
         *
         */
        destroy: function() {
          this._tableNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
