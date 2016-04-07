"use strict";
(function(window) {
  var embedded = {
    nwjs: !!(typeof(process) === "object" && process.features && process.features.uv),
    phonegap: (document.location.protocol === "file:")
  };
  embedded.any = embedded.nwjs || embedded.phonegap;

  window.embeddedInfo = embedded;
})(window);
