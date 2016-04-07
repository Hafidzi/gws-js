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

modulum('MaxLengthVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MaxLengthVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.MaxLengthVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.MaxLengthVMBehavior.prototype */
      return {
        __name: "MaxLengthVMBehavior",
        /** @type {classes.NodeBase} */
        _maxLengthNode: null,
        /**
         * @constructs {classes.MaxLengthVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} maxLengthAttributeNode
         */
        constructor: function(controller, maxLengthAttributeNode) {
          $super.constructor.call(this, controller);
          this._maxLengthNode = maxLengthAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setMaxLength) {
            var maxLength = null;
            var autonext = null;
            if (this._maxLengthNode.isAttributesSetByVM('maxLength')) {
              maxLength = this._maxLengthNode.attribute('maxLength');
              if (maxLength === 0) {
                // 0 means 'disable maxLength'
                maxLength = null;
              }
            }

            if (this._maxLengthNode.isAttributesSetByVM('autoNext') && this._maxLengthNode.attribute('autoNext') === 1) {
              if (maxLength) {
                var controller = this._controller;
                widget.on(context.constants.widgetEvents.change, function(e) {
                  if (e.data[0].target.value.length >= maxLength) {
                    // trig nextField action
                    var app = controller.getAnchorNode().getApplication();
                    context.FocusService.focusChange(this._executeNextField.bind(this));

                    return false;
                  }
                }.bind(this));
              }
            }

            widget.setMaxLength(maxLength, autonext);
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _executeNextField: function() {
          this._controller.getAnchorNode().getApplication().action.executeActionDefaultByName("nextfield");
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._maxLengthNode,
            attribute: 'maxLength'
          }, {
            node: this._maxLengthNode,
            attribute: 'autonext'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._maxLengthNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
