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
modulum('UIApplicationService', ['ApplicationServiceBase', 'ApplicationServiceFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.UIApplicationService
     * @extends classes.ApplicationServiceBase
     */
    cls.UIApplicationService = context.oo.Class(cls.ApplicationServiceBase, function($super) {
      /** @lends classes.UIApplicationService.prototype */
      return {
        /** @lends classes.UIApplicationService */
        $static: {
          status: {
            running: "running"
          }
        },
        __name: "UIApplicationService",
        /**
         * @type {classes.ApplicationWidget}
         */
        _applicationWidget: null,
        constructor: function(app) {
          $super.constructor.call(this, app);
          this._applicationWidget = cls.WidgetFactory.create("Application");
          this._applicationWidget.setApplicationHash(app.applicationHash);
          this._applicationWidget.onActivate(this._onActivate.bind(this));
          this._application.getSession().getWidget().addChildWidget(this._applicationWidget);
          this._applicationWidget.onLayoutRequest(this._onLayoutRequest.bind(this));
        },
        _onActivate: function() {
          this._application.getSession().setCurrentApplication(this._application);
        },
        _onLayoutRequest: function() {
          this._application.layout.refresh();
        },
        destroy: function() {
          this._applicationWidget.destroy();
          $super.destroy.call(this);
        },
        /**
         *
         * @returns {classes.ApplicationWidget}
         */
        getWidget: function() {
          return this._applicationWidget;
        },
        setState: function(state) {
          switch (state) {
            case cls.UIApplicationService.status.running:
              this.getWidget().hideWaiter();
          }
        }
      };
    });
    cls.ApplicationServiceFactory.register("UI", cls.UIApplicationService);
  });
