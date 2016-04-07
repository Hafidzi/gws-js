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

modulum('FrontCallService.modules.standard', ['FrontCallService'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    context.FrontCallService.modules.standard = {

      feinfo: function(kind, data) {
        if (!kind) {
          this.parametersError();
          return;
        }
        switch (kind.toLowerCase()) {
          case 'browsername':
            if (window.browserInfo.isFirefox) {
              return ['Firefox'];
            } else if (window.browserInfo.isChrome) {
              return ['Chrome'];
            } else if (window.browserInfo.isIE) {
              return ['Internet Explorer'];
            } else if (window.browserInfo.isEdge) {
              return ['Edge'];
            } else if (window.browserInfo.isOpera) {
              return ['Opera'];
            } else if (window.browserInfo.isSafari) {
              return ['Safari'];
            }
            return ['Unknown'];
          case 'fename':
            return ['GBC'];
          case 'isactivex':
            return [false];
          case 'numscreens':
            return [1];
          case 'ostype':
            if (navigator.appVersion.indexOf('Win') !== -1) {
              return ['WINDOWS'];
            } else if (navigator.appVersion.indexOf('Linux') !== -1) {
              return ['LINUX'];
            } else if (navigator.appVersion.indexOf('Mac') !== -1) {
              return ['OSX'];
            } else if (navigator.appVersion.indexOf('Android') !== -1) {
              return ['ANDROID'];
            } else if (navigator.appVersion.indexOf('iPhone') !== -1 || navigator.appVersion.indexOf('iPad') !== -1) {
              return ['IOS'];
            }
            return ['Unknown OS Type'];
          case 'osversion':
            return ['Unknown'];
          case 'outputmap':
            return [''];
          case 'ppi':
            return [window.devicePixelRatio * 96];
          case 'screenresolution':
            return [screen.width + 'x' + screen.height];
          case 'target':
            return ['web'];
          case 'windowsize':
            return [window.document.body.clientWidth + 'x' + window.document.body.clientHeight];
        }
        return [''];
      },

      fgl_getfile: function(filename, url) { // jshint ignore:line
        if (!filename || !url) {
          this.parametersError();
          return;
        }
        var extension = "." + filename.split('.').pop();
        var app = this.getAnchorNode().getApplication();
        app.filetransfer.askForFile({
          fileTransferUrl: url,
          filename: filename,
          extension: extension
        }, function() {
          this.setReturnValues([]);
        }.bind(this));
      },

      fgl_putfile: function(url, filename) { // jshint ignore:line
        if (!url || !filename) {
          this.parametersError();
          return;
        }
        window.open(url, filename);
        return [];
      },

      getEnv: function(name) {
        if (!name) {
          this.parametersError();
          return;
        }
        return [''];
      },

      getWindowId: function(auiWindowId) {
        if (!auiWindowId) {
          this.parametersError();
          return;
        }
        return [''];
      },

      hardCopy: function(adaptScreenToPageSize) {
        window.print();
        return [true];
      },

      launchURL: function(url, mode) {
        if (!url) {
          this.parametersError();
          return;
        }

        var replace = (mode === "replace");

        if (!url.indexOf("mailto:") || !url.indexOf("news:") || !url.indexOf("file:")) {
          var frame = document.createElement("iframe");
          frame.style.display = "none";
          document.body.appendChild(frame);
          try {
            frame.src = url;
          } catch (ex) {}
        } else {
          if (replace) {
            window.onbeforeunload = null;
            window.location = url;
          } else { // 'popup'
            var win = window.open("about:blank");
            if (win) {
              win.document.write("<html><body><a href=\"" + url +
                "\" target=\"_self\">If it doesn't load, click here</a></body></html>");
              win.document.close();
              win.location = url;
            }
          }
        }
        return [];
      },

      playSound: function(soundFile) {
        if (!soundFile) {
          this.parametersError();
          return;
        }
        var audio = $('<audio src="' + soundFile + '"></audio>')[0];
        audio.play();
        return [];
      },

      setWebComponentPath: function(path) {
        if (!path) {
          this.parametersError();
          return;
        }
        this.getAnchorNode().getApplication().info().webComponentUsrPath = path;
        return [];
      }
    };
  }
);
