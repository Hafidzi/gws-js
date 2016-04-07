/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2014. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

var net = require("net");

var directConnectionListener = {
  whenConnection: function() {},
  incomingConnection: function(connection) {
    var incomingDataWaiting = [],
      incomingDataWaiters = [],
      incomingCloseWaiters = [],
      livingConnection = {
        connection: connection,
        whenData: function(data) {
          if (incomingDataWaiters.length) {
            incomingDataWaiters.shift()(data);
          } else {
            incomingDataWaiting.push(data);
          }
        },
        onData: function(callback) {
          livingConnection.manageIncomingData(callback);
        },
        sendData: function(data) {
          livingConnection.connection.write(new Buffer(data, "binary"));
        },
        manageIncomingData: function(callback) {
          if (incomingDataWaiting.length) {
            callback(incomingDataWaiting.shift());
          } else {
            incomingDataWaiters.push(callback);
          }
        },
        setEncoding: function() {
          livingConnection.connection.setEncoding("utf-8");
        },
        whenClose: function(callback) {
          incomingCloseWaiters.push(callback);
        },
        onClose: function() {
          incomingCloseWaiters.forEach(function(closer) {
            closer();
          });
        },
        close: function() {

        }
      };

    connection.on("data", function(data) {
      livingConnection.whenData(data);
    });
    connection.on("end", function() {
      livingConnection.connection.destroy();
      livingConnection.connection = null;
      incomingDataWaiting.length = 0;
      incomingDataWaiters.length = 0;
      livingConnection.onClose();
      incomingCloseWaiters.length = 0;

    });

    directConnectionListener.whenConnection(livingConnection);
  },
  start: function() {
    if (directConnectionListener.listener) {
      throw "connection already on";
    }
    directConnectionListener.listener = net.createServer(directConnectionListener.incomingConnection);
    directConnectionListener.listener.listen(6400, function() {});
  },
  stop: function() {
    directConnectionListener.listener.close();
    directConnectionListener.listener = null;
  }
};
exports.get = function() {
  return directConnectionListener;
};
