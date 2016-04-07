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

modulum('ApplicationInformationWidget', ['WidgetBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationInformationWidget
     * @extends classes.WidgetBase
     */
    cls.ApplicationInformationWidget = context.oo.Class(cls.WidgetBase, function($super) {
      /** @lends classes.ApplicationInformationWidget.prototype */
      return {
        __name: "ApplicationInformationWidget",
        _currentUARElement: null,
        _initElement: function() {
          $super._initElement.call(this);
          this._currentUARElement = this._element.querySelector(".applicationUAR");
          this._currentUARElement.on('click.ApplicationInformationWidget', function() {
            $(this._currentUARElement).select();
          }.bind(this));
        },
        getCurrentUAR: function() {
          return this._currentUARElement.value;
        },
        setCurrentUAR: function(uar) {
          this._currentUARElement.value = uar;
        }
      };
    });
    cls.WidgetFactory.register('ApplicationInformation', cls.ApplicationInformationWidget);
  });
