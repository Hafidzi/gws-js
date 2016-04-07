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

modulum('ChoiceDropDownWidget', ['DropDownWidget', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Choice DropDown widget.
     * @class classes.ChoiceDropDownWidget
     * @extends classes.DropDownWidget
     */
    cls.ChoiceDropDownWidget = context.oo.Class(cls.DropDownWidget, function($super) {
      /** @lends classes.ChoiceDropDownWidget.prototype */
      return {

        __name: "ChoiceDropDownWidget",
        __templateName: "DropDownWidget",
        autoSize: true,
        alignToLeft: true,

        _initContainerElement: function() {
          $super._initContainerElement.call(this);
          this.on(context.constants.widgetEvents.enter, function(event, sender, domEvent) {
            if (this.isVisible()) {
              var currentChildren = this.getCurrentChildren();
              this._onClick.call(this, event, currentChildren, domEvent);
            }
          }.bind(this));
          this.on(context.constants.widgetEvents.esc, function(event, sender, domEvent) {
            if (this.isVisible()) {
              domEvent.stopPropagation();
              this.show(false);
            }
          }.bind(this));
        },

        /**
         * Manage keyboard navigation over dropdown children.
         * Scroll to widget located at corresponding position
         * @param {Number} jump position requested over current position
         * @param {Boolean} if true, indicates navigation is going to previous items, otherwise to next items
         * @private
         */
        jumpTo: function(jump, up) {
          if (this.isVisible()) {
            var pos = 0;
            var childsLength = this.getChildren().length;
            if (up === false && jump === 0) {
              jump = childsLength;
            }
            if (jump !== 0 && jump !== childsLength - 1) {
              pos = this.getIndexOfChild(this.getCurrentChildren()) + jump;
              if (pos < 0) {
                pos = 0;
              } else if (pos >= childsLength - 1) {
                pos = childsLength - 1;
              }
            } else {
              pos = jump;
            }
            var current = this.setCurrentChildren(pos);
            if (current !== null) {
              this.scrollChildrenIntoView(current, up);
            }
          }
        },

        navigateTo: function(pos) {
          if (this.isVisible()) {
            var up = this.getIndexOfChild(this.getCurrentChildren()) > pos;
            var current = this.setCurrentChildren(pos);
            if (current !== null) {
              this.scrollChildrenIntoView(current, up);
            }
          }
        },

        /**
         *  Returns position of value in dropdown choices list
         * @param {*} value
         * @returns {number}
         */
        getValueIndex: function(value) {
          var children = this.getChildren();
          for (var i = 0; i < children.length; i++) {
            if (children[i].getValue() === value) {
              return i;
            }
          }
          return -1;
        },

        /**
         * On click handler raised when selecting an item in the dropdown :
         * Parent widget get value of clicked item and dropdown is closed.
         * @param event
         * @param sender
         * @param domEvent
         * @private
         */
        _onClick: function(event, sender, domEvent) {
          if (sender && sender.getValue) {
            var value = sender.getValue();
            if (this.getParentWidget().setValue) {
              this.getParentWidget().setValue(value);
              this.getParentWidget().emit(context.constants.widgetEvents.change, event, false);
            }
          }
          domEvent.stopPropagation();
          this.show(false);
          this.getParentWidget().emit(context.constants.widgetEvents.focus, event);
          if (sender && sender.ddOnClickCallback) {
            sender.ddOnClickCallback();
          }
        },

        /**
         * Add widget as child and bind onclick event on it
         * @param {Widget} widget
         * @param {Function} click callback
         */
        addChildWidget: function(widget, clickCallback, options) {
          $super.addChildWidget.call(this, widget, options);
          widget.ddOnClickCallback = clickCallback;
          widget.on(context.constants.widgetEvents.click, function(event, sender, domEvent) {
            this._onClick.call(this, event, widget, domEvent);
          }.bind(this));
        },

        /**
         * To call when an external widget wants to show/hide its dropdown.
         * @param {Boolean} visible
         * @param {Boolean} indicates if request is made by user or not. If not, dropdown won't be displayed.
         * @returns {Boolean} true if dropdown as been displayed.
         */
        show: function(visible, userClick) {
          var isDisplayed = $super.show.call(this, visible, userClick);
          if (isDisplayed === true) {
            if (this.getParentWidget().getValue) {
              var defaultValue = this.getParentWidget().getValue();
              this.setCurrentChildren(this.getValueIndex(defaultValue));
            }
          }
          return isDisplayed;
        }
      };
    });
    cls.WidgetFactory.register('ChoiceDropDown', cls.ChoiceDropDownWidget);
  });
