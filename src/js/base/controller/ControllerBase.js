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

modulum('ControllerBase', ['EventListener'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Base controller for an AUI node.
     * Manages client side life cycle representation of the node.
     * @class classes.ControllerBase
     * @extends classes.EventListener
     */
    cls.ControllerBase = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.ControllerBase.prototype */
      return {
        __name: "ControllerBase",
        /**
         * @type {classes.ControllerBindings}
         */
        _nodeBindings: null,
        /**
         * @type {classes.BehaviorBase[]}
         */
        _behaviors: null,
        /**
         *
         * @type classes.Application
         */
        _application: null,
        /**
         * @type classes.WidgetBase
         */
        _widget: null,
        /**
         * @type string
         */
        _widgetKind: null,

        /**
         * @constructs {classes.ControllerBase}
         * @param {classes.ControllerBindings} bindings
         */
        constructor: function(bindings) {
          $super.constructor.call(this);
          this._nodeBindings = bindings;
          this._application = bindings.anchor.getApplication();
          this._behaviors = [];
          this.createWidget();
          this._initBehaviors();
          this._initWidgetKind();
          var offsetBinding = null;
          if (bindings.container && bindings.container.getTag() === 'TableColumn') {
            offsetBinding = bindings.container.getParentNode();
          }

          this._addBehavior(new cls.QAInfoVMBehavior(this, bindings.container || bindings.anchor, null, offsetBinding));
        },

        _initWidgetKind: function() {
          if (this._nodeBindings.container) {
            this._widgetKind = this._nodeBindings.container.attribute("dialogType");
          }
        },

        /**
         *
         * @protected
         * @abstract
         */
        _initBehaviors: Function.noop,
        /**
         *
         * @param {classes.BehaviorBase} behavior
         * @protected
         */
        _addBehavior: function(behavior) {
          this._behaviors.push(behavior);
          behavior._setDirty();
          behavior.attach();
          behavior.attachWidget();
        },
        /**
         * Applies all behaviors attached to this controller
         */
        applyBehaviors: function(force) {
          for (var i = 0; i < this._behaviors.length; i++) {
            var behavior = this._behaviors[i];
            if (force || behavior.isDirty()) {
              behavior.apply();
            }
          }
        },
        /**
         *
         * @protected
         */
        _attachWidget: function() {
          for (var i = 0; i < this._behaviors.length; i++) {
            this._behaviors[i].attachWidget();
          }
        },
        /**
         *
         * @protected
         */
        _detachWidget: function() {
          for (var i = 0; i < this._behaviors.length; i++) {
            this._behaviors[i].detachWidget();
          }
        },
        /**
         *
         * @protected
         */
        _destroyBehaviors: function() {
          for (var i = 0; i < this._behaviors.length; i++) {
            this._behaviors[i].destroy();
          }
          this._behaviors.length = 0;
        },
        /**
         *
         */
        destroy: function() {
          this._destroyBehaviors();
          this.detachUI();
          this._application = null;
          this._nodeBindings.destroy();
          this._nodeBindings = null;
          $super.destroy.call(this);
        },
        /**
         * Get the anchor node
         * @returns {classes.NodeBase}
         */
        getAnchorNode: function() {
          return this._nodeBindings.anchor;
        },
        /**
         *
         * @returns {classes.ControllerBindings}
         */
        getNodeBindings: function() {
          return this._nodeBindings;
        },
        /**
         *
         * @returns {classes.WidgetBase}
         */
        createWidget: function() {
          if (!this._widget) {
            this._widget = this._createWidget();
            if (this._widget) {
              this._widget._setAuiTag(this.getAnchorNode()._id);
            }
          }
          return this._widget;
        },

        /**
         *
         * @param {string=} kind
         * @returns {classes.WidgetBase}
         * @protected
         * @virtual
         */
        _createWidget: function(kind) {
          return null;
        },

        changeWidgetKind: function(kind) {
          if (kind !== this._widgetKind) {
            this._widgetKind = kind;
            //var layoutInfo = this._widget._layout
            var oldWidget = this._widget;
            this._detachWidget();
            this._widget = this._createWidget(kind);
            if (this._widget) {
              this._widget._setAuiTag(this.getAnchorNode()._id);
              if (oldWidget) {
                oldWidget.replaceWith(this._widget);
              } else {
                // No older widget to replace, attach new one
                this.attachUI();
              }
            }

            if (oldWidget) {
              oldWidget.destroy();
            }
            this._attachWidget();
            for (var i = 0; i < this._behaviors.length; i++) {
              this._behaviors[i]._setDirty();
            }
          }
        },

        attachUI: function() {
          cls.NodeHelper.addToParentWidget(this.getAnchorNode());
        },

        detachUI: function() {
          if (this._widget) {
            this._widget.destroy();
            this._widget = null;
          }
        },

        /**
         *
         * @returns {classes.WidgetBase}
         */
        getWidget: function() {
          return this._widget;
        },

        /**
         * Ensures the widget corresponding to this controller is visible to the user
         */
        ensureVisible: function() {
          var p = this.getAnchorNode().getParentNode();
          while (p !== null) {
            var controller = p.getController();
            if (controller !== null) {
              controller.ensureVisible();
              break;
            }
            p = p.getParentNode();
          }
        },

        /**
         * @param {string} bufferedText text that has been buffered before the widget got the actual focus
         */
        setFocus: function(bufferedText) {
          if (this._widget && this._widget.setFocus) {
            this._widget.setFocus(bufferedText);
          }
        },

        setStyleBasedBehaviorsDirty: function() {
          for (var i = 0; i < this._behaviors.length; i++) {
            var behavior = this._behaviors[i];
            if (behavior.styleBased) {
              behavior._setDirty();
            }
          }
        }
      };
    });
  });
