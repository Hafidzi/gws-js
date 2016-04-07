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

/**
 *
 * Got from https://gist.github.com/aaronk6/bff7cc600d863d31a7bf
 *
 *
 * Register ajax transports for blob send/recieve and array buffer send/receive via XMLHttpRequest Level 2
 * within the comfortable framework of the jquery ajax request, with full support for promises.
 *
 * Notice the +* in the dataType string? The + indicates we want this transport to be prepended to the list
 * of potential transports (so it gets first dibs if the request passes the conditions within to provide the
 * ajax transport, preventing the standard transport from hogging the request), and the * indicates that
 * potentially any request with any dataType might want to use the transports provided herein.
 *
 * Remember to specify 'processData:false' in the ajax options when attempting to send a blob or arraybuffer -
 * otherwise jquery will try (and fail) to convert the blob or buffer into a query string.
 */
$.ajaxTransport("+*", function(options, originalOptions, jqXHR) {
  // Test for the conditions that mean we can/want to send/receive blobs or arraybuffers - we need XMLHttpRequest
  // level 2 (so feature-detect against window.FormData), feature detect against window.Blob or window.ArrayBuffer,
  // and then check to see if the dataType is blob/arraybuffer or the data itself is a Blob/ArrayBuffer
  if (window.FormData) {
    if (
      (options.dataType && (options.dataType === "blob" || options.dataType === "arraybuffer")) ||
      (options.data && ((window.Blob && options.data instanceof Blob) || (window.ArrayBuffer && options.data instanceof ArrayBuffer)))
    ) {
      return {
        /**
         * Return a transport capable of sending and/or receiving blobs - in this case, we instantiate
         * a new XMLHttpRequest and use it to actually perform the request, and funnel the result back
         * into the jquery complete callback (such as the success function, done blocks, etc.)
         *
         * @param headers
         * @param completeCallback
         */
        send: function(headers, completeCallback) {
          var xhr = new XMLHttpRequest(),
            url = options.url || window.location.href,
            type = options.type || "GET",
            dataType = options.dataType || "text",
            data = options.data || "",
            async = options.async || true,
            key;

          xhr.addEventListener("load", function() {
            var response = {};
            var isSuccess = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304;

            if (isSuccess) {
              response[dataType] = String.fromCharCode.apply(null, new Uint8Array(xhr.response));
            } else {
              // In case an error occured we assume that the response body contains
              // text data - so let's convert the binary data to a string which we can
              // pass to the complete callback.
              response.text = String.fromCharCode.apply(null, new Uint8Array(xhr.response));
            }
            completeCallback(xhr.status, xhr.statusText, response, xhr.getAllResponseHeaders());
          });

          xhr.open(type, url, async);
          xhr.responseType = dataType;
          xhr.processData = options.processData || false;
          xhr.contentType = options.contentType || "application/octet-stream";
          for (key in headers) {
            if (headers.hasOwnProperty(key)) {
              xhr.setRequestHeader(key, headers[key]);
            }
          }
          if (type !== "GET") {
            var toArrayBuffer = function(data) {
              var arr = [];
              for (var i = 0, j = data.length; i < j; ++i) {
                var charCode = data.charCodeAt(i);
                arr.push(charCode);
              }
              return new Uint8Array(arr);
            };
            data = new Blob([toArrayBuffer(data || "")]);
          }
          xhr.send(data);
        },
        abort: function() {
          jqXHR.abort();
        }
      };
    }
  }
});

// Display nice scrollBars
$.fn.niceScrollBar = function() {
  //var result = false;
  this.each(function(index, elem) {
    $(elem).niceScroll({
      cursorcolor: "#c4c4c4",
      background: "#f4f4f4",
      autohidemode: false,
      cursorborder: "none",
      cursorwidth: "10px"
    });
  });
  //return result;
};
