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

/*
 TODO : documentation
 Direct protocol network helpers
 */

(
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.DirectNetwork
     * @desc Standardized queries to access direct proxy
     */
    cls.DirectNetwork = context.oo.Class(function() {
      /** @lends classes.DirectNetwork.prototype */
      return {
        __name: "DirectNetwork",
        connection: null,
        listening: false,
        canDialog: false,
        constructor: function(connection) {
          this.connection = connection;
        },
        waitForConnection: function(onConnection) {
          if (!this.listening) {
            this.listening = true;
            this.canDialog = true;
            this.read(function(connectionString) {
              onConnection(connectionString);
              this.connection.setEncoding();
            }.bind(this));
          } else {
            throw "Already listening";
          }
        },
        write: function(data) {
          if (this.canDialog) {
            this.connection.sendData(data);
          }
        },
        read: function(callback) {
          if (this.canDialog) {
            this.connection.onData(function(data) {
              callback(data);
            });
          }
        },
        close: function() {
          this.connection.close();
        }
      };
    });
  })(gbc, gbc.classes);
