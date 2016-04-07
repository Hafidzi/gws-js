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
  grunt.gbcClientLibs = grunt.gbcClientLibs || {};
  try {
    grunt.gbcClientLibs.list = require("./clientlibs_" + grunt.gbcOptions.compile.mode)(grunt);
  }catch (e){
    grunt.gbcClientLibs.list = require("./clientlibs_dev")(grunt);
  }
  grunt.gbcClientLibs.dest = grunt.gbcClientLibs.list.map(function(i) {
    return i.dest;
  });

  grunt.config.merge({
    copy: {
      clientlibs: {
        files: grunt.gbcClientLibs.list
      },
      droidFonts: {
        options: {
          processContent: false
        },
        files : [
          {expand:true, cwd: "node_modules/connect-fonts-droidsans/fonts/default", src:["*.*"], dest: grunt.gbcDistWeb + "lib/fonts/"},
          {expand:true, cwd: "node_modules/connect-fonts-droidsansmono/fonts/default", src:["*.*"], dest: grunt.gbcDistWeb + "lib/fonts/"}
        ]
      },
      i18nLocales: {
        expand: true,
        options: {
          processContent: false
        },
        cwd: "src/locales/",
        src: ["**"],
        dest: grunt.gbcDistWeb + "locales/"
      },
      materialIcons: {
        expand: true,
        options: {
          processContent: false
        },
        cwd: "bower_components/mdi/fonts/",
        src: ["*.*"],
        dest: grunt.gbcDistWeb + "lib/fonts/"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("libs", "Copy client libraries to the dist folder.", [
    "copy:clientlibs", "copy:droidFonts", "copy:i18nLocales", /*"copy:robotoFonts",*/ "copy:materialIcons"
  ]);

  return grunt.gbcClientLibs;
};