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

var fs = require("fs"),
  path=  require("path");

module.exports = function(grunt){
  grunt.gbcOptions = grunt.file.readJSON(path.join(__dirname, "../defaults.json"));
  try {
    var locals = grunt.file.readJSON("custom.json");
    grunt.util._.merge(grunt.gbcOptions, locals);
  } catch (e) {
    //use fallback values
  }

  grunt.gbcDistWeb = "dist/web/";

  grunt.gbcSources = [
    "src/js/libextensions/**/*.js",
    "src/js/sysinit/gbc.js",
    ".cache/scssjson.js",
    "src/js/sysinit/**/*.js",
    "!src/js/sysinit/gbcStart.js",
    "src/js/base/**/*.js",
    "src/js/plugins/**/*.js"
  ];

  if (!!grunt.gbcOptions.compile.customization){
    var p = path.normalize(path.join(process.cwd(), ""+grunt.gbcOptions.compile.customization));
    if (!grunt.file.isDir(p)) {
      grunt.gbcOptions.compile.customization = "customization";
      p = path.normalize(path.join(process.cwd(), "customization"));
    }
    grunt.gbcOptions.compile.__cust_dir = p;
    grunt.gbcSources.push(p+"/js/**/*.js");
  }

  grunt.gbcSources.push("src/js/sysinit/gbcStart.js");

  return grunt.gbcOptions;
};