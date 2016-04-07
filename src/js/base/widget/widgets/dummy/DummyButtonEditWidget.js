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

modulum('DummyButtonEditWidget', ['ButtonEditWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * ButtonEdit widget.
     * @class classes.DummyButtonEditWidget
     * @extends classes.ButtonEditWidget
     */
    cls.DummyButtonEditWidget = context.oo.Class(cls.ButtonEditWidget, function($super) {
      /** @lends classes.DummyButtonEditWidget.prototype */
      return {
        __name: "DummyButtonEditWidget",
        __templateName: "ButtonEditWidget",
        /**
         * @param {boolean} readonly true to set the edit part as read-only, false otherwise
         */
        setReadOnly: function(readonly) {

        },

        /**
         * @param {number} maxlength maximum number of characters allowed in the field
         */
        setMaxLength: function(maxlength) {

        },

        /**
         * @param {boolean} isPassword true if the widget should be in 'password' mode, false otherwise
         */
        setIsPassword: function(isPassword) {

        }
      };
    });
    cls.WidgetFactory.register('DummyButtonEdit', cls.DummyButtonEditWidget);
  });
