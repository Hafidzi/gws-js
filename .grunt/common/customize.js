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
  grunt.registerTask("switchTo", "Switch the compile mode (without cleaning dist)", function(mode) {
    var value = {
      compile: {
        mode: "dev"
      }
    };
    try {
      value = grunt.file.readJSON("custom.json");
    } catch (e) {}
    (value.compile = value.compile || {}).mode = mode;
    grunt.file.write("custom.json", JSON.stringify(value, null, 2));
    require("./../parameters/parameters")(grunt);
  });

  grunt.registerTask("switchAndCompile", "Switch the compile mode (and compile)", function(mode) {
    grunt.task.run("switchTo:" + mode);
    grunt.task.run("clean:default");
    grunt.task.run("compile");
  });

  var switchCompileWith = function(key, enable){
    var value = {
      compile: {
        "with": {}
      }
    };
    try {
      value = grunt.file.readJSON("custom.json");
    } catch (e) {}
    value.compile = value.compile || {};
    (value.compile.with = value.compile.with || {})[key] = enable;
    grunt.file.write("custom.json", JSON.stringify(value, null, 2));
  };
  grunt.registerTask("enableNwjs", "Enable nwjs embedded package during compilation", function() {
    switchCompileWith("nwjs", true);
  });
  grunt.registerTask("disableNwjs", "Disable nwjs embedded package during compilation", function() {
    switchCompileWith("nwjs", false);
  });
  grunt.registerTask("enableAndroid", "Enable android (phonegap) embedded package during compilation", function() {
    switchCompileWith("android", true);
  });
  grunt.registerTask("disableAndroid", "Disable android (phonegap) embedded package during compilation", function() {
    switchCompileWith("android", false);
  });
  grunt.registerTask("enableIos", "Enable ios (phonegap) embedded package during compilation", function() {
    switchCompileWith("ios", true);
  });
  grunt.registerTask("disableIos", "Disable ios (phonegap) embedded package during compilation", function() {
    switchCompileWith("ios", false);
  });

  grunt.registerTask("switchAndCompile", "Switch the compile mode (and compile)", function(mode) {
    grunt.task.run("switchTo:" + mode);
    grunt.task.run("clean:default");
    grunt.task.run("compile");
  });

};