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

modulum('PictureVMBehavior', ['BehaviorBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.PictureVMBehavior
     * @extends classes.BehaviorBase
     */
    cls.PictureVMBehavior = context.oo.Class(cls.BehaviorBase, function($super) {
      /** @lends classes.PictureVMBehavior.prototype */
      return {
        __name: "PictureVMBehavior",
        /** @type {classes.NodeBase} */
        _pictureNode: null,
        _groups: null,
        _mask: "",
        /**
         * @constructs {classes.PictureVMBehavior}
         * @param {classes.ControllerBase} controller
         * @param {classes.NodeBase} pictureAttributeNode
         */
        constructor: function(controller, pictureAttributeNode) {
          $super.constructor.call(this, controller);
          this._pictureNode = pictureAttributeNode;
        },

        /**
         *
         */
        _apply: function() {
          var widget = this._controller.getWidget();
          if (widget && widget.getInput) {
            if (this._pictureNode && this._pictureNode.isAttributesSetByVM('picture')) {
              /* 1. Analyse picture and create rule (group) for each character of the mask */
              this._mask = this._pictureNode.attribute('picture');
              this._groups = [];

              for (var i = 0; i < this._mask.length; i++) {
                this._createGroup(this._mask[i]);
              }

              /* 2. Call the widget custom Picture implementation if defined */
              if (widget.setPictureMask) {
                widget.setPictureMask(this._mask);
              }

              /* 3. Bind on all managed keyboard events */

              // Catch keypress event to update value if permitted by picture
              var input = widget.getInput();
              input.off('keypress.PictureVMBehavior');
              input.on('keypress.PictureVMBehavior', function(event) {
                if (event.which <= 0) // arrows key (for firefox)
                {
                  return true;
                }

                // Get cursor positions
                var start = input.selectionStart;

                // Validate current pressed key
                var currentGroup = this._groups[start];
                if (currentGroup && currentGroup.isValid) {
                  var char = String.fromCharCode(event.which);
                  var isValid = currentGroup.isValid(char);
                  if (isValid) { // 2.3 Place cursor to new permitted position
                    var value = input.value;
                    input.value = (value.substr(0, start) + char + value.substr(start + 1));
                    var cursor = this._getNextCursor(value, start);
                    input.setCursorPosition(cursor.start, cursor.end);
                  }
                }
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                //return false;
              }.bind(this));

              // Catch paste event to update value if it's respecting picture format
              input.off('paste.PictureVMBehavior');
              input.on('paste.PictureVMBehavior', function(e) { // paste
                var pastedText = null;
                // Get pasted value
                if (window.clipboardData && window.clipboardData.getData) { // IE
                  pastedText = window.clipboardData.getData('Text');
                } else if (e.clipboardData && e.clipboardData.getData) {
                  pastedText = e.clipboardData.getData('text/plain');
                }

                // Build new value till no conflict is met. when one conflict is met, take mask value for all remaining length.
                var newValue = "";
                var lastValidPosition = null;
                var j = 0;
                for (var i = 0; i < this._groups.length; i++) {
                  var group = this._groups[i];
                  if (!group.isEditable) { // separator are kept intact --> copy them into new value
                    var separator = this._mask[i];
                    newValue += separator;
                    if (separator === pastedText[j]) { // if current pasted char == current group seperator, we will not analyse it afterward
                      j++;
                    }
                  } else { // current group is editable, check if current pasted char is valid
                    var char = pastedText[j];
                    j++;
                    if (lastValidPosition === null && group.isValid && group.isValid(char)) {
                      // if previously no conflict met and current char is valid, we add it to new value
                      newValue += char;
                    } else { // char is not valid, take mask value (whitespace since it's not a separator)
                      if (lastValidPosition === null) { // save last valid position, to set cursor on it
                        lastValidPosition = i;
                      }
                      newValue += ' ';
                    }
                  }
                }

                // Set input new value
                input.value = newValue;
                if (lastValidPosition === null) {
                  lastValidPosition = newValue.length;
                }
                var end = lastValidPosition;
                if (lastValidPosition < newValue.length) {
                  end++;
                }
                input.setCursorPosition(lastValidPosition, end);
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
              }.bind(this));

              // Catch backspace event to move cursor according to separators and replace previous value by whitespace
              context.keyboard(input).bind(['backspace'], function() {
                var start = input.selectionStart;
                var cursor = this._getPreviousCursor(start);
                if (cursor) {
                  var value = input.value;
                  input.value = (value.substr(0, cursor.start) + ' ' + value.substr(cursor.start + 1));
                  input.setCursorPosition(cursor.start, cursor.start + 1);
                }
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
              }.bind(this));

              // Catch delete event to replace next character by whitespace if it's not a separator
              context.keyboard(input).bind(['del'], function() {
                var start = input.selectionStart;
                var value = input.value;
                if (start < value.length) {
                  input.value = (value.substr(0, start) + ' ' + value.substr(start + 1));
                  var cursor = this._getNextCursor(value, start);
                  input.setCursorPosition(cursor.start, cursor.end);
                }
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
              }.bind(this));

            }
          } else {
            this._failed("Could not apply behavior");
          }
        },

        _getPreviousCursor: function(ind) {
          if (ind === 0) {
            return null;
          }
          var start = ind;
          var jump = false;
          while (start > 0 && !this._groups[start - 1].isEditable) {
            jump = true;
            start--;
          }
          return {
            start: start - 1,
            jump: jump
          };
        },

        _getNextCursor: function(value, ind) {
          var start = ind + 1;
          var jump = false;
          while (this._groups.length > start && !this._groups[start].isEditable) {
            jump = true;
            start++;
          }
          var end = start;
          if (start < value.length) {
            end = start + 1;
          }
          return {
            start: start,
            end: end,
            jump: jump
          };
        },

        _getWatchedAttributes: function() {
          return [{
            node: this._pictureNode,
            attribute: 'picture'
          }];
        },

        _createGroup: function(type) {
          var group = {};
          switch (type) {
            case 'A': // Alpha numeric
              group.isEditable = true;
              group.isValid = cls.KeyboardHelper.isLetter;
              break;
            case '#': // Numeric only
              group.isEditable = true;
              group.isValid = cls.KeyboardHelper.isNumeric;
              break;
            case 'X': // All
              group.isEditable = true;
              group.isValid = function() {
                return true;
              };
              break;
            default: // Mask separator
              group.isEditable = false;
              group.isValid = null;
          }
          this._groups.push(group);
        },

        /**
         *
         */
        destroy: function() {
          this._pictureNode = null;
          $super.destroy.call(this);
        }
      };
    });
  });
