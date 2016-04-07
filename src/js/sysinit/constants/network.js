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

gbc.constants.network = {
  /**
   * The different headers used by the protocol
   */
  headers: {
    error: "X-FourJs-Error",
    session: "X-FourJs-Id",
    application: "X-FourJs-AppId",
    timeout: "X-FourJs-Timeout",
    webComponent: "X-FourJs-WebComponent",
    newTask: "X-FourJs-NewTask",
    closed: "X-FourJs-Closed",
    devmode: "X-FourJs-Development",
    contentType: "Content-Type"
  },

  /**
   * Enum RequestType
   * The type of request used in the VM protocol's header
   */
  requestType: {
    AUI: 1,
    Ping: 2,
    Interrupt: 3,
    Close: 4,
    FT: 5
  },
  /**
   * The needed stater response headers
   */
  startHeaders: {
    session: {
      error: "Missing Session ID"
    },
    timeout: {
      error: "Missing Timeout"
    },
    webComponent: {
      prop: "webComponent",
      error: "Missing WebComponent Path"
    }
  }
};

/**
 * Array RequestTypeStrings
 * Associate a string to each RequestType. For logging purpose.
 */
gbc.constants.network.requestTypeStrings = Object.swap(gbc.constants.network.requestType);
