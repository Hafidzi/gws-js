/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";
(function() {
  /**
   *
   * @param {String} name
   */
  Element.prototype.getIntAttribute = function(name) {
    var result = parseInt(this.getAttribute(name), 10);
    return Object.isNaN(result) ? null : result;
  };

  var classedEventRE = /([^.]+)+(\..+)?/;

  /**
   *
   * @param {String} type
   * @param {Function} callback
   */
  Element.prototype.on = function(type, callback) {
    this._registeredEvents = this._registeredEvents || {};
    var t = classedEventRE.exec(type || "") || [],
      event = t[1],
      eventClass = t[2];
    if (!!event) {
      var registered = (this._registeredEvents[event] = this._registeredEvents[event] || {
        __default: []
      });
      (registered[eventClass || "__default"] = registered[eventClass || "__default"] || []).push(callback);
      this.addEventListener(event, callback);
    }
    return this;
  };

  /**
   *
   * @param {String} type
   * @param {Function} callback
   */
  Element.prototype.off = function(type) {
    this._registeredEvents = this._registeredEvents || {};
    var t = classedEventRE.exec(type || "") || [],
      event = t[1],
      eventClass = t[2];
    if (!!event) {
      var registered = this._registeredEvents[event];
      if (!!eventClass) {
        if (!!registered && !!registered[eventClass]) {
          while (registered[eventClass].length) {
            this.removeEventListener(event, registered[eventClass].pop());
          }
        }
      } else {
        var keys = Object.keys(registered);
        for (var i = 0; i < keys.length; i++) {
          while (registered[keys[i]].length) {
            this.removeEventListener(event, registered[keys[i]].pop());
          }
        }
      }
    }
    return this;
  };

  /**
   *
   * @param {String=} bufferedText
   * @param {Function=} callback
   */
  Element.prototype.domFocus = function(bufferedText, callback) {
    if (!callback && bufferedText instanceof Function) {
      callback = bufferedText;
      bufferedText = null;
    }
    var onCallback = function() {
      this.removeEventListener('focus', onCallback);
      if (!!bufferedText && bufferedText.length !== 0) {
        var selectionStart = this.selectionStart;
        var selectionEnd = this.selectionEnd;
        var value = this.value;
        value = value.substr(0, selectionStart) + bufferedText + value.substr(selectionEnd);
        this.value = value;
        this.setCursorPosition(selectionStart + bufferedText.length);
      }
      if (!!callback) {
        callback();
      }
    }.bind(this);
    this.addEventListener('focus', onCallback);
    this.focus();
  };

  Element.prototype.hasParentOfType = function(nodeName) {
    var el = this;
    while (el.parentNode !== null) {
      el = el.parentNode;
      if (el.nodeName === nodeName) {
        return true;
      }
    }
    return false;
  };

  Element.prototype.setCursorPosition = function(pos, pos2) {
    if (!pos2 || pos2 === 0) {
      pos2 = pos;
    }
    window.requestAnimationFrame(function() {
      try {
        if (this !== document.activeElement) {
          pos = pos2 = 0;
        }
        if (!this.hasParentOfType("#document-fragment")) {
          this.setSelectionRange(pos, pos2);
        }
      } catch (e) {
        console.log("setcursorpos", e);
      }
    }.bind(this));
  };

  /**
   *
   * @param {Element} element
   */
  Element.prototype.prependChild = function(element) {
    this.insertBefore(element, this.children[0]);
  };

  /**
   *
   * @param {Element} element
   */
  Element.prototype.replaceWith = function(element) {
    this.parentNode.insertBefore(element, this);
    this.remove();
  };

  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  /**
   *
   * @param index
   * @param {Element} parentNode
   */
  Element.prototype.insertAt = function(index, parentNode) {
    if (index === 0 || !parentNode.children.length) {
      parentNode.prependChild(this);
    } else {
      var where = !!index && parentNode.children[index];
      if (!!where) {
        parentNode.insertBefore(this, where);
      } else {
        parentNode.appendChild(this);
      }
    }
  };

  /**
   *
   * @param {Element} refNode
   */
  Element.prototype.insertAfter = function(refNode) {
    if (refNode && refNode.parentNode) {
      refNode.parentNode.insertBefore(this, refNode.nextSibling);
    }
  };
  /**
   *
   * @param className
   * @returns {Element}
   */
  Element.prototype.parent = function(className) {
    var found = false,
      parent = this.parentNode;
    while (!found) {
      if (!parent) {
        found = true;
        break;
      }
      if (parent.nodeType === Node.ELEMENT_NODE && parent.hasClass(className)) {
        found = true;
        break;
      }
      parent = parent.parentNode;
    }
    return parent;
  };

  /**
   *
   * @param className
   * @returns {Element}
   */
  Element.prototype.child = function(className) {
    var children = this.children,
      index = 0,
      found = null;
    for (var i = 0; i < children.length; i++) {
      if (children[i].hasClass(className)) {
        found = children[i];
        break;
      }
    }
    return found;
  };

  /**
   *
   * @param {String} cssClass
   * @returns {boolean}
   */
  Element.prototype.hasClass = function(cssClass) {
    return this.classList.contains(cssClass);
  };

  /**
   *
   * @param {String} cssClass
   * @returns {Element}
   */
  Element.prototype.addClass = function(cssClass) {
    this.classList.add(cssClass);
    return this;
  };

  /**
   *
   * @param {String} cssClass
   * @param {Boolean=} switcher
   * @returns {Element}
   */
  Element.prototype.toggleClass = function(cssClass, switcher) {
    if (window.browserInfo.isIE) {
      if (!!switcher) {
        this.classList.add(cssClass);
      } else {
        this.classList.remove(cssClass);
      }
    } else {
      this.classList.toggle(cssClass, switcher);
    }
    return this;
  };

  /**
   *
   * @param {String} cssClass
   * @returns {Element}
   */
  Element.prototype.removeClass = function(cssClass) {
    this.classList.remove(cssClass);
    return this;
  };

})();
