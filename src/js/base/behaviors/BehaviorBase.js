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
/**
 * @typedef {Object} watchedAttribute
 * @property {classes.NodeBase=} node
 * @property {string} attribute
 * @property {boolean=} optional
 * @property {function=} onChange
 */

modulum('BehaviorBase', ['EventListener'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Base class for all behaviors
     * @class classes.BehaviorBase
     * @extends classes.EventListener
     */
    cls.BehaviorBase = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.BehaviorBase.prototype */
      return {
        __name: "BehaviorBase",
        /**
         * @type {classes.ControllerBase}
         * @protected
         */
        _controller: null,
        /** @type {boolean} */
        _attached: false,
        /** @type {boolean} */
        _attachedWidget: false,
        /**
         * @protected
         * @type {HandleRegistration[]}
         */
        _handles: null,
        /** {boolean} true if this behavior should be re-applied, false otherwise */
        _dirty: false,
        /** {boolean} true if this behavior uses 4ST styles, false otherwise */
        styleBased: false,
        /**
         * @constructs {classes.BehaviorBase}
         * @param {classes.ControllerBase} controller
         */
        constructor: function(controller) {
          $super.constructor.call(this);
          this._handles = [];
          this._controller = controller;
        },
        /**
         * Applies the behavior on the widget
         */
        apply: function() {
          this._dirty = false;
          this._apply();
        },
        /**
         * @protected
         */
        _apply: function() {
          context.LogService.error("Behavior " + this.__name + " must override apply()");
        },
        /**
         * Attaches the needed observers to the AUI tree.
         * This is the top level implementation. Checks that the behavior isn't already attached
         */
        attach: function() {
          if (this._attached) {
            this.detach();
          }
          var watches = this._getWatchedAttributes();
          for (var i = 0; i < watches.length; i++) {
            this._handles.push(this._bindAttribute(watches[i].node, watches[i].attribute, watches[i].optional, watches[i].onChange));
          }
          this._attach();
          this._attached = true;
        },
        /**
         * get a list of pair node/attribute names
         * @protected
         * @abstract
         * @returns {watchedAttribute[]}
         */
        _getWatchedAttributes: function() {
          return [];
        },

        /**
         * Attaches the needed observers to the AUI tree
         * @protected
         * @abstract
         */
        _attach: function() {

        },
        /**
         * Detached all AUI tree observers*
         * This is the top level implementation. Checks that the behavior is attached
         */
        detach: function() {
          if (this._attached) {
            for (var i = 0; i < this._handles.length; i++) {
              this._handles[i]();
            }
            this._handles.length = 0;
            this._detach();
            this._attached = false;
          }
        },
        /**
         * Detached all AUI tree observers
         * @protected
         * @abstract
         */
        _detach: function() {

        },
        /**
         * Attaches the needed observers Widget.
         * This is the top level implementation. Checks that the behavior isn't already attached
         */
        attachWidget: function() {
          if (this._attachedWidget) {
            this.detachWidget();
          }
          this._attachWidget();
          this._attachedWidget = true;
        },
        /**
         * Attaches the needed observers to Widget
         * @protected
         * @abstract
         */
        _attachWidget: function() {

        },
        /**
         * Detached all Widget observers*
         * This is the top level implementation. Checks that the behavior is attached
         */
        detachWidget: function() {
          if (this._attachedWidget) {
            this._detachWidget();
            this._attachedWidget = false;
          }
        },
        /**
         * Detached all Widget observers
         * @protected
         * @abstract
         */
        _detachWidget: function() {

        },
        /**
         * Binds the given callback to node attribute updates.
         * The given callback will be invoked for each attribute update
         * @param {classes.NodeBase} node node instance holding the attribute
         * @param {string} attributeName attribute to observe
         * @param {boolean=} optional don't info missing node
         * @param {function=} onChange execute directy when attribute changes
         * @returns {HandleRegistration} a registration handle. Simply call it to unregister the observer
         * @protected
         */
        _bindAttribute: function(node, attributeName, optional, onChange) {
          if (!!node) {
            return node.onAttributeChanged(attributeName, this._onAttributeChanged.bind(this, node, onChange));
          } else {
            if (!optional) {
              context.LogService.info('Missing node while trying to attach behavior : ' + JSON.stringify({
                behavior: this.__name,
                attribute: attributeName,
                controller: this._controller.__name,
                _widget: this._controller.getWidget() && this._controller.getWidget().__name
              }));
            }
            return $.noop;
          }
        },
        _onAttributeChanged: function(node, onChange, event, src, data) {
          if (!!onChange) {
            onChange(node, data);
          }
          this._setDirty();
        },
        /**
         *
         * @protected
         */
        _setDirty: function() {
          this._dirty = true;
        },
        isDirty: function() {
          return this._dirty;
        },
        /**
         * Displays an error message in the console with context information
         * @protected
         */
        _failed: function(message) {
          context.LogService.warn(message + ' : ' + JSON.stringify({
            behavior: this.__name,
            controller: this._controller.__name,
            _widget: this._controller.getWidget() && this._controller.getWidget().__name
          }));
        },
        /**
         * Cleans up the behavior
         */
        destroy: function() {
          this.detachWidget();
          this.detach();
          this._controller = null;
          $super.destroy.call(this);
        }
      };
    });
  });
