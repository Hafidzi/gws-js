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

(
  /**
   * @param {gbc} context
   */
  function(context) {
    context.constants.network.uaStates = [{
      name: "start",
      from: "none",
      to: "SendStart"
    }, {
      name: "startTask",
      from: "none",
      to: "SendStartTask"
    }, {
      name: "getConnectionString",
      from: ["SendStart", "SendStartTask"],
      to: "RecvConnectionString"
    }, {
      name: "handShake",
      from: "RecvConnectionString",
      to: "SendHandShake"
    }, {
      name: "getInitialAUI",
      from: "SendHandShake",
      to: "RecvInitialAUI"
    }, {
      name: "waitForMoreInitialAUI",
      from: "RecvInitialAUI",
      to: "SendEmpty"
    }, {
      name: "getMoreOrder",
      from: "SendEmpty",
      to: "RecvOrder"
    }, {
      name: "guiMode",
      from: ["RecvInitialAUI", "RecvOrder"],
      to: "GUI"
    }, {
      name: "ping",
      from: "GUI",
      to: "Ping"
    }, {
      name: "pingSent",
      from: "Ping",
      to: "GUI"
    }, {
      name: "sendOrder",
      from: "GUI",
      to: "SendOrder"
    }, {
      name: "getOrderAnswer",
      from: "SendOrder",
      to: "RecvOrder"
    }, {
      name: "waitForMoreOrder",
      from: "RecvOrder",
      to: "SendEmpty"
    }, {
      name: "waitForEnd",
      from: ["ApplicationEnding", "GUI", "SendHandShake"],
      to: "ApplicationEnding"
    }, {
      name: "headerError",
      from: ["SendStart", "SendStartTask", "SendHandShake", "SendEmpty", "SendOrder", "GUI", "Ping"],
      to: "HeaderError"
    }, {
      name: "endApp",
      from: ["HeaderError", "SendStart", "SendStartTask", "SendHandShake", "SendEmpty", "SendOrder", "Ping", "ApplicationEnding"],
      to: "ApplicationEnd"
    }];
  })(gbc);
