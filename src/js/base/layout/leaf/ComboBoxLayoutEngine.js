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

modulum('ComboBoxLayoutEngine', ['LeafLayoutEngine'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ComboBoxLayoutEngine
     * @extends classes.LeafLayoutEngine
     */
    cls.ComboBoxLayoutEngine = context.oo.Class(cls.LeafLayoutEngine, function($super) {
      /** @lends classes.ComboBoxLayoutEngine.prototype */
      return {
        __name: "ComboBoxLayoutEngine",
        _setFixedMeasure: function() {
          var layoutInfo = this._widget.getLayoutInformation();
          layoutInfo.setMeasured(layoutInfo.getPreferred().getWidth(), this._widget.getElement().clientHeight);
        }
      };
    });
  });
