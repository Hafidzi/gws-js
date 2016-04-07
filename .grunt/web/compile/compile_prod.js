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
//  indexprodjs.push(grunt.gbcDistWeb + "js/templates.js");
  grunt.gbcOptions.compile.__index_js_includes.push(grunt.gbcDistWeb + "js/compiledTemplates.js");
  grunt.gbcOptions.compile.__index_js_includes.push(grunt.gbcDistWeb + "js/gbc.js");

  grunt.config.merge({
    uglify: {
      prod: {
        options:{
          banner: "/// FOURJS_START_COPYRIGHT(D,2014)\n" +
          "/// Property of Four Js*\n" +
          "/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.\n" +
          "/// * Trademark of Four Js Development Tools Europe Ltd\n" +
          "///   in the United States and elsewhere\n" +
          "///\n" +
          "/// This file can be modified by licensees according to the\n" +
          "/// product manual.\n" +
          "/// FOURJS_END_COPYRIGHT\n\n"
        },
        files: [{
          src: grunt.gbcSources,
          dest: grunt.gbcDistWeb + "js/gbc.js"
        }]
      },
      prod_templates: {
        options:{
          banner: "/// FOURJS_START_COPYRIGHT(D,2014)\n" +
          "/// Property of Four Js*\n" +
          "/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.\n" +
          "/// * Trademark of Four Js Development Tools Europe Ltd\n" +
          "///   in the United States and elsewhere\n" +
          "///\n" +
          "/// This file can be modified by licensees according to the\n" +
          "/// product manual.\n" +
          "/// FOURJS_END_COPYRIGHT\n\n"
        },
        files: [{
          src: grunt.gbcDistWeb + "js/compiledTemplates.js",
          dest: grunt.gbcDistWeb + "js/compiledTemplates.js"
        }]
      }
    },
    injector: {
      indexprod: {
        options: {
          template: "src/index.html",
          ignorePath: grunt.gbcDistWeb + "",
          addRootSlash: false
        },
        files: [{dest: grunt.gbcDistWeb + "index.html", src: grunt.gbcOptions.compile.__index_js_includes}]
      },
      bootstrapprod: {
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
      indexprod: {
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
      bootstrapprod: {
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

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-injector");
  grunt.loadNpmTasks("grunt-text-replace");


  grunt.registerTask("compile_internal", ["uglify:prod", "uglify:prod_templates", "injector:indexprod", "replace:indexprod",
    "injector:bootstrapprod", "replace:bootstrapprod"]);
};
