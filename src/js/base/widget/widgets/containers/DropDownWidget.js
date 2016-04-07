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

modulum('DropDownWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * DropDown widget.
     * @class classes.DropDownWidget
     * @extends classes.WidgetGroupBase
     */
    cls.DropDownWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.DropDownWidget.prototype */
      return {
        __name: "DropDownWidget",
        /**
         * Indicate if a request is coming from user or only from VM.
         * Important to avoid dropdown display when going from display to input mode
         */
        _userClick: false,
        autoSize: false,
        alignToLeft: true,
        x: null,
        y: null,

        _initContainerElement: function() {
          $super._initContainerElement.call(this);
          this.on(context.constants.widgetEvents.close, function() {
            this.onClose();
          }.bind(this));
        },

        setParentWidget: function(widget) {
          $super.setParentWidget.call(this, widget);
          if (widget) {
            context.keyboard(widget.getElement()).bind(['tab'], function(event) {
              if (this.isVisible()) {
                //event.stopPropagation();
                this.show(false);
              }
            }.bind(this));
            context.keyboard(widget.getElement()).bind(['shift+tab'], function(event) {
              if (this.isVisible()) {
                //event.stopPropagation();
                this.show(false);
              }
            }.bind(this));
            context.keyboard(widget.getElement()).bind(['esc'], function(event) {
              if (this.isVisible()) {
                event.stopPropagation();
                this.show(false);
              }
            }.bind(this));
            context.keyboard(widget.getElement()).bind(['enter'], function(event) {
              if (this.isVisible()) {
                event.stopPropagation();
                this.show(false);
              }
            }.bind(this));
          }
        },

        _blurClick: function(event) {
          // if neither widget and dropdown container contains clicked element, we close dropdown
          if (this.getParentWidget() && this.getParentWidget().getElement() && !this.getParentWidget().getElement().contains(
              event.target) && !context.DropDownService.getCurrentContainer().getElement().contains(event.target)) {
            this.unbindBlur();
            this._show(false);
            //console.log(this.getParentWidget()._uuid + " dropdown blur");
            this.getParentWidget().emit(context.constants.widgetEvents.blur, event);
          }
        },

        unbindBlur: function() {
          document.body.off("click.DropDownWidget");
        },

        bindBlur: function() {
          document.body.off("click.DropDownWidget");
          document.body.on("click.DropDownWidget", this._blurClick.bind(this));
        },

        /**
         * Show/Hide dropdown and bind single live close event when clicking outside of dropdown
         * @param {Boolean} visible
         * @private
         */
        _show: function(visible) {
          //console.log("_show : " + visible +  " - " + this._uuid);
          if (visible) {
            this.bindBlur();
            this.onOpen();
          } else {
            this.onClose();
            this._userClick = false;
          }

          context.DropDownService.showDropDown(this.getParentWidget(), this, visible);
        },

        /**
         * Should only be called by DropDownService.
         */
        resetUserClick: function() {
          this._userClick = false;
        },

        /**
         * To call when an external widget wants to show/hide its dropdown.
         * @param {Boolean} visible
         * @param {Boolean} indicates if request is made by user or not. If not, dropdown won't be displayed.
         * @returns {Boolean} true if dropdown as been displayed.
         */
        show: function(visible, userClick) {
          var isDisplayed = false;
          var parent = this.getParentWidget();
          if (!visible) {
            if (!this.isVisible()) {
              return isDisplayed;
            }
            this._show(false);
          } else if (parent.isEnabled() && !this.isVisible()) {
            if (parent.hasFocus() === true) { /* Field receive VM focus */
              if (userClick === true) {
                this._userClick = true;
              }
              if (this._userClick === true) {
                isDisplayed = true;
                this._show(true);
              } else {
                /* When switching of field without clicking, new focused field doesn't have to open picker
                  Otherwise, it has to close previous picker because a new field has been focused.
                 */
                context.DropDownService.removeDropDowns();
              }
            } else {
              this._userClick = true;
              parent.emit(context.constants.widgetEvents.focus);
            }
          }
          return isDisplayed;
        },

        onOpen: function() {

        },

        onClose: function() {

        },

        /**
         * Toggle dropdown display
         * @returns {*|Boolean}
         */
        toggle: function() {
          return this.show(!this.isVisible(), true);
        },

        /**
         *
         * @returns {boolean}
         */
        isVisible: function() {
          return context.DropDownService.isDropDownVisible(this);
        },

        focus: function() {
          this._element.focus();
        },

        /**
         *
         * @param enabled
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
          this._show(false);
        },

        destroy: function() {
          //console.log("destroy : " + this._uuid);
          if (this.isVisible()) {
            this._show(false);
          }
          this.unbindBlur();

          if (this._parentWidget && this._parentWidget.removeChildWidget) {
            this._parentWidget.removeChildWidget(this);
          }
          this._parentWidget = null;
          $super.destroy.call(this);
        }
      };
    });
    cls.WidgetFactory.register('DropDown', cls.DropDownWidget);
  });
