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
  grunt.gbcOptions.compile.__index_js_includes= [];
  grunt.gbcOptions.compile.__index_js_includes.push.apply(grunt.gbcOptions.compile.__index_js_includes, grunt.gbcClientLibs.dest);
  grunt.gbcOptions.compile.__index_js_includes.push(grunt.gbcDistWeb + "js/compiledTemplates.js");
  grunt.gbcOptions.compile.__index_js_includes.push.apply(grunt.gbcOptions.compile.__index_js_includes, grunt.gbcSources);

  grunt.config.merge({
    copy: {
      jsdev: {
        src: grunt.gbcSources,
        dest: grunt.gbcDistWeb
      }
    },
    injector: {
      indexdev: {
        options: {
          template: "src/index.html",
          addRootSlash: false,
          transform: function(filepath) {
            var e = filepath.split(".").slice(-1)[0];
            var f = filepath.replace(/^dist\/web\//, "")+"?t="+(new Date().getTime());
            if (e === "css") {
              return "<link rel=\"stylesheet\" href=\"" + f + "\">";
            } else if (e === "js") {
              return "<script src=\"" + f + "\"></script>";
            } else if (e === "html") {
              return "<link rel=\"import\" href=\"" + f + "\">";
            }
          }
        },
        files: [{dest:grunt.gbcDistWeb + "index.html", src: grunt.gbcOptions.compile.__index_js_includes}]
      },
      bootstrapdev: {
        options: {
          template: "src/index.html",
          addRootSlash: false,
          transform: function(filepath) {
            var e = filepath.split(".").slice(-1)[0];
            var f = filepath.replace(/^dist\/web\//, "")+"?t="+(new Date().getTime());
            f = "$(gwc-js.uri)/" + f;
            if (e === "css") {
              return "<link rel=\"stylesheet\" href=\"" + f + "\">";
            } else if (e === "js") {
              return "<script src=\"" + f + "\"></script>";
            } else if (e === "html") {
              return "<link rel=\"import\" href=\"" + f + "\">";
            }
          }
        },
        files: [{dest:grunt.gbcDistWeb + "bootstrap.html", src: grunt.gbcOptions.compile.__index_js_includes}]
      }
    },
    replace: {
      indexdev: {
        src: ["dist/web/index.html"],
        overwrite: true,
        replacements: [{
          from: "$GBC/",
          to: ""
        },{
          from: "<!-- Bootstrap information -->",
          to: ""
        }]
      },
      bootstrapdev: {
        src: ["dist/web/bootstrap.html"],
        overwrite: true,
        replacements: [{
          from: "$GBC/",
          to: "$(gwc-js.uri)/"
        },{
          from: "<!-- Bootstrap information -->",
          to: function(){
            return grunt.file.read("src/bootstrapParams.tpl");
          }
        }]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-injector");
  grunt.loadNpmTasks("grunt-text-replace");

  grunt.registerTask("compile_internal", ["copy:jsdev", "injector:indexdev", "replace:indexdev",
    "injector:bootstrapdev", "replace:bootstrapdev"]);
};
