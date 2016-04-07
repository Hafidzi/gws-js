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

modulum('VBoxWidget', ['BoxWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.VBoxWidget
     * @extends classes.BoxWidget
     */
    cls.VBoxWidget = context.oo.Class(cls.BoxWidget, function($super) {
      /** @lends classes.VBoxWidget.prototype */
      return {
        __name: "VBoxWidget",
        constructor: function() {
          $super.constructor.call(this);
          this._element.addClass("g_VBoxLayoutEngine");
        },
        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.VBoxLayoutEngine(this);
        },
        getSplitInfo: function(splitter) {
          var result = [];
          result.splitIndex = (this._children.indexOf(splitter) - 1) / 2;
          for (var i = 0; i < this._children.length; i += 2) {

            result.push({
              id: this._children[i].getUniqueIdentifier(),
              size: this._children[i].getLayoutInformation().getAllocated().getHeight(),
              stretch: this._children[i].getLayoutInformation().isYStretched()
            });
          }
          return result;
        },
        updateSplitInfo: function(splitInfo) {
          var s = splitInfo.splitIndex;
          var newSize1 = splitInfo[s].size + splitInfo[s].deltaY;
          var newSize2 = splitInfo[s + 1].size - splitInfo[s + 1].deltaY;
          if (newSize1 < 0) {
            newSize1 = 1;
            newSize2 = splitInfo[s].size + splitInfo[s + 1].size - 1;
          }
          if (newSize2 < 0) {
            newSize2 = 1;
            newSize1 = splitInfo[s].size + splitInfo[s + 1].size - 1;
          }
          this._layoutEngine._forcedHint[splitInfo[s].id] = newSize1;
          this._layoutEngine._forcedHint[splitInfo[s + 1].id] = newSize2;
          $super.updateSplitInfo.call(this, splitInfo);
        }

      };
    });
    cls.WidgetFactory.register('VBox', cls.VBoxWidget);
  });
