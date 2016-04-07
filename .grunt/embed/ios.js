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

module.exports = function(grunt){
  grunt.registerTask("buildIos", "Compile and create ipa app for ios", function() {
    var done = this.async();
    grunt.util.spawn({
      cmd: "sh",
      args: ["tools/scripts/ios-builder.sh"],
      opts: {stdio: "inherit", env:grunt.gbcSigning.ios.env()}
    },  function (err, result) {
      grunt.log.writeln(result);
      if (err) {
        throw err;
      }
      grunt.log.ok(String(result));
      done();
    });
  });

  grunt.registerTask("phonegap-ios", ["phonegap:build:ios","buildIos"]);

};
