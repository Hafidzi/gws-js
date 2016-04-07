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
  try {
    require("./compile_" + grunt.gbcOptions.compile.mode)(grunt);
  }catch (e){
    require("./compile_dev")(grunt);
  }

  var templates = ["src/js/**/*.tpl.html"];
  if (!!grunt.gbcOptions.compile.__cust_dir){
    templates.push(grunt.gbcOptions.compile.__cust_dir+"/js/**/*.tpl.html");
  }

  grunt.config.merge({
    handlebars: {
      compile: {
        options: {
          namespace: "gbcTemplates",
          processName: function(item) {
            return item.replace(".tpl.html", "").replace(/(?:.*\/)?([^\/]+)/, "$1");
          },
          processContent: function(contents) {
            // remove html comments as well as starting and trailing spaces
            return contents.replace(/<!--[^>]*-->/g, "").replace(/^\s*/, "").replace(/\s*$/, "");
          }
        },
        files: [{dest: grunt.gbcDistWeb + "js/compiledTemplates.js", src: templates}]
      }
    },
    copy: {
      img: {
        expand: true,
        cwd: "src/img",
        src: "**/*",
        dest: grunt.gbcDistWeb + "img"
      },
      customizationImg: {
        expand: true,
        cwd: grunt.gbcOptions.compile.customization + "/img",
        src: "**/*",
        dest: grunt.gbcDistWeb + "img"
      },
      version: {
        expand: true,
        cwd: "",
        src: "VERSION",
        dest: grunt.gbcDistWeb
      }
    },
    "scss-json-to-js": {
      scssjson: {
        dest: ".cache/scssjson.js",
        src: [ 'src/sass/material/colors/color_theme.scss.json',
               grunt.gbcOptions.compile.customization + '/theme.scss.json',
               'src/sass/variables.scss.json' ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-handlebars");

  grunt.registerTask("resources", ["copy:img", "copy:customizationImg", "handlebars:compile"]);

  grunt.registerTask("compile_web", ["copy:version", "codecheck", "stylesheets", "resources", "scss-json-to-js:scssjson", "compile_internal", "applyversion"]);

  var compileDependencies = ["libs", "compile_web"];
  if (grunt.gbcOptions.compile.with.nwjs) {
    compileDependencies.push("build-nwjs");
  }

  if (grunt.gbcOptions.compile.with.android) {
    compileDependencies.push("phonegap:build:android");
    compileDependencies.push("phonegap:release:android");
  }

  if (grunt.gbcOptions.compile.with.ios) {
    compileDependencies.push("phonegap-ios");
  }

  grunt.registerTask("compile", compileDependencies);
};
