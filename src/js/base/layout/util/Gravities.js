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

modulum("Gravities", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * gravities Enum
     * @class classes.Gravities
     */
    cls.Gravities = {
      START: "START",
      CENTER: "CENTER",
      END: "END",
      FILL: "FILL"
    };
    Object.freeze(cls.Gravities);
  });
