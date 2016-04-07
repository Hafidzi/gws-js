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
 starter for gbc environment
 script has to be the last to load to run the environment
 */

(
  /**
   * @param {Window} context
   */
  function(context) {
    context.gbc.run();
    if (context.gbc.embedded.nwjs) {
      context.gbc.DirectModeService.switchToDirectMode();
    }
  })(window);
