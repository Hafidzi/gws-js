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

modulum('ImageFontNode', ['NodeBase', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.ImageFontNode
     * @extends classes.NodeBase
     */
    cls.ImageFontNode = context.oo.Class(cls.NodeBase, function($super) {
      /** @lends classes.ImageFontNode.prototype */
      return {
        _ttfName: null,
        _stylesheetId: null,
        constructor: function(parent, tag, id, attributes, app) {
          $super.constructor.call(this, parent, tag, id, attributes, app);
          var ttfFile = this.attribute("href");
          this._ttfName = "image2font_" + this.attribute("name").replace(".ttf", "");
          this._stylesheetId = this._ttfName + this.getApplication().info().session + this.getApplication().applicationHash;
          var styleRules = {
            "@font-face": {
              "font-family": this._ttfName,
              "src": "url('" + ttfFile + "')"
            }
          };
          styler.appendStyleSheet(styleRules, this._stylesheetId, true);
        },
        destroy: function() {
          styler.removeStyleSheet(this._stylesheetId);
          $super.destroy.call(this);
        }
      };
    });
    cls.NodeFactory.register("ImageFont", cls.ImageFontNode);
  });
