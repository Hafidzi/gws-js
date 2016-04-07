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

modulum('TemplateService', ['InitService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class gbc.TemplateService
     */
    context.TemplateService = context.oo.Singleton( /** @lends gbc.TemplateService */ {
      __name: "TemplateService",
      _compiled: {},
      _rendered: {},
      init: function() {
        var templateKeys = Object.keys(window.gbcTemplates);
        for (var i = 0; i < templateKeys.length; i++) {
          var templateId = templateKeys[i];
          if (window.gbcTemplates.hasOwnProperty(templateId)) {
            this.registerRawTemplate(templateId, window.gbcTemplates[templateId]);
          }
        }
      },
      /**
       * Registers a new template (string) with the given id.
       * @param id the template id
       * @param template the template text
       */
      registerRawTemplate: function(id, template) {
        if (this._compiled[id]) {
          context.LogService.error("templateService.registerRawTemplate: template id already exists : " + id);
          return;
        }
        if (Object.isString(template)) {
          this._compiled[id] = Handlebars.compile(template);
        } else {
          this._compiled[id] = template;
        }
      },
      /**
       * Renders a node depending on the given template id.
       * @param templateId the template id to use for rendering
       * @param {object=} params the node to render
       * @returns string a string of the compiled template given the node and the template id
       */
      renderAs: function(templateId, params) {
        if (this._compiled.hasOwnProperty(templateId)) {
          return this._compiled[templateId](params || {});
        } else {
          return "";
        }
      },
      /**
       * Renders a node depending on the given template id.
       * @param templateId the template id to use for rendering
       * @param {object=} params the node to render
       * @returns Element the compiled template given the node and the template id
       */
      renderDOM: function(templateId, params) {
        if (!params && !!this._rendered[templateId]) {
          return this._rendered[templateId].cloneNode(true);
        }
        var builder = document.createDocumentFragment();
        builder.appendChild(document.createElement('div'));
        builder.firstChild.innerHTML = this.renderAs(templateId, params);
        var result = builder.firstChild.firstChild;
        if (!params) {
          this._rendered[templateId] = result;
          return result.cloneNode(true);
        }
        return result;
      }

    });
    context.InitService.register(context.TemplateService);
  });
