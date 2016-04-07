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

var path= require("path");
module.exports = function(grunt){
  grunt.config.merge({
    jsbeautifier: {
      options: {
        config: path.join(__dirname, "beautifier.config.json")
      },
      default: {
        src: ["Gruntfile.js", "*.json", "src/js/**/*.js", "src/node/**/*.js", "src/js/**/*.html", "!src/doc/**", "!src/**/*.tpl.html"],
        options: {
          mode: "VERIFY_AND_WRITE"
        }
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      files: ["Gruntfile.js", "src/js/**/*.js", "src/node/**/*.js"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");

  grunt.registerTask("codecheck", ["jsbeautifier:default", "jshint"]);


};