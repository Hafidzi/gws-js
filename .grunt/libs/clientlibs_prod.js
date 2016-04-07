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
  return [{
    dest: grunt.gbcDistWeb + "lib/js/sugar.js",
    src: "bower_components/sugar/release/sugar.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/uuid.js",
    src: "bower_components/node-uuid/uuid.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/jsface.js",
    src: "bower_components/jsface/jsface.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/jsface.pointcut.js",
    src: "bower_components/jsface/jsface.pointcut.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/mousetrap.js",
    src: "bower_components/mousetrap/mousetrap.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/mousetrap-global-bind.js",
    src: "bower_components/mousetrap/plugins/global-bind/mousetrap-global-bind.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/jquery.js",
    src: "bower_components/jquery/dist/jquery.min.js"
  }, /*{
    dest: grunt.gbcDistWeb + "lib/js/nicescroll.js",
    src: "bower_components/nicescroll/dist/jquery.nicescroll.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/jquery.mousewheel.js",
    src: "bower_components/jquery-mousewheel/jquery.mousewheel.min.js"
  },*/ {
    dest: grunt.gbcDistWeb + "lib/js/handlebars.js",
    src: "bower_components/handlebars/handlebars.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/moment.js",
    src: "bower_components/moment/min/moment-with-locales.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/pikaday.js",
    src: "bower_components/pikaday-time/pikaday.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/state-machine.js",
    src: "bower_components/javascript-state-machine/state-machine.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/i18next.js",
    src: "bower_components/i18next/i18next.min.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/stacktrace-gps.js",
    src: "bower_components/stacktrace-gps/dist/stacktrace-gps.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/stackframe.js",
    src: "bower_components/stackframe/dist/stackframe.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/error-stack-parser.js",
    src: "bower_components/error-stack-parser/dist/error-stack-parser.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/stacktrace-generator.js",
    src: "bower_components/stack-generator/dist/stack-generator.js"
  }, {
    dest: grunt.gbcDistWeb + "lib/js/stacktrace.js",
    src: "bower_components/stacktrace-js/dist/stacktrace-with-polyfills.min.js"
  }];
};
