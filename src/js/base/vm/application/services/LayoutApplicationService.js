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

modulum('LayoutApplicationService', ['ApplicationServiceBase', 'ApplicationServiceFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.LayoutApplicationService
     * @extends classes.ApplicationServiceBase
     */
    cls.LayoutApplicationService = context.oo.Class(cls.ApplicationServiceBase, function($super) {
      /** @lends classes.LayoutApplicationService.prototype */
      return {
        __name: "LayoutApplicationService",
        /**
         * @type {number}
         */
        _throttle: null,
        /**
         * @type {number}
         */
        _throttleTimeout: 15,
        _resizing: false,
        /**
         *
         * @param {classes.VMApplication} app owner
         */
        constructor: function(app) {
          $super.constructor.call(this, app);
          window.addEventListener("resize", this._requestLayout.debounce().bind(this, true));
        },
        refresh: function() {
          this._requestLayout();
        },
        /**
         * request a layout refresh
         * @param {boolean} invoked by window resize
         * @private
         */
        _requestLayout: function(resize) {
          if (this._throttle) {
            window.clearTimeout(this._throttle);
          }
          this._resizing = !!resize;
          this._throttle = window.setTimeout(function() {
            this._throttle = null;
            if (this._application) {
              this._refresh();
            }
          }.bind(this), this._throttleTimeout);
        },
        _refresh: function() {
          if (this._application.getUI().getWidget().getLayoutInformation().needLayout) {
            var node = this._application.model.getNode(0);
            if (node) {
              styler.bufferize();
              var traversal = new window.Throu(node.getController().getWidget());
              traversal.setChildrenSelector( /**@param {classes.WidgetGroupBase|classes.WidgetBase}item */ function(item) {
                var result = [];
                if (item && !item.isHidden()) {
                  if (!item.getLayoutEngine()) {
                    if (item.getChildren) {
                      result = item.getChildren();
                    }
                  } else {
                    var canFollowChildren = item.getLayoutEngine().canFollowChildren();
                    switch (canFollowChildren) {
                      case true:
                        if (item.getChildren) {
                          result = item.getChildren();
                        }
                        break;
                      case "filter":
                        result = item.getLayoutEngine().getChildren();
                        break;
                      default:
                        result = [];
                    }
                  }
                }
                return result;
              });
              traversal.pass(this._refreshLayoutPassHidden.bind(this), false, function(item) {
                return !!item.getChildren && item.getChildren();
              });
              traversal.pass(this.preMeasure.bind(this), true);
              traversal.pass(this.tryMeasure.bind(this), true);
              traversal.pass(this.postMeasure.bind(this), true);
              traversal.pass(this.ajustLayout.bind(this), true);
              traversal.pass(this.prepareLayout.bind(this));
              traversal.pass(this.applyLayout.bind(this));
              traversal.pass(this.notifyLayout.bind(this));
              traversal.run();
              styler.flush();
              this.emit(context.constants.widgetEvents.layout, this._resizing);
              this._resizing = false;
            }
          }
        },
        _refreshLayoutPassHidden: function(item, parent) {
          if (item && item.getLayoutInformation()) {
            item.getLayoutInformation().__layoutPassHidden =
              (!!parent && parent.getLayoutInformation().__layoutPassHidden) || !item.isVisible();
          }
        },
        afterLayout: function(hook) {
          return this.on(context.constants.widgetEvents.layout, hook);
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        tryMeasure: function(widget) {
          if (widget.getLayoutEngine()) {
            widget.getLayoutEngine().measure();
          }
        },
        preMeasure: function(widget) {
          if (widget.getElement()) {
            widget.getElement().addClass("g_measuring").removeClass("g_measured");
          }
        },
        postMeasure: function(widget) {
          if (widget.getElement()) {
            widget.getElement().addClass("g_measured").removeClass("g_measuring");
          }
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        ajustLayout: function(widget) {
          if (widget.getLayoutEngine()) {
            widget.getLayoutEngine().ajust();
          }
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        prepareLayout: function(widget) {
          if (widget.getLayoutEngine()) {
            widget.getLayoutEngine().prepare();
          }
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        applyLayout: function(widget) {
          if (widget.getLayoutEngine()) {
            widget.getLayoutEngine().apply();
          }
        },
        /**
         *
         * @param {classes.WidgetBase} widget
         */
        notifyLayout: function(widget) {
          if (widget.getLayoutEngine()) {
            widget.getLayoutEngine().notify();
          }
        }
      };
    });
    cls.ApplicationServiceFactory.register("Layout", cls.LayoutApplicationService);
  });
