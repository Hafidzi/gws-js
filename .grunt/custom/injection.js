/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

module.exports = function(grunt){
  var getBuildNumber = function() {
    return grunt.template.date(new Date().getTime(), "yyyymmddHHMM");
  };
  grunt.config.merge({
    replace:{
      version: {
        src: [grunt.gbcDistWeb + "js/gbc.js", grunt.gbcDistWeb + "src/js/sysinit/gbc.js"],
        overwrite: true,
        replacements: [{
            from: "%%VERSION%%",
            to: function () {
              var version = grunt.file.read("VERSION").toString();
              return version.replace("\n", "") + ".c";
            }
          }, {
            from: "%%BUILD%%",
            to: function () {
              return getBuildNumber();
            }
          }, {
            from: "%%TAG%%",
            to: function () {
              var version = grunt.file.read("VERSION").toString();
              return version.replace("\n", "") + ".c";
            }
          }, {
            from: "%%DIRTY%%",
            to: function () {
              return "";
            }
        }]
      },
      prod: {
        src: [grunt.gbcDistWeb + "js/gbc.js", grunt.gbcDistWeb + "src/js/sysinit/gbc.js"],
        overwrite: true,
        replacements: [{
          from: "%%PROD%%",
          to: function() {
            grunt.log.writeln("prodmode : +" + grunt.gbcOptions.compile.mode);
            var prod = grunt.gbcOptions.compile.mode === "prod";
            return prod? "prod": "";
          }
        }]
      }
    }
  });
  grunt.loadNpmTasks("grunt-text-replace");

  grunt.registerTask("getbuildnumber", "Get the build number", function() {
    grunt.log.writeln("BUILD=" + getBuildNumber());
  });
  grunt.registerTask("buildnumber", "Returns the current build number in format 'BUILD=<buildnumber>' on the console", ["getbuildnumber"]);
  grunt.registerTask("applyversion", "Replaces the version and build information in produced code", ["replace:version", "replace:prod"]);
};