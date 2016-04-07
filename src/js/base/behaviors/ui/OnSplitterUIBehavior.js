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

modulum('OnSplitterUIBehavior', ['UIBehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.OnSplitterUIBehavior
     * @extends classes.UIBehaviorBase
     */
    cls.OnSplitterUIBehavior = context.oo.Class(cls.UIBehaviorBase, function($super) {
      /** @lends classes.OnSplitterUIBehavior.prototype */
      return {
        /** @type {string} */
        __name: "OnSplitterUIBehavior",

        /** @type {HandleRegistration} */
        _splitterHandle: null,

        _attachWidget: function() {
          this._splitterHandle = this._controller.getWidget().on(cls.BoxWidget.splitterEvent, this._onSplitter.bind(this));
        },

        _detachWidget: function() {
          if (this._splitterHandle) {
            this._splitterHandle();
            this._splitterHandle = null;
          }
        },
        _onSplitter: function() {
          this._controller.getAnchorNode().getApplication().layout.refresh();
        }
      };
    });
  });
