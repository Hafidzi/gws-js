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
 * swaps key/values
 *
 * @param obj the source object
 * @returns a newly created object that represents the swapped object
 */
Object.swap = function(obj) {
  var result = {};
  if (obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        result[obj[property]] = property;
      }
    }
  }
  return result;
};

// jshint ignore:start
String.prototype.getBytesCount = function() {
  var log = Math.log(256);
  var total = 0;
  for (var i = 0; i < this.length; i++) {
    var charCode = this.charCodeAt(i);
    total += (Math.ceil(Math.log(charCode) / log));
  }
  return total;
};

// Replace char at index
String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};
// jshint ignore:end

/*
 ** Function decodeInteger
 **
 ** Decode an integer in Big-Endian binary notation
 ** and store it into a JavaScript native integer.
 **
 ** Truncate the value parameter if longer than 4 bytes.
 **
 ** String value: the integer in BE binary notation
 ** returns int: the integer in JavaScript native integer
 */
Number.decodeInteger = function(value) {
  if (value.length > 4) {
    value = value.substring(0, 4);
  }
  var ret = "";
  for (var i = 0; i < value.length; ++i) {
    var hex = value.charCodeAt(i).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    ret += hex;
  }
  value = parseInt(ret, 16);
  return value;
};

/*
 ** Function encodeInteger
 **
 ** Encode a JavaScript native integer and store it
 ** into an integer in Big-Endian binary notation.
 **
 ** Truncate the value parameter if longer than 4 bytes.
 ** (the VM protocol's header only handles 4 bytes integer)
 **
 ** int value: the integer in JavaScript native integer
 ** returns String: the integer in BE binary notation
 */
Number.encodeInteger = function(value) {
  value = value.toString(16);
  if (value.length > 8) {
    value = value.substring(value.length - 8, value.length);
  } else if (value.length < 8) {
    while (value.length < 8) {
      value = "0" + value;
    }
  }
  var valueArr = value.match(/.{2}/g);
  for (var i = 0; i < valueArr.length; ++i) {
    valueArr[i] = String.fromCharCode(parseInt(valueArr[i], 16));
  }
  value = valueArr.join("");
  return value;
};

Number.isNaN = Number.isNaN || window.isNaN;

Number._discrete = true;
Number.discrete = function(value) {
  if (Number._discrete) {
    return Math.round(value);
  } else {
    return value;
  }
};

/**
 * mobileCheck

 * Return true if mobile browser, false otherwise
 * check on : http://stackoverflow.com/a/11381730/989439
 * @returns bool if the browser is mobile
 */
/* jshint ignore:start */
window.mobileCheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
      .test(a) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
      .test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
/* jshint ignore:end */
window.offset = function(elt) {
  var rect = elt[0].getBoundingClientRect();
  return {
    left: Math.round(rect.left),
    top: Math.round(rect.top),
    centerX: Math.round(rect.left + (rect.width / 2)),
    centerY: Math.round(rect.top + (rect.height / 2))
  };
};
window.screenOffset = function(elt) {
  //TODO: For Firefox, use "window.screenX" and "window.screenY"
  var result = window.offset(elt);
  var topDelta = window.outerHeight - window.innerHeight + window.screenTop;
  var leftDelta = window.screenLeft;
  result.top += topDelta;
  result.centerY += topDelta;
  result.centerX += leftDelta;
  return result;
};

/**
 * Test if a string is a valid URL
 *
 * @returns {Boolean}
 */
window.isValidURL = function(str) {
  var pattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
  if (!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
};

window.debug = {
  __activated: false,
  activate: function() {
    this.__activated = true;
    document.body.className += " gbc__devmode__";
  },
  activated: [],
  log: function(activated, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    if (this.__activated && this.activated.indexOf(activated) >= 0) {
      console.log(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    }
  },
  layoutlog: function(type, w) {
    console.log("LAYOUT : " + type);
    console.log("LAYOUT : " + w.__name, w._auiTag || ("WW" + w._uuid));
    console.log("LAYOUT : MEASURED : " + w.getLayoutInformation().getMeasured().getWidth() + "x" + w.getLayoutInformation().getMeasured()
      .getHeight());
  }
};
(function(window) {
  var method = function(timeout, trigger, event, fallback) {
    var time = 0;
    var itv = window.setInterval(function() {
      if (trigger()) {
        window.clearInterval(itv);
        event();
      } else {
        time += 50;
        if (time > timeout) {
          window.clearInterval(itv);
          (fallback || event)();
        }
      }
    }, 50);
  };

  window.waitMax = method;
})(window);
(function() {
  window.browserInfo = {
    isFirefox: false,
    isEdge: false,
    isIE: false,
    isChrome: false,
    isOpera: false,
    isSafari: false
  };

  var sUsrAg = window.navigator.userAgent;

  if (sUsrAg.indexOf("Edge") > -1) {
    window.browserInfo.isEdge = true;
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    window.browserInfo.isChrome = true;
  } else if (sUsrAg.indexOf("Safari") > -1) {
    window.browserInfo.isSafari = true;
  } else if (sUsrAg.indexOf("Opera") > -1) {
    window.browserInfo.isOpera = true;
  } else if (sUsrAg.indexOf("Firefox") > -1) {
    window.browserInfo.isFirefox = true;
  } else if (sUsrAg.indexOf("MSIE") > -1 || sUsrAg.indexOf("Trident") > -1) {
    window.browserInfo.isIE = true;
  }
})();

// Compute ScrollBar size
(function() {
  var div = document.createElement('div');
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.position = "absolute";
  div.style.top = "-200px";
  div.style.left = "-200px";
  div.innerHTML = '<div style="height:100px;width:100%"></div>';

  document.body.appendChild(div);
  var w1 = div.offsetWidth;
  var w2 = div.children[0].offsetWidth;
  document.body.removeChild(div);

  window.scrollBarSize = (w1 - w2);
})();
/*jshint -W121 */
Function.prototype.debounce = function(threshold, execAsap) {
  var timeout = null;
  var func = this;
  var debounced = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    var context = this;
    var delayed = function() {
      if (!execAsap) {
        func.apply(context, [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
      }
      timeout = null;
    };

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(context, [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
    }

    timeout = setTimeout(delayed, threshold || 100);
  };

  return debounced;
};

Function.prototype.throttle = function(threshold) {
  var func = this;
  var throttling = false;
  var clear = function() {
    throttling = false;
  };
  var throttled = function() {
    if (!throttling) {
      func.apply(this, arguments);
      window.setTimeout(clear, threshold);
      throttling = true;
    }
  };

  return throttled;
};

Function.noop = function() {};
