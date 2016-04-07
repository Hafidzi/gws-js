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

modulum('MyProgressBarWidget', ['ProgressBarWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Progressbar widget.
     * @class classes.MyProgressBarWidget
     * @extends classes.ProgressBarWidget
     */
    cls.MyProgressBarWidget = context.oo.Class(cls.ProgressBarWidget, function($super) {
      /** @lends classes.MyProgressBarWidget.prototype */
      return {
        __name: "MyProgressBarWidget",

        /** @type {classes.ModelHelper} */
        _model: null,
        /** @type {Function} */
        _unregistrer: null,

        constructor: function() {
          $super.constructor.call(this);
          this._model = new cls.ModelHelper(this);
          this._unregistrer = this._model.addAuiUpdateListener(this.onAuiUpdated.bind(this));
        },

        destroy: function() {
          $super.destroy.call(this);
          this._unregistrer();
        },

        onAuiUpdated: function() {
          var value = this._model.getAnchorNode().attribute('value');
          var elt = this.getElement().querySelector(".MyProgressBarWidget-value");
          elt.textContent = value + " %";
        }
      };
    });
    cls.WidgetFactory.register('ProgressBar', cls.MyProgressBarWidget);
  });
