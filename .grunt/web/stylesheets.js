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
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var jsonToScss = function(data){
  var result = "";
  if (data) {
    if (_.isPlainObject(data)) {
      result = Object.keys(data).map(function(key){
        return "$"+key+":"+data[key]+";";
      }).join("\n");
    }
  }
  return result;
};

module.exports = function(grunt){
  grunt.config.merge({
    autoprefixer: {
      options: {
        browsers: "last 1 version"/*"> 0%"*/
      },
      css: {
        expand: true,
        cwd: ".cache",
        src: "css/**/*.css",
        dest: grunt.gbcDistWeb
      }
    },
    sass: {
      development: {
        options: {
          outputStyle: "expanded",
          importer: function (url, file, done) {
            if (!grunt.gbcOptions.compile.customization) {
              if (url.indexOf(grunt.gbcOptions.compile.customization)>=0) {
                done({contents: ""});
                return;
              }
            }
            var localUrl = url.replace("/customization/", "/"+grunt.gbcOptions.compile.customization+"/");

            if (!/\.(scss|json)$/.test(path.basename(localUrl))){
              localUrl = localUrl+".scss";
            }
            var fullPath = path.resolve(path.dirname(file), localUrl),
              localDone = function(result){
                if (/\.json$/.test(path.basename(fullPath))){
                  fs.readFile(fullPath, {encoding:"utf8"}, function(err, fileContents){
                    if (err){
                      done({contents: ""});
                    }else {
                      var data ="{}";
                      try {
                        data = JSON.parse(fileContents);
                      }catch(e){
                        grunt.log.error("Malformed json file : " + fullPath);
                      }
                      done({contents: jsonToScss(data)});

                    }
                  });
                }else {
                  done(result);
                }
              };
            fs.access(fullPath, fs.R_OK, function (err) {
              if (err) {
                fullPath = path.resolve(path.dirname(fullPath), '_' + path.basename(fullPath));
                fs.access(fullPath, fs.R_OK, function (err) {
                  if (err) {
                    done({contents: ""});
                  } else {
                    localDone({file: localUrl});
                  }
                });
              } else {
                localDone({file: localUrl});
              }
            });
          }
        },
        files: {
          ".cache/css/main.css": "src/sass/main.scss"
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-sass");

  grunt.registerTask("stylesheets", ["sass:development", "autoprefixer:css"]);
};