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

modulum('MenuWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * Menu widget.
     * @class classes.MenuWidget
     * @extends classes.WidgetGroupBase
     */
    cls.MenuWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.MenuWidget.prototype */
      return {
        __name: "MenuWidget",

        /**
         * @type Element
         */
        _textElement: null,
        _image: null,
        _modalWidget: null,
        _menuType: null,

        constructor: function() {
          $super.constructor.call(this);
          this._textElement = this._element.querySelector("div.gbc_MenuWidgetText");
          // default orientation is vertical
          this._element.removeClass('gbc_MenuWidget_horizontal').addClass('gbc_MenuWidget_vertical');
        },

        setText: function(text) {
          this._textElement.textContent = text;
        },

        getText: function() {
          return this._textElement.textContent;
        },

        setImage: function(image) {
          if (!this._image) {
            this._image = cls.WidgetFactory.create("Image");
            this._element.querySelector(".gbc_MenuWidgetTitle").prependChild(this._image.getElement());
          }
          this._image.setSrc(image);
        },

        getImage: function() {
          if (this._image) {
            return this._image.getSrc();
          }
          return null;
        },
        /**
         * @param {string} title the tooltip text
         */
        setTitle: function(title) {
          this._element.setAttribute("title", title);
        },

        /**
         * @returns {string} the tooltip text
         */
        getTitle: function() {
          return this._element.getAttribute("title");
        },

        /**
         * @param {boolean} enabled true if the widget allows user interaction, false otherwise.
         */
        setEnabled: function(enabled) {
          $super.setEnabled.call(this, enabled);
        },

        /**
         * @param {string} orientation layout orientation. 'vertical' or 'horizontal'.
         */
        setOrientation: function(orientation) {
          if (this.getOrientation() !== orientation) {
            this._element.toggleClass('gbc_MenuWidget_horizontal', orientation !== "vertical");
            this._element.toggleClass('gbc_MenuWidget_vertical', orientation === "vertical");
          }
        },

        /**
         * @returns {string} the layout orientation. 'vertical' or 'horizontal'.
         */
        getOrientation: function() {
          if (this._element.hasClass('gbc_MenuWidget_vertical')) {
            return 'vertical';
          }
          return 'horizontal';
        },

        setHidden: function(hidden) {
          $super.setHidden.call(this, hidden);
          if (this._modalWidget) {
            this._modalWidget.hide();
          }
        },

        /**
         * Defines the menu to be displayed as a modal one
         */
        setAsModal: function(modalType) {
          this._menuType = modalType;
          if (modalType === "popup") {
            this._modalWidget = cls.WidgetFactory.create("ChoiceDropDown");
            this._modalWidget.autoSize = false;
            this._modalWidget.setParentWidget(this);
            this._modalWidget.getElement().addClass("menu");

            this.getElement().querySelector(".mt-button").addClass("menu");
            for (var i = 0; i < this.getChildren().length; i++) {
              var child = this.getChildren()[i];
              this._modalWidget.addChildWidget(child);
            }
            //Place it at the middle center of the screen if menu opens automatically
            this._modalWidget.x = context.WidgetService.cursorX || "CENTER";
            this._modalWidget.y = context.WidgetService.cursorY || "CENTER";

            this._modalWidget.on(context.constants.widgetEvents.close, function() {
              this.emit(context.constants.widgetEvents.close);
            }.bind(this));

            this._modalWidget.show(true, true);
          } else {
            if (!this._modalWidget) {
              this._modalWidget = cls.WidgetFactory.create("Modal");
              this.getParentWidget().getElement().appendChild(this._modalWidget.getElement());
            }
            this._modalWidget.setHeader(this.getText());
            this._modalWidget.setImage(this.getImage());
            this._modalWidget.setClosable(false);
            this._modalWidget.setContent(this.getTitle());
            this._modalWidget.setFooter(this.getElement());
            this.setOrientation("horizontal");
            this._element.addClass('gbc_ModalMenu');
            this._modalWidget.setStyle(".mt-dialog-content", {
              "white-space": "pre"
            });
            this._modalWidget.show();
          }
        },

        destroy: function() {
          if (this._modalWidget) {
            if (this._modalWidget.hide) {
              this._modalWidget.hide();
              this._modalWidget.destroy();
              this._modalWidget = null;
            }
          }
          $super.destroy.call(this);
        },

        /**
         * styles 4ST attributes
         * @param position
         */
        setActionPanelPosition: function(position) {
          if (!this._menuType) {
            var posClass = {
              left: ".gbc_WindowMenuContainerLeft",
              right: ".gbc_WindowMenuContainerRight",
              top: ".gbc_WindowMenuContainerTop",
              bottom: ".gbc_WindowMenuContainerBottom"
            };

            var windowMenuContainer = null;
            if (posClass[position]) {
              windowMenuContainer = this.getParentWidget().getElement().querySelector(posClass[position]);
              if (windowMenuContainer) {

                // Use this code to remove all child (windowMenuContainer.innerHTML = "" doesn't work on ie11) cf GBC-437
                while (windowMenuContainer.firstChild) {
                  windowMenuContainer.removeChild(windowMenuContainer.firstChild);
                }
                windowMenuContainer.appendChild(this._element);
                windowMenuContainer.removeClass("hidden");
              }
            } else {
              this._element.classList.add("hidden");
            }
          }
        },

        /**
         * Defines text alignement in buttons on ActionPanels
         * @param align
         */
        setActionPanelButtonTextAlign: function(align) {
          this.$(".gbc_ButtonWidget > div")[0].addClass("content-" + align);
        },

        setActionPanelButtonTextHidden: function(hide) {
          this.$(".gbc_ButtonWidget > div")[0].toggleClass("text-hidden", !!hide);
        },

        hasFocus: function() {
          return true;
        }

      };
    });
    cls.WidgetFactory.register('Menu', cls.MenuWidget);
    cls.WidgetFactory.register('Dialog', cls.MenuWidget);
  });
