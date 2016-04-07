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

(function(window, Mousetrap) {
  var registeredElements = [];
  var registered = [];

  var actionDefaults = [];
  var actionPerShortCut = {};
  var fireAll = false;

  Mousetrap.prototype.destroy = function() {
    var index = registeredElements.indexOf(this.target);
    if (index >= 0) {
      registered.splice(index, 1);
      registeredElements.splice(index, 1);
    }
    this.reset();
  };

  var mousetrapped = function(targetElement) {
    targetElement = targetElement || document;

    var instance = null;
    var idx = registeredElements.indexOf(targetElement);
    if (idx < 0) {
      instance = new Mousetrap(targetElement);
      registeredElements.push(targetElement);
      registered.push(instance);
    } else {
      instance = registered[idx];
    }
    return instance;
  };

  mousetrapped.fireAll = function(fire) {
    fireAll = fire;
  };

  mousetrapped.registerActionDefault = function(actionDefault) {
    if (actionDefaults.indexOf(actionDefault) < 0) {
      actionDefault.getApplication().action.registerActionDefault(actionDefault);
      actionDefaults.push(actionDefault);
      var acceleratorName = (actionDefault.attribute("acceleratorName") || "").toLowerCase();
      if (acceleratorName) {
        acceleratorName = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName);
        (actionPerShortCut[acceleratorName] = actionPerShortCut[acceleratorName] || []).push(actionDefault);
      }
      var acceleratorName2 = (actionDefault.attribute("acceleratorName2") || "").toLowerCase();
      if (acceleratorName2) {
        acceleratorName2 = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName2);
        (actionPerShortCut[acceleratorName2] = actionPerShortCut[acceleratorName2] || []).push(actionDefault);
      }
      var acceleratorName3 = (actionDefault.attribute("acceleratorName3") || "").toLowerCase();
      if (acceleratorName3) {
        acceleratorName3 = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName3);
        (actionPerShortCut[acceleratorName3] = actionPerShortCut[acceleratorName3] || []).push(actionDefault);
      }
      var acceleratorName4 = (actionDefault.attribute("acceleratorName4") || "").toLowerCase();
      if (acceleratorName4) {
        acceleratorName4 = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName4);
        (actionPerShortCut[acceleratorName4] = actionPerShortCut[acceleratorName4] || []).push(actionDefault);
      }
    }
  };
  mousetrapped.unregisterActionDefault = function(actionDefault) {
    var index = actionDefaults.indexOf(actionDefault);
    if (index >= 0) {
      actionDefaults.splice(index, 1);
      var acceleratorName = (actionDefault.attribute("acceleratorName") || "").toLowerCase();
      if (acceleratorName) {
        acceleratorName = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName);
        actionPerShortCut[acceleratorName].remove(actionDefault);
        if (!actionPerShortCut[acceleratorName].length) {
          actionPerShortCut[acceleratorName] = null;
        }
      }
      var acceleratorName2 = (actionDefault.attribute("acceleratorName2") || "").toLowerCase();
      if (acceleratorName2) {
        acceleratorName2 = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName2);
        actionPerShortCut[acceleratorName2].remove(actionDefault);
        if (!actionPerShortCut[acceleratorName2].length) {
          actionPerShortCut[acceleratorName2] = null;
        }
      }
      var acceleratorName3 = (actionDefault.attribute("acceleratorName3") || "").toLowerCase();
      if (acceleratorName3) {
        acceleratorName3 = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName3);
        actionPerShortCut[acceleratorName3].remove(actionDefault);
        if (!actionPerShortCut[acceleratorName3].length) {
          actionPerShortCut[acceleratorName3] = null;
        }
      }
      var acceleratorName4 = (actionDefault.attribute("acceleratorName4") || "").toLowerCase();
      if (acceleratorName4) {
        acceleratorName4 = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(acceleratorName4);
        actionPerShortCut[acceleratorName4].remove(actionDefault);
        if (!actionPerShortCut[acceleratorName4].length) {
          actionPerShortCut[acceleratorName4] = null;
        }
      }
    }
  };
  var _hooks = [];
  mousetrapped.onKey = function(hook) {
    var remove = function() {
      _hooks.remove(hook);
    };
    _hooks.push(hook);
    return remove;
  };
  window.mousetrapped = mousetrapped;

  /**
   * the sequence currently being recorded
   *
   * @type {Array}
   */
  var _recordedSequence = [],

    /**
     * a callback to invoke after recording a sequence
     *
     * @type {Function|null}
     */
    _recordedSequenceCallback = null,

    /**
     * a list of all of the keys currently held down
     *
     * @type {Array}
     */
    _currentRecordedKeys = [],

    /**
     * temporary state where we remember if we've already captured a
     * character key in the current combo
     *
     * @type {boolean}
     */
    _recordedCharacterKey = false,

    /**
     * a handle for the timer of the current recording
     *
     * @type {null|number}
     */
    _recordTimer = null,

    /**
     * the original handleKey method to override when Mousetrap.record() is
     * called
     *
     * @type {Function}
     */
    _origHandleKey = Mousetrap.prototype.handleKey;

  /**
   * handles a character key event
   *
   * @param {string} character
   * @param {Array} modifiers
   * @param {Event} e
   * @returns void
   */
  function _handleKey(character, modifiers, e) {
    /* jshint validthis: true */
    if (["f3", "f5"].indexOf(character) >= 0 && actionPerShortCut[character]) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }

    if (!this.recording) {
      _origHandleKey.apply(this, [character, modifiers, e]);
      return;
    }

    var browserShortCut = ("" + (modifiers.length ? [modifiers.join('+'), character].join('+') : character));
    var vmShortCut = window.gbc.classes.ActionApplicationService.convertVMKeyToBrowserKey(browserShortCut);

    if (!fireAll && !actionPerShortCut[vmShortCut]) {
      return;
    }

    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();

    // remember this character if we're currently recording a sequence
    if (e.type === 'keydown') {
      if (character.length >= 1 && _recordedCharacterKey) {
        _recordCurrentCombo();
      }

      for (var i = 0; i < modifiers.length; ++i) {
        _recordKey(modifiers[i]);
      }
      _recordKey(character);

      if (character.length >= 1 && _recordedCharacterKey) {
        _recordCurrentCombo();
      }

      // once a key is released, all keys that were held down at the time
      // count as a keypress
    } else if (e.type === 'keyup' && _currentRecordedKeys.length > 0) {
      _recordCurrentCombo();
    }
  }

  /**
   * marks a character key as held down while recording a sequence
   *
   * @param {string} key
   * @returns void
   */
  function _recordKey(key) {
    var i;

    // one-off implementation of Array.indexOf, since IE6-9 don't support it
    for (i = 0; i < _currentRecordedKeys.length; ++i) {
      if (_currentRecordedKeys[i] === key) {
        return;
      }
    }

    _currentRecordedKeys.push(key);

    if (key.length >= 1) {
      _recordedCharacterKey = true;
    }
  }

  /**
   * marks whatever key combination that's been recorded so far as finished
   * and gets ready for the next combo
   *
   * @returns void
   */
  function _recordCurrentCombo() {
    _recordedSequence.push(_currentRecordedKeys);
    _currentRecordedKeys = [];
    _recordedCharacterKey = false;
    _restartRecordTimer();
  }

  /**
   * ensures each combo in a sequence is in a predictable order and formats
   * key combos to be '+'-delimited
   *
   * modifies the sequence in-place
   *
   * @param {Array} sequence
   * @returns void
   */
  function _normalizeSequence(sequence) {
    var i;

    var sortFn = function(x, y) {
      // modifier keys always come first, in alphabetical order
      if (x.length > 1 && y.length === 1) {
        return -1;
      } else if (x.length === 1 && y.length > 1) {
        return 1;
      }

      // character keys come next (list should contain no duplicates,
      // so no need for equality check)
      return x > y ? 1 : -1;
    };

    for (i = 0; i < sequence.length; ++i) {
      sequence[i].sort(sortFn);

      sequence[i] = sequence[i].join('+');
    }
  }

  /**
   * finishes the current recording, passes the recorded sequence to the stored
   * callback, and sets Mousetrap.handleKey back to its original function
   *
   * @returns void
   */
  function _finishRecording() {
    if (_recordedSequenceCallback) {
      _normalizeSequence(_recordedSequence);
      _recordedSequenceCallback(_recordedSequence);
    }

    // reset all recorded state
    _recordedSequence = [];
    _recordedSequenceCallback = null;
    _currentRecordedKeys = [];
  }

  /**
   * called to set a 1 second timeout on the current recording
   *
   * this is so after each key press in the sequence the recording will wait for
   * 1 more second before executing the callback
   *
   * @returns void
   */
  function _restartRecordTimer() {
    clearTimeout(_recordTimer);
    _recordTimer = setTimeout(_finishRecording, 1);
  }

  var cbfn = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    this.self.recording = false;
    this.callback.apply(this.self, [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
  };

  /**
   * records the next sequence and passes it to a callback once it's
   * completed
   *
   * @param {Function} callback
   * @returns void
   */
  Mousetrap.prototype.record = function(callback) {
    this.recording = true;
    _recordedSequenceCallback = cbfn.bind({
      self: this,
      callback: callback
    });
  };

  Mousetrap.prototype.handleKey = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    _handleKey.apply(this, [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]);
  };

  Mousetrap.init();
  var onSequence = function(sequence) {
    if (sequence.length) {
      for (var s = 0; s < sequence.length; s++) {
        for (var i = 0; i < _hooks.length; i++) {
          _hooks[i](sequence[s]);
        }
      }
    }
    window.requestAnimationFrame(function() {
      mousetrapped().record(onSequence);
    });
  };
  mousetrapped().record(onSequence);

})(window, Mousetrap);
