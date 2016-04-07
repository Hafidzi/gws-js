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
  grunt.config.merge({
    watch: {
      options: {
        atBegin: true
      },
      scss: {
        files: ["src/**/*.scss",
          "src/**/*.scss.json",
          grunt.gbcOptions.compile.customization + "/**/*.scss",
          grunt.gbcOptions.compile.customization + "/**/*.scss.json" ],
        tasks: ["stylesheets"]
      },
      js: {
        files: ["src/js/**/*.js", grunt.gbcOptions.compile.customization + "/**/*.js", "src/index.html"],
        tasks: ["compile_internal", "applyversion"]
      },
      templates: {
        files: ["src/js/**/*.tpl.html", grunt.gbcOptions.compile.customization + "/**/*.tpl.html"],
        tasks: ["handlebars:compile"]
      }
    },
    concurrent: {
      dev: {
        tasks: ["watch:scss", "watch:js", "watch:templates"],
          options: {
          logConcurrentOutput: true,
            limit: 6
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("dev", ["compile", "concurrent:dev"]);
};
