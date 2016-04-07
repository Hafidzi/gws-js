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
    phonegap: {
      config: {
        root: grunt.gbcDistWeb,
        config: "./tools/phonegap/config.xml",
        cordova: "./tools/phonegap",
        path: "dist/phonegap",
        plugins: [],
        platforms: ["android", "ios"],
        verbose: false,
        releases: "dist/phonegap/releases",
        releaseName: function(){
          var pkg = grunt.file.readJSON("package.json");
          return(pkg.name + "-" + pkg.version);
        },
        debuggable: false,

        // Must be set for ios to work.
        // Should return the app name.
        name: function(){
          var pkg = grunt.file.readJSON("package.json");
          return pkg.name;
        },

        // Add a key if you plan to use the `release:android` task
        // See http://developer.android.com/tools/publishing/app-signing.html
        key: {
          store: grunt.gbcSigning.android.store(),
          alias: grunt.gbcSigning.android.alias(),
          aliasPassword: grunt.gbcSigning.android.aliasPassword,
          storePassword: grunt.gbcSigning.android.storePassword
        },

/*
        // Set an app icon at various sizes (optional)
        icons: {
          android: {
            ldpi: 'icon-36-ldpi.png',
            mdpi: 'icon-48-mdpi.png',
            hdpi: 'icon-72-hdpi.png',
            xhdpi: 'icon-96-xhdpi.png'
          },
          wp8: {
            app: 'icon-62-tile.png',
            tile: 'icon-173-tile.png'
          },
          ios: {
            icon29: 'icon29.png',
            icon29x2: 'icon29x2.png',
            icon40: 'icon40.png',
            icon40x2: 'icon40x2.png',
            icon57: 'icon57.png',
            icon57x2: 'icon57x2.png',
            icon60x2: 'icon60x2.png',
            icon72: 'icon72.png',
            icon72x2: 'icon72x2.png',
            icon76: 'icon76.png',
            icon76x2: 'icon76x2.png'
          }
        },
        */
/*
        // Set a splash screen at various sizes (optional)
        // Only works for Android and IOS
        screens: {
          android: {
            ldpi: 'screen-ldpi-portrait.png',
            // landscape version
            ldpiLand: 'screen-ldpi-landscape.png',
            mdpi: 'screen-mdpi-portrait.png',
            // landscape version
            mdpiLand: 'screen-mdpi-landscape.png',
            hdpi: 'screen-hdpi-portrait.png',
            // landscape version
            hdpiLand: 'screen-hdpi-landscape.png',
            xhdpi: 'screen-xhdpi-portrait.png',
            // landscape version
            xhdpiLand: 'www/screen-xhdpi-landscape.png'
          },
          ios: {
            // ipad landscape
            ipadLand: 'screen-ipad-landscape.png',
            ipadLandx2: 'screen-ipad-landscape-2x.png',
            // ipad portrait
            ipadPortrait: 'screen-ipad-portrait.png',
            ipadPortraitx2: 'screen-ipad-portrait-2x.png',
            // iphone portrait
            iphonePortrait: 'screen-iphone-portrait.png',
            iphonePortraitx2: 'screen-iphone-portrait-2x.png',
            iphone568hx2: 'screen-iphone-568h-2x.png'
          }
        },
*/
        // Android-only integer version to increase with each release.
        // See http://developer.android.com/tools/publishing/versioning.html
        versionCode: function(){ return(1); },

        // Android-only options that will override the defaults set by Phonegap in the
        // generated AndroidManifest.xml
        // See https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
        minSdkVersion: function(){ return(10); },
        targetSdkVersion: function(){ return(19); },
/*
        // iOS7-only options that will make the status bar white and transparent
        iosStatusBar: 'WhiteAndTransparent',

        // If you want to use the Phonegap Build service to build one or more
        // of the platforms specified above, include these options.
        // See https://build.phonegap.com/
        remote: {
          username: 'your_username',
          password: 'your_password',
          platforms: ['android', 'blackberry', 'ios', 'symbian', 'webos', 'wp7']
        },
*/
        // Set an explicit Android permissions list to override the automatic plugin defaults.
        // In most cases, you should omit this setting. See 'Android Permissions' in README.md for details.
        permissions: ["INTERNET", "ACCESS_COURSE_LOCATION"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-phonegap");
};