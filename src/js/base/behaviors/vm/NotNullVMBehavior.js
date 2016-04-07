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

modulum('NotNullVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.NotNullVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.NotNullVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.NotNullVMBehavior.prototype */
      return {
        __name: "NotNullVMBehavior",
        /** @type {classes.NodeBase} */
        _notNullNode: null,
        /**
         * @constructs {classes.NotNullVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} notNullAttributeNode
         */
        constructor: function(controller, notNullAttributeNode) {
          $super.constructor.call(this, controller);
          this._notNullNode = notNullAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setNotNull) {
            var notNull = this._notNullNode.attribute('notNull');

            if (notNull && this._notNullNode.attribute('dialogType') === "Construct") {
              notNull = false;
            }

            widget.setNotNull(notNull);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._notNullNode,
            attribute: 'notNull'
          }, {
            node: this._notNullNode,
            attribute: 'dialogType',
            optional: true
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._notNullNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
