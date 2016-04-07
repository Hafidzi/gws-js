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

modulum('FontFamilyVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FontFamilyVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.FontFamilyVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.FontFamilyVMBehavior.prototype */
      return {
        __name: "FontFamilyVMBehavior",
        /** @type {classes.NodeBase} */
        _fontPitchNode: null,
        /** @type {boolean} */
        styleBased: true,
        /**
         * @constructs {classes.FontFamilyVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} fontPitchAttributeNode
         */
        constructor: function(controller, fontPitchAttributeNode) {
          $super.constructor.call(this, controller);
          this._fontPitchNode = fontPitchAttributeNode;
        },
        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.setFontFamily) {
            if (this._fontPitchNode && this._fontPitchNode.isAttributesSetByVM('fontPitch')) {
              var pitched = this._fontPitchNode.attribute('fontPitch');
              widget.setFontFamily(pitched === "fixed" ? 'Droid Sans Mono, monospace' : null);
            } else {
              var font = this._controller.getAnchorNode().getStyleAttribute('fontFamily');
              if (font) {
                widget.setFontFamily(font);
              }
            }
          } else {
            this._failed("Could not apply behavior");
          }
        },
        _getWatchedAttributes: function() {
          return [{
            node: this._fontPitchNode,
            attribute: 'fontPitch'
          }];
        },
        /**
         *
         */
        destroy: function() {
          this._fontPitchNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
