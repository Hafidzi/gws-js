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

modulum('ScrollUIBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ScrollUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.ScrollUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.ScrollUIBehavior.prototype */
      return {
        __name: "ScrollUIBehavior",
        /** @type {classes.NodeBase} */
        _offsetNode: null,
        /** @type {classes.NodeBase} */
        _pageSizeNode: null,
        /** @type {classes.NodeBase} */
        _sizeNode: null,

        _scrollHandle: null,
        _mousewheelHandle: null,

        _lastRequestedOffset: null,
        _lastSentOffset: null,
        _throttleScroll: null,
        _throttleTimeout: 10,
        _eventScrollReady: false,
        _delta: 0,
        _mode: null,
        _eventMouseWheel: false,
        _eventScrollUI: false,

        _currentOffset: -1,

        /**
         * @constructs {classes.ScrollUIBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} pageSizeAttributeNode
         * @param {classes.NodeBase} offsetAttributeNode
         * @param {classes.NodeBase} sizeAttributeNode
         */
        constructor: function(controller, pageSizeAttributeNode, offsetAttributeNode, sizeAttributeNode) {
          $super.constructor.call(this, controller);
          this._pageSizeNode = pageSizeAttributeNode;
          this._offsetNode = offsetAttributeNode;
          this._sizeNode = sizeAttributeNode;
        },

        _attachWidget: function() {
          if (!!this._controller.getScrollableWidget) {
            var widget = this._controller.getScrollableWidget(),
              scrollWidget = widget && widget.getScrollWidget && widget.getScrollWidget();
            if (scrollWidget) {
              this._scrollHandle = scrollWidget.on(context.constants.widgetEvents.scroll, this._onScroll.bind(this, widget));

              // What to do in case of mouseWheel
              this._mousewheelHandle = scrollWidget.on(context.constants.widgetEvents.mousewheel, this._onMousewheel.bind(this,
                widget));
            }
          }
        },
        _onScroll: function(widget, e) {
          if (!widget.isEnabled() || this._eventScrollUI) {
            var event = e.data[0];
            this._eventScrollUI = false;
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
          } else {
            //throttle events...
            if (this._throttleScroll) {
              window.clearTimeout(this._throttleScroll);
            }

            //throttle events...
            this._throttleScroll = window.setTimeout(function() {
              if (this._eventScrollUI) {
                this._eventScrollUI = false;
                return;
              }
              this._eventScrollReady = true;
              //Calculate offset to scroll
              var scrollTop = e.data[0].target.scrollTop;
              var lineHeight = e.data[1];
              var requestedOffset = Math.round(scrollTop / lineHeight);
              if (this._lastRequestedOffset !== requestedOffset) {
                this._lastRequestedOffset = requestedOffset;
                this.requestOffset(requestedOffset);
              }
            }.bind(this), this._throttleTimeout);
          }
        },
        _onMousewheel: function(widget, e) {
          var event = e.data[0];

          if (!widget.isEnabled()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
          } else {
            this._eventMouseWheel = true;
            //throttle events...
            if (this._throttleScroll) {
              window.clearTimeout(this._throttleScroll);
            }
            this._delta += (event.deltaY / 16);

            this._throttleScroll = window.setTimeout(function() {
              var delta = this._delta;
              this._delta = 0;
              this._eventScrollUI = true;
              this._eventScrollReady = true;
              this._eventMouseWheel = false;
              this._doScroll(parseInt(delta));
            }.bind(this), this._throttleTimeout);
          }
        },
        _detachWidget: function() {
          if (this._scrollHandle) {
            this._scrollHandle();
            this._scrollHandle = null;
          }
          if (this._mousewheelHandle) {
            this._mousewheelHandle();
            this._mousewheelHandle = null;
          }
        },

        /**
         * Ask the VM for offset
         * @param offset to move to
         */
        requestOffset: function(offset) {
          var event, app = this._offsetNode.getApplication();
          if (typeof offset === "function") {
            event = new cls.VMConfigureEvent(this._offsetNode.getId(), {}, function() {
              this.attributes.offset = offset();
            });

            if (this._eventScrollReady) {
              //send it once
              if (this._lastSentOffset !== offset()) {
                app.event(event);
                this._lastSentOffset = offset();
              }
            }
          } else {
            if (this._currentOffset !== offset) {
              this._currentOffset = offset;
              event = new cls.VMConfigureEvent(this._offsetNode.getId(), {
                offset: offset
              });

              if (this._eventScrollReady) {
                //send it once
                if (this._lastSentOffset !== offset) {
                  app.event(event);
                  this._lastSentOffset = offset;
                }
              }
            }
          }
        },
        /**
         *
         */
        destroy: function() {
          this._offsetNode = null;
          this._sizeNode = null;
          this._pageSizeNode = null;
          $super.destroy.call(this);
        },

        /**
         * Calculate the offset to scroll in case of mousewheel
         * @param delta given by js event
         */
        _doScroll: function(delta) {
          if (delta) {
            this.requestOffset(this._getRequestedOffset.bind(this, delta));
          }
        },

        _getRequestedOffset: function(delta) {
          // Add delta to the current offset attribute
          var rawOffset = this._offsetNode.attribute("offset") + delta;
          // Calculate offset from attributes
          var calculatedOffset = this._sizeNode.attribute("size") - this._pageSizeNode.attribute("pageSize");
          return Math.max(0, Math.min(rawOffset, calculatedOffset));
        },
        /**
         * Refresh position of the scrollBar cursor
         * @private
         */
        _updateVerticalScroller: function() {
          var widget = this._controller.getScrollableWidget()._scrollWidget;
          if (widget) {
            widget.setOffset(this._offsetNode.attribute('offset'));
            widget.refresh();
          }

        }
      };
    });
  });
