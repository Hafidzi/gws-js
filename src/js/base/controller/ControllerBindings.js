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

modulum('ControllerBindings', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ControllerBindings
     */
    cls.ControllerBindings = context.oo.Class(function() {
      /** @lends classes.ControllerBindings.prototype */
      return {
        __name: "ControllerBindings",
        /**
         * @type {Object.<string, classes.NodeBase>}
         */
        _bindings: null,
        /**
         * @type {classes.NodeBase}
         */
        anchor: null,
        /**
         * @constructs {classes.ControllerBindings}
         * @param {classes.NodeBase} anchorNode
         * @param {Object.<string, classes.NodeBase>=} bindings
         */
        constructor: function(anchorNode, bindings) {
          this.anchor = anchorNode;
          this._bindings = bindings || {};
          var bindingNames = Object.keys(this._bindings);
          for (var i = 0; i < bindingNames.length; i++) {
            this[bindingNames[i]] = this._bindings[bindingNames[i]];
          }
        },
        /**
         *
         */
        destroy: function() {
          var bindingNames = Object.keys(this._bindings);
          for (var i = 0; i < bindingNames.length; i++) {
            this[bindingNames[i]] = null;
          }
          this.anchor = null;
          this._bindings = null;
        },
        getRawBindings: function() {
          var result = {
            anchor: this.anchor._id
          };
          var bindingNames = Object.keys(this._bindings);
          for (var i = 0; i < bindingNames.length; i++) {
            result[bindingNames[i]] = this._bindings[bindingNames[i]]._id;
          }
          return result;
        }
      };
    });
  });
