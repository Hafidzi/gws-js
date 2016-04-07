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

modulum('FrontCallService.modules.mymodule', ['FrontCallService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    context.FrontCallService.modules.mymodule = {

      myCustomSyncFunction: function (name) {
        if (name === undefined) {
          this.parametersError();
          return;
        }
        if (name.length === 0) {
          this.runtimeError("name shouldn't be empty");
          return;
        }

        return ["Hello " + name + " !"];
      },

      myCustomAsyncFunction: function (name) {
        if (name === undefined) {
          this.parametersError();
          return;
        }
        if (name.length === 0) {
          this.runtimeError("name shouldn't be empty");
          return;
        }

        window.setTimeout(function () {
          this.setReturnValues(["After 5s, Hello " + name + " !"]);
        }.bind(this), 5000);
      }
    };
  }
);