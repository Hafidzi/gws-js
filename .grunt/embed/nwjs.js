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
    copy: {
      node: {
        files: [
          {dest: "dist/node/", src: ["**/*"], cwd: "src/node/", expand: true}
        ]
      }
    },
    nwjs: {
      options: {
        version:"v0.11.6",
        platforms: grunt.gbcOptions.compile.with.nwjs === true ? ["linux", "win", "osx"] : grunt.gbcOptions.compile.with.nwjs,
        buildDir: "dist/nwjs",
        cacheDir: ".cache/nwjs"
      },
      src: ["tools/nwjs/package.json", grunt.gbcDistWeb + "**/*", "./dist/node/**/*"]
    }
  });
  grunt.loadNpmTasks("grunt-nw-builder");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("build-nwjs", "Create nwjs package.", ["copy:node", "nwjs"]);

};
