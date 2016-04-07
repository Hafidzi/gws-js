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

modulum('LayoutEngineBase', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.LayoutEngineBase
     * @extends classes.EventListener
     */
    cls.LayoutEngineBase = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.LayoutEngineBase.prototype */
      return {
        __name: "LayoutEngineBase",
        /** @lends classes.LayoutEngineBase */
        $static: {
          LayoutAppliedEvent: 'LayoutApplied'
        },
        /**
         * @protected
         * @type {classes.WidgetBase}
         */
        _widget: null,
        /**
         * @protected
         */
        _styleRules: null,
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        constructor: function(widget) {
          $super.constructor.call(this);
          this._widget = widget;
          this._styleRules = {};
        },
        destroy: function() {
          this._widget = null;
          this._styleRules = null;
          $super.destroy.call(this);
        },
        /**
         * @protected
         * @param {classes.WidgetBase=} widget
         * @returns {classes.LayoutInformation}
         */
        _getLayoutInfo: function(widget) {
          var w = widget || this._widget;
          if (!w) {
            return null;
          }
          return w.getLayoutInformation();
        },

        /**
         *
         * @param {classes.WidgetBase} widget
         */
        registerChild: function(widget) {},
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        unregisterChild: function(widget) {},
        reset: Function.noop,
        /**
         * measure self widget
         */
        measure: Function.noop,
        /**
         * determine children stretchability
         * determine measured ('natural size') from children
         */
        ajust: Function.noop,
        /**
         * determine stretched allocated size for children
         */
        prepare: Function.noop,
        /**
         * apply final sizes
         */
        apply: Function.noop,
        /**
         * notify layout was applied
         */
        notify: function() {
          this.emit(cls.LayoutEngineBase.LayoutAppliedEvent);
        },
        onLayoutApplied: function(hook) {
          this.on(cls.LayoutEngineBase.LayoutAppliedEvent, hook);
        },
        canFollowChildren: function() {
          return true;
        },
        /**
         *
         * @param {boolean} visible
         */
        viewDebug: function(visible) {}
      };
    });
  });
