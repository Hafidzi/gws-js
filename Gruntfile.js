/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

module.exports = function(grunt) {
  "use strict";
  require("./.grunt/parameters/parameters")(grunt);
  require("time-grunt")(grunt);

  // Project configuration.
  grunt.config.init({
    pkg: grunt.file.readJSON("package.json")
  });

  require("./.grunt/custom/injection")(grunt);
  require("./.grunt/libs/clientlibs")(grunt);

  require("./.grunt/common/clean")(grunt);
  require("./.grunt/common/customize")(grunt);
  require("./.grunt/common/dependencies")(grunt);
  require("./.grunt/embed/embed")(grunt);
  require("./.grunt/web/codecheck")(grunt);
  require("./.grunt/web/scss-json-to-js")(grunt);
  require("./.grunt/web/compile/compile")(grunt);
  require("./.grunt/web/stylesheets")(grunt);
  require("./.grunt/web/watch/watch")(grunt);

  grunt.registerTask("default", "Default task. Run the compilation", ["compile"]);
  
  // Travis CI task.
  grunt.registerTask('travis', 'lint qunit');
};
