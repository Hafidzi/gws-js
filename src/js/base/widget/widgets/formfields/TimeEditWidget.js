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

modulum('TimeEditWidget', ['TextWidgetBase', 'DateTimeHelper', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * TimeEdit widget.
     * @class classes.TimeEditWidget
     * @extends classes.TextWidgetBase
     */
    cls.TimeEditWidget = context.oo.Class(cls.TextWidgetBase, function($super) {
      /** @lends classes.TimeEditWidget.prototype */
      return {
        __name: "TimeEditWidget",
        /**
         * @type Element
         */
        _inputElement: null,
        /**
         * @type {DateTimeHelper.timeFragment[]}
         */
        _groups: null,
        _useSeconds: true,
        __dataContentPlaceholderSelector: ".gbc_dataContentPlaceholder",

        /**
         * @type {string}
         */
        _lastValid: "00:00",

        /**
         * @type {number}
         */
        _currentGroup: 0,
        constructor: function() {
          $super.constructor.call(this);
          this.setFocusable(true);
        },

        _initLayout: function() {
          $super._initLayout.call(this);
          this._layoutEngine = new cls.LeafLayoutEngine(this);
        },

        _initElement: function() {
          $super._initElement.call(this);
          this._groups = [cls.DateTimeHelper.timeFragment(24), cls.DateTimeHelper.timeFragment(60)];
          this._inputElement = this._element.querySelector('div>input');
          this.setValue(this._lastValid);
          this._inputElement.on('click.TimeEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.click, event);
            this._updateCurrentGroup();
          }.bind(this));
          this._inputElement.on('keyup.TimeEditWidget', function(event) {
            var groupChanged = this._updateCurrentGroup();
            var groupComplete = true;
            if (this.getValue() !== this._lastValid) {
              groupComplete = this._updateGroups(this.getValue(), groupChanged);
              if (groupComplete) {
                this._updateSelection();
              }
            }
            if (groupChanged || groupComplete) {
              this.emit(context.constants.widgetEvents.change, event, true);
            }
          }.bind(this));
          this._inputElement.on('blur.TimeEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.blur, event);
          }.bind(this));
          this._inputElement.on('focus.InputTimeEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          }.bind(this));
          this._element.on('focus.TimeEditWidget', function(event) {
            this.emit(context.constants.widgetEvents.focus, event);
          }.bind(this));
          this._element.querySelector(".up").on('click', function(evt) {
            evt.preventDefault();
            this._increase();
            this.emit(context.constants.widgetEvents.change, evt, false);
          }.bind(this));
          this._element.querySelector(".down").on('click', function(evt) {
            evt.preventDefault();
            this._decrease();
            this.emit(context.constants.widgetEvents.change, evt, false);
          }.bind(this));
          context.keyboard(this._element).bind(['up'], function(evt) {
            this._increase();
            this.emit(context.constants.widgetEvents.change, evt, false);
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['down'], function(evt) {
            this._decrease();
            this.emit(context.constants.widgetEvents.change, evt, false);
            return false;
          }.bind(this));
          context.keyboard(this._element).bind([':'], function(evt) {
            this._moveGroup(1);
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['backspace'], function(evt) {
            if (this.getValue().charAt(this._inputElement.selectionEnd - 1) === ':') {
              return false;
            }
          }.bind(this));
          context.keyboard(this._element).bind(['mod+left'], function(evt) {
            this._moveGroup(-1);
            this._updateSelection();
            return false;
          }.bind(this));
          context.keyboard(this._element).bind(['mod+right'], function(evt) {
            this._moveGroup(1);
            this._updateSelection();
            return false;
          }.bind(this));
          context.keyboard(this._inputElement).bind(['home'], function(event) {
            event.stopPropagation();
            this.setCursors(0);
          }.bind(this));
          context.keyboard(this._inputElement).bind(['end'], function(event) {
            event.stopPropagation();
            var len = this.getValue().length;
            this.setCursors(len, len);
          }.bind(this));
        },

        /**
         * Increase the current group value
         * @private
         */
        _increase: function() {
          if (this._groups[this._currentGroup].increaseValue()) {
            if (this._currentGroup > 0 && this._groups[this._currentGroup - 1].increaseValue()) {
              if (this._currentGroup > 1) {
                this._groups[this._currentGroup - 2].increaseValue();
              }
            }
          }
          this._updateFromGroups();
          this._updateSelection();
        },

        /**
         * Decrease the current group value
         * @private
         */
        _decrease: function() {
          if (this._groups[this._currentGroup].decreaseValue()) {
            if (this._currentGroup > 0 && this._groups[this._currentGroup - 1].decreaseValue()) {
              if (this._currentGroup > 1) {
                this._groups[this._currentGroup - 2].decreaseValue();
              }
            }
          }
          this._updateFromGroups();
          this._updateSelection();
        },

        /**
         * Changes the current group
         * @param {number} where group index
         * @private
         */
        _moveGroup: function(where) {
          if (where < 0) {
            if (this._currentGroup !== 0) {
              this._currentGroup = this._currentGroup + where;
            }
          } else {
            if (this._currentGroup !== 2) {
              this._currentGroup = this._currentGroup + where;
            }
          }
        },

        /**
         * Updates the current group depending on the cursor position
         * @returns {boolean} true if the current group has changed, false otherwise
         * @private
         */
        _updateCurrentGroup: function() {
          var value = this.getValue(),
            firstColon = value.indexOf(":"),
            secondColon = value.lastIndexOf(":");
          var position = this._inputElement.selectionEnd;
          var newPosition = position <= firstColon ? 0 : (firstColon === secondColon || position <= secondColon ? 1 : 2);
          var oldPosition = this._currentGroup;
          this._currentGroup = newPosition;
          return newPosition !== oldPosition;
        },

        /**
         * @param {string} value
         * @param {boolean} force
         * @returns {boolean}
         * @private
         */
        _updateGroups: function(value, force) {
          var tokens = (value || "00:00:00").split(":");
          var complete = true;
          var length = Math.min(tokens.length, 3);
          for (var i = 0; i < length; i++) {
            if (!this._groups[i]) {
              this._groups.push(cls.DateTimeHelper.timeFragment(60));
            }
            complete = complete && this._groups[i].fromText(tokens[i], force);
          }
          if (complete || !!force) {
            this._updateFromGroups();
            this._lastValid = this.getValue();
          }
          return complete;
        },

        /**
         * Rebuilds the value from groups
         * @private
         */
        _updateFromGroups: function() {
          var value = "";
          for (var i = 0; i < this._groups.length; i++) {
            value += (i > 0 ? ":" : "") + this._groups[i].getText();
          }
          this.setValue(value);
        },

        /**
         * Updates the selection range
         * @private
         */
        _updateSelection: function() {
          var start = 0;
          switch (this._currentGroup) {
            case 2:
              start = 6;
              break;
            case 1:
              start = 3;
              break;
            default:
              break;
          }
          this._inputElement.setCursorPosition(start, start + 2);
        },

        /**
         * Return cursors position
         * @returns {Object} object with cursor & cursor2 positions
         */
        getCursors: function() {
          return {
            start: this._inputElement.selectionStart,
            end: this._inputElement.selectionEnd
          };
        },

        /** Place the cursor at the given position,
         * @param {Number} cursor  first cursor position
         * @param {Number} cursor2 second cursor position
         */
        setCursors: function(cursor, cursor2) {
          if (!cursor2 || cursor2 === -1) {
            this._inputElement.setCursorPosition();
          } else {
            this._inputElement.setCursorPosition(cursor, cursor2);
          }
        },

        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          this._inputElement.setAttribute("title", title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._inputElement.getAttribute("title");
        },

        showSeconds: function(sec) {
          this._useSeconds = sec;
        },

        /**
         * @param {string} value the value to display
         */
        setValue: function(value) {
          if (this.getValue() !== value) {
            this._inputElement.value = value;
            this._updateGroups(value);
          }
        },

        /**
         * @returns {string} the displayed value
         */
        getValue: function() {
          return this._inputElement.value;
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._inputElement.disabled = !enabled;
        },

        /**
         * Sets the focus to the widget and updates it with the buffered text
         * @param {string} bufferedText
         */
        setFocus: function(bufferedText) {
          this._inputElement.domFocus(bufferedText);
          $super.setFocus.call(this, bufferedText);
        }
      };
    });
    cls.WidgetFactory.register('TimeEdit', cls.TimeEditWidget);
  });
