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

modulum('FocusTracker', ['EventListener'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Base class for all widgets handling text attributes
     * @class classes.FocusTracker
     * @extends classes.EventListener
     */
    cls.FocusTracker = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.FocusTracker.prototype */
      return {

        /**
         * container element
         * @type {Element}
         */
        _container: null,

        /** @type {boolean} */
        _hasFocus: false,

        /** @type {Function} */
        _itemGotFocusBound: null,

        /** @type {Function} */
        _itemLostFocusBound: null,

        constructor: function(container) {
          $super.constructor.call(this);
          this._container = container;
          this._itemGotFocusBound = this._itemGotFocus.bind(this);
          this._itemLostFocusBound = this._itemLostFocus.bind(this);
        },

        /**
         * Adds an item whose focus changes should be tracked
         * @param {Element} element
         */
        addItem: function(element) {
          var events = this._getEvents();
          element.addEventListener(events.gotFocus, this._itemGotFocusBound);
          element.addEventListener(events.lostFocus, this._itemLostFocusBound);
        },

        /**
         * @param {Element} element
         */
        removeItem: function(element) {
          var events = this._getEvents();
          element.removeEventListener(events.gotFocus, this._itemGotFocusBound);
          element.removeEventListener(events.lostFocus, this._itemLostFocusBound);
        },

        _getEvents: function() {
          var events = {};
          if (window.browserInfo.isIE) {
            // IE only sets Event.relatedTarget with 'focusin'/'focusout' events
            // see https://bugzilla.mozilla.org/show_bug.cgi?id=962251
            events.gotFocus = 'focusin';
            events.lostFocus = 'focusout';
          } else {
            events.gotFocus = 'focus';
            events.lostFocus = 'blur';
          }
          return events;
        },

        _itemGotFocus: function(event) {
          event.preventDefault();
          if (!this._hasFocus) {
            this._hasFocus = true;
            this.emit(context.constants.widgetEvents.focus, event);
          }
        },

        _itemLostFocus: function(event) {
          event.preventDefault();
          var relatedTarget = event.relatedTarget;
          if (window.browserInfo.isFirefox) {
            // Firefox doesn't support relatedTarget for now.
            // workaround using event.explicitOriginalTarget
            // https://bugzilla.mozilla.org/show_bug.cgi?id=962251
            relatedTarget = event.explicitOriginalTarget;
          }
          var lostFocus = relatedTarget !== this._container && !this._container.contains(relatedTarget);
          if (lostFocus) {
            this._hasFocus = false;
            this.emit(context.constants.widgetEvents.blur, event);
          }
        }
      };
    });
  });
