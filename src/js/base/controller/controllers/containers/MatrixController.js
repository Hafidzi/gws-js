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

modulum('MatrixController', ['ControllerBase', 'ControllerFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.MatrixController
     * @extends classes.ControllerBase
     */
    cls.MatrixController = context.oo.Class(cls.ControllerBase, function($super) {
      /** @lends classes.MatrixController.prototype */
      return {
        __name: "MatrixController",
        _currentRow: 0,

        /**
         * @param {string} bufferedText text that has been buffered before the widget got the actual focus
         */

        setFocus: function(bufferedText) {
          var matrixNode = this.getAnchorNode();
          var valueNode = matrixNode.getCurrentChild();
          if (valueNode) {
            valueNode.getController().getWidget().setFocus();
          }
        }
      };
    });
    cls.ControllerFactory.register("Matrix", cls.MatrixController);

  });
