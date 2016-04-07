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

modulum('LoggerBase', ['LogService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    var abstractLoggerMethods = {};
    for (var levelId = 1; levelId < context.LogService.levels.length; levelId++) {
      abstractLoggerMethods[context.LogService.levels[levelId]] = Function.noop;
    }
    cls.AbstractLogger = context.oo.Class(abstractLoggerMethods);

    /**
     * @class classes.LoggerBase
     */
    cls.LoggerBase = context.oo.Class(abstractLoggerMethods);
  });
