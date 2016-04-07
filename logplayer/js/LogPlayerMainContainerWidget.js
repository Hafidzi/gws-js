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

modulum('LogPlayerMainContainerWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.LogPlayerMainContainerWidget
     * @extends classes.WidgetGroupBase
     */
    cls.LogPlayerMainContainerWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.LogPlayerMainContainerWidget.prototype */
      return {
        __name: "LogPlayerMainContainerWidget",

        _fileInput: null,
        _delayInput: null,
        _resetButton: null,
        _nextStepButton: null,
        _playAllButton: null,
        _console: null,
        _log: null,
        _currentLogLine: 0,
        _numberOfDvmOrdersToProcess: 0,
        _processedDvmOrders: 0,
        _apps: {},

        constructor: function() {
          $super.constructor.call(this);

          window._logplayer = this;

          var root = this.getElement();

          this._fileInput = root.querySelector(".logplayer-fileinput");
          this._delayInput = root.querySelector(".logplayer-delay");
          this._resetButton = root.querySelector(".logplayer-reset");
          this._nextStepButton = root.querySelector(".logplayer-step");
          this._playAllButton = root.querySelector(".logplayer-play");
          this._console = root.querySelector(".logplayer-console");

          this._delayInput.value = 500;

          this._fileInput.addEventListener('change', this.loadFile.bind(this));
          this._resetButton.addEventListener('click', this.reset.bind(this));
          this._nextStepButton.addEventListener('click', this.nextStep.bind(this));
          this._playAllButton.addEventListener('click', this.play.bind(this));

          this.setButtonEnabled(this._resetButton, false);
          this.setButtonEnabled(this._nextStepButton, false);
          this.setButtonEnabled(this._playAllButton, false);
        },

        loadFile: function(event) {
          this._nextStepButton.removeAttribute('disabled');
          this._playAllButton.removeAttribute('disabled');
          this._log = null;
          this.reset();

          if (event.target.files.length > 0) {
            var reader = new FileReader();
            reader.onload = function(fEvent) {
              var content = fEvent.target.result;
              content = content.split('\n').map(function(line) { return line.trim(); });
              if (content.length > 0) {
                var firstLine = content[0];
                if (firstLine === 'LOGVERSION=2') {
                  this.parseGdcLog(content);
                } else if (firstLine.substr(0, 5) === 'om 0 ') {
                  this.parseFglLog(content);
                } else if (firstLine === '#Version: 1.0') {
                  this.parseUaproxyLog(content);
                }
                this.setButtonEnabled(this._resetButton, true);
                this.setButtonEnabled(this._nextStepButton, true);
                this.setButtonEnabled(this._playAllButton, true);
              }
            }.bind(this);
            reader.readAsText(event.target.files[0]);
          }
        },

        reset: function() {
          this.setButtonEnabled(this._resetButton, true);
          this.setButtonEnabled(this._nextStepButton, true);
          this.setButtonEnabled(this._playAllButton, true);

          this._currentLogLine = 0;
          this._numberOfDvmOrdersToProcess = 0;
          this._processedDvmOrders = 0;
          this._apps = {};
          $(this._console).empty();
        },

        parseGdcLog: function(log) {
          this._log = [];
          for (var i = 0; i < log.length; ++i) {
            if (i !== 0) {
              var line = log[i];
              if (line.length > 0) {
                var appEnd = line.indexOf(':');
                var senderEnd = line.indexOf(':', appEnd + 1);
                var delayEnd = line.indexOf(':', senderEnd + 1);

                var entry = {};
                entry.app = line.substring(0, appEnd);
                entry.sender = line.substring(appEnd + 1, senderEnd);
                entry.delay = line.substring(senderEnd + 1, delayEnd);
                entry.content = line.substring(delayEnd + 1);

                this._log.push(entry);
              }
            }
          }
        },

        parseFglLog: function(log) {
          this._log = [];
          for (var i = 0; i < log.length; ++i) {
            var line = log[i];
            if (line.length > 0) {
              var entry = {};
              entry.app = "0";
              entry.delay = 1000;
              if (line[0] === '#'){
                if (line.substr(0, 7) === '#event ') {
                  entry.sender = "FE";
                } else {
                  entry.sender = "COMMENT";
                }
                entry.content = line.substring(1);
              } else {
                entry.sender = "DVM";
                entry.content = line;
              }
              this._log.push(entry);
            }
          }
        },

        parseUaproxyLog: function(log) {
          this._log = [];
          var fieldsCount = null;
          var relativeTimeFieldIndex = null;
          var contextsFieldIndex = null;
          var eventTypeFieldIndex = null;
          var eventParamsFieldIndex = null;
          var timeSinceLastDvmOrder = 0;

          for (var i = 0; i < log.length; ++i) {
            var line = log[i];
            if (line.length !== 0) {
              if (line[0] === '#') {
                if (line.substr(0, 9) === '#Fields: ') {
                  var fields = line.substr(9).split(' ');
                  fieldsCount = fields.length;
                  relativeTimeFieldIndex = fields.indexOf('relative-time');
                  contextsFieldIndex = fields.indexOf('contexts');
                  eventTypeFieldIndex = fields.indexOf('event-type');
                  eventParamsFieldIndex = fields.indexOf('event-params');
                  if (relativeTimeFieldIndex === -1 || contextsFieldIndex === -1 || eventTypeFieldIndex === -1 || eventParamsFieldIndex === -1) {
                    this.addLog(" ", '<b>Log fields missing. Enable "ALL DEBUG" categories</b>');
                    return;
                  }
                }
              } else {
                var sectionStart = -1;
                var sections = [];
                for (var j = 0; j < line.length; ++j) {
                  var c = line[j];
                  if (c === ' ') {
                    sections.push(line.substring(sectionStart + 1, j));
                    sectionStart = j;
                  } else if (c === '"') {
                    j = line.indexOf('"', j + 1);
                  }
                  if (sections.length === fieldsCount - 1) {
                    sections.push(line.substr(j + 1));
                    break;
                  }
                }
                timeSinceLastDvmOrder += parseFloat(sections[relativeTimeFieldIndex]);
                var contexts = sections[contextsFieldIndex];
                var eventType = sections[eventTypeFieldIndex];
                var eventParams = sections[eventParamsFieldIndex];
                var vmIdIndex = contexts.indexOf('VM=');
                var vmId = null;
                if (vmIdIndex !== -1) {
                  var semiColonIndex = contexts.indexOf(';', vmIdIndex);
                  if (semiColonIndex === -1) {
                    semiColonIndex = undefined;
                  }
                  vmId = contexts.substring(vmIdIndex + 3, semiColonIndex);
                }
                if (vmId !== null) {
                  if (eventType === '"Receiving VM"' || eventType === '"Sending VM"') {
                    var sender = eventType === '"Sending VM"' ? "FE" : "DVM";
                    var orders = eventParams;
                    while (orders.length > 0) {
                      var crIndex = orders.search(/[^\\]\\n/);
                      crIndex = crIndex === -1 ? orders.length : crIndex + 1;
                      var order = this.detachString(orders.substring(0, crIndex));
                      order = order.replace(/\\\\n/g, '\\n');
                      order = order.replace(/\\\\"/g, '\\"');
                      if (order !== '-') { // '-' marks the DVM deconection
                        var entry = {};
                        entry.app = this.detachString(vmId);
                        entry.sender = sender;
                        entry.content = order;
                        entry.delay = sender === 'DVM' ? Math.round(timeSinceLastDvmOrder * 1000) : 0;
                        timeSinceLastDvmOrder = 0;
                        this._log.push(entry);
                      }
                      orders = orders.substring(crIndex + 2);
                    }
                  }
                }
              }
            }
          }
        },

        nextStep: function() {
          if (this._log) {
            this._processedDvmOrders = 0;
            this._numberOfDvmOrdersToProcess = 1;
            this.run();
          }
        },

        play: function() {
          if (this._log) {
            this._processedDvmOrders = 0;
            this._numberOfDvmOrdersToProcess = this._log.length;
            this.run();
          }
        },

        run: function() {
          this.setButtonEnabled(this._resetButton, false);
          this.setButtonEnabled(this._nextStepButton, false);
          this.setButtonEnabled(this._playAllButton, false);

          while (this._currentLogLine < this._log.length) {
            var entry = this._log[this._currentLogLine];
            ++this._currentLogLine;
            this.addLog(entry.app + ':' + entry.sender, entry.content);
            if (entry.sender === 'DVM' && entry.content.substr(0, 5) !== 'meta ') {
              ++this._processedDvmOrders;
              var app = this._apps[entry.app];
              if (!app) {
                app = window.gbc.MockService.fakeApplication();
                app.setRunning(true);
                this._apps[entry.app] = app;
              }
              var callback = null;
              if (this._processedDvmOrders < this._numberOfDvmOrdersToProcess && this._currentLogLine < this._log.length) {
                callback = function() {
                  window.setTimeout(function() {
                    this.run();
                  }.bind(this), this._delayInput.value);
                }.bind(this);
              } else {
                callback = function() {
                  this.setButtonEnabled(this._resetButton, true);
                  this.setButtonEnabled(this._nextStepButton, true);
                  this.setButtonEnabled(this._playAllButton, true);
                }.bind(this);
              }
              app.dvm.manageAuiOrders(entry.content, callback);
              break;
            }
          }
          if (this._currentLogLine >= this._log.length) {
            this.setButtonEnabled(this._resetButton, true);
            this.setButtonEnabled(this._nextStepButton, false);
            this.setButtonEnabled(this._playAllButton, false);
            this.addLog(" ", '<b>== LOG FINISHED ==</b>');
          }
        },

        addLog: function(context, content) {
          var elt = $('<pre><span class="logplayer-console-context">' + context + '</span><span class="logplayer-console-content">' + content + '</span></pre>')[0];
          this._console.appendChild(elt);
          this._console.scrollTop = this._console.scrollHeight;
        },

        setButtonEnabled: function(button, enabled) {
          if (enabled) {
            button.removeClass("disabled");
            button.removeAttribute("disabled");
          } else {
            button.addClass("disabled");
            button.setAttribute("disabled", "disabled");
          }
        },

        detachString: function(s) {
          return (' ' + s).slice(1);
        }
      };
    });
    cls.WidgetFactory.register('MainContainer', cls.LogPlayerMainContainerWidget);
  });
