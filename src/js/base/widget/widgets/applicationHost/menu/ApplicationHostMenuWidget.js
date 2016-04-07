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

modulum('ApplicationHostMenuWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.ApplicationHostMenuWidget
     * @extends classes.WidgetGroupBase
     */
    cls.ApplicationHostMenuWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.ApplicationHostMenuWidget.prototype */
      return {
        __name: "ApplicationHostMenuWidget",
        _windowIconImage: null,
        _titleElement: null,
        _defaultTitle: "Genero Web Client",

        /** @lends classes.ApplicationHostMenuWidget */
        $static: {
          toggleClickEvent: "g_toggleClick"
        },
        _aboutMenu: null,
        _debugMenu: null,
        _runtimeStatus: null,

        constructor: function() {
          this._runtimeStatus = cls.WidgetFactory.create('ApplicationHostMenuRuntime');
          this._aboutMenu = cls.WidgetFactory.create('ApplicationHostAboutMenu');
          this._debugMenu = cls.WidgetFactory.create('ApplicationHostDebugMenu');
          $super.constructor.call(this);
          this.addChildWidget(this._runtimeStatus);
          this.addChildWidget(this._aboutMenu);
          this.addChildWidget(this._debugMenu);
        },
        destroy: function() {
          this.removeChildWidget(this._aboutMenu);
          this.removeChildWidget(this._debugMenu);
          this._aboutMenu.destroy();
          this._aboutMenu = null;
          this._debugMenu.destroy();
          this._debugMenu = null;
          $super.destroy();
        },
        _initElement: function() {
          $super._initElement.call(this);
          this._element.querySelector(".mt-menutoggle").on("click.ApplicationHostMenuWidget", function() {
            this.emit(cls.ApplicationHostMenuWidget.toggleClickEvent);
          }.bind(this));
          if (!this._titleElement) {
            this._titleElement = this._element.querySelector(".currentDisplayedWindow");
            this.setText();
          }
        },
        setText: function(title) {
          if (title) {
            this._titleElement.textContent = title;
          } else {
            this._titleElement.textContent = this._defaultTitle;
          }
        },
        setIcon: function(image) {
          if (image && image !== "") {
            this._element.querySelector('.zmdi').addClass('hidden');
            if (!this._windowIconImage) {
              this._windowIconImage = cls.WidgetFactory.create("Image");
              this._element.querySelector(".mt-menutoggle").appendChild(this._windowIconImage.getElement());
            }
            this._windowIconImage.setSrc(image);
            this._windowIconImage.setHidden(false);
          } else {
            this._element.querySelector('.zmdi').removeClass('hidden');
            if (this._windowIconImage) {
              this._windowIconImage.setHidden(true);
            }
          }
        },
      };
    });
    cls.WidgetFactory.register('ApplicationHostMenu', cls.ApplicationHostMenuWidget);
  });
