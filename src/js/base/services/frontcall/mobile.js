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

modulum('FrontCallService.modules.mobile', ['FrontCallService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    context.FrontCallService.modules.mobile = {

      getGeolocation: function() {
        // See : http://dev.w3.org/geo/api/spec-source.html
        var statusOK = "ok";
        var statusKO = "nok";

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              this.setReturnValues([statusOK, position.coords.latitude, position.coords.longitude]);
            }.bind(this),
            function(error) {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  this.setReturnValues([statusKO, 'PERMISSION_DENIED']);
                  return;
                case error.POSITION_UNAVAILABLE:
                  this.setReturnValues([statusKO, 'POSITION_UNAVAILABLE']);
                  return;
                case error.TIMEOUT:
                  this.setReturnValues([statusKO, 'TIMEOUT']);
                  return;
                default:
                  this.setReturnValues([statusKO, 'UNKNOWN_ERROR']);
                  return;
              }
            }.bind(this)
          );
        } else {
          return [statusKO, 'GEOLOC_UNAVAILABLE'];
        }
      }
    };
  }
);
