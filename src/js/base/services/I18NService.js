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

modulum('I18NService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.I18NService
     */
    context.I18NService = context.oo.Singleton( /** @lends gbc.I18NService */ {
      __name: "I18NService",
      _init: false,
      directTcp: null,
      activated: false,

      _eventListener: new cls.EventListener(), //used to listen when i18next is ready
      _i18nReady: "i18nReady",
      isReady: false,

      /**
       * init service method. should be called only once.
       */
      init: function() {
        // jshint ignore:start
        i18n.init({
          fallbackLng: 'en-US',
          resGetPath: (context.bootstrapInfo.gbcPath ? context.bootstrapInfo.gbcPath + "/" : "") +
            'locales/__lng__/__ns__.json',
          cookieName: 'lang',
          lngWhitelist: ['en-US', 'fr-FR', 'es-ES', 'de-DE', 'pt-PT']
        }, function() {
          // emit I18n ready
          this._eventListener.emit(this._i18nReady);
          this.isReady = true;
        }.bind(this));
        // jshint ignore:end
      },

      /**
       * Tranlate a widget with i18n data
       * @param element
       */
      translate: function(widget) {
        if (this.isReady) {
          widget.translate();
        } else {
          this._eventListener.on(this._i18nReady, function() {
            widget.translate();
          });
        }
      }

    });
    context.InitService.register(context.I18NService);
  });
