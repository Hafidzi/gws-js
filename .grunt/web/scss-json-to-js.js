"use strict";

module.exports = function (grunt) {
  var _ = require('lodash');

  function parseScssJsonFile(file, variables) {
    var json = grunt.file.readJSON(file);
    Object.keys(json).forEach(function(key) {
      var value = json[key];
      value = _.trim(value.replace('!default', ''));
      if (_.startsWith(value, '$')) {
        value = variables[value.substr(1)];
      }
      variables[key] = value;
    });
  }

  function writeJsonFile(fileName, variables) {
    grunt.file.write(fileName, 'window.gbc.constants.theme=' + JSON.stringify(variables));
  }

  grunt.registerMultiTask('scss-json-to-js', 'Transform our *.scss.json files to a javascript object', function () {

    var variables = {};

    this.files.forEach(function (entry) {
      entry.src.forEach(function(scssJsonFile) {
        parseScssJsonFile(scssJsonFile, variables);
      });
      writeJsonFile(entry.dest, variables);
    });
  });
};