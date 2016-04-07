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
  if (grunt.gbcOptions.compile.with.android || grunt.gbcOptions.compile.with.ios) {
    var releaseName = function(){
      var pkg = grunt.file.readJSON("package.json");
      return(pkg.name + "-" + pkg.version);
    };
    grunt.gbcSigning = {
      android: {
        store: function () {
          return "tools/phonegap/release.keystore";
        },
        alias: function () {
          return "release";
        },
        storePassword: function () {
          return "123456";
        },
        aliasPassword: function () {
          return "123456";
        }
      },
      ios: {
        env: function () {
          return {
            APPNAME: releaseName(),
            KEYCHAINS: "/Users/webteam/Library/Keychains/iosSigning.keychain",
            ENTITLEMENTS: "/Users/webteam/Library/fjs-entitlements.plist",
            KEYCHAINSPASSWORD: "fourjs",
            CERTIFICATENAME: "Development Tools"
          };
        }
      }
    };
    try {
      grunt.gbcSigning = require("custom-signing")(grunt);
    } catch (e) { //fallback values
    }
  }
  return grunt.gbcOptions;
};
