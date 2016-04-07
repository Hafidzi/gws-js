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

modulum('ApplicationHostAboutWidget', ['ModalWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostAboutWidget
     * @extends classes.ModalWidget
     */
    cls.ApplicationHostAboutWidget = context.oo.Class(cls.ModalWidget, function($super) {
      /** @lends classes.ApplicationHostAboutWidget.prototype */
      return {
        __name: "ApplicationHostAboutWidget",
        __templateName: "ModalWidget",
        _initContainerElement: function() {
          $super._initContainerElement.call(this);
          this._element.addClass("mt-dialog-about");
          var dialogContents = document.createElement("div");
          this.setClosable(false);
          this.setContent(dialogContents);
          var footer = document.createElement("div");
          footer.addClass("copyright");
          footer.innerHTML = "<small>Property of Four Js<sup>*</sup><br>" +
            "&#169; Copyright Four Js 2015. All Rights Reserved.<br>" +
            "* Trademark of Four Js Development Tools Europe Ltd in the United States and elsewhere</small>";
          this.setFooter(footer);
          var productInformation = cls.WidgetFactory.create("ProductInformation");
          productInformation.setVersion(context.version);
          productInformation.setBuild(context.build + (context.dirtyFlag || ""));
          productInformation.setTag(context.tag);
          productInformation.setLogo((context.bootstrapInfo.gbcPath ? context.bootstrapInfo.gbcPath + "/" : "") + "img/logo.png");
          productInformation.setLogoAlt("Genero Web Client");
          dialogContents.appendChild(productInformation.getElement());

          this.on(context.constants.widgetEvents.modalOut, function() {
            this.hide();
          }.bind(this));
        }
      };
    });
    cls.WidgetFactory.register('ApplicationHostAbout', cls.ApplicationHostAboutWidget);
  });
