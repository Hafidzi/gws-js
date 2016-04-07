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

modulum('BoxWidget', ['WidgetGroupBase', 'WidgetFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.BoxWidget
     * @extends classes.WidgetGroupBase
     */
    cls.BoxWidget = context.oo.Class(cls.WidgetGroupBase, function($super) {
      /** @lends classes.BoxWidget.prototype */
      return {
        __name: "BoxWidget",
        /** @lends classes.BoxWidget */
        $static: {
          splitterEvent: "splitter"
        },
        _hasSplitters: null,
        _splitters: null,

        /**
         * @constructs {classes.WidgetGroupBase}
         */
        constructor: function() {
          this._splitters = [];
          $super.constructor.call(this);
        },
        addChildWidget: function(widget, options) {
          if (!(widget instanceof cls.SplitterWidget)) {
            options = options || {
              position: ((this._children.length || -1) + 1) / 2
            };
            if (Object.isNumber(options.position)) {
              options.position = options.position * 2;
            }
            if (!!options.position) {
              var splitter = cls.WidgetFactory.create("Splitter");
              splitter.setSplitter(this._hasSplitters);
              this.addChildWidget(splitter, {
                position: options.position - 1
              });
              this._splitters.push(splitter);
            }
          }
          $super.addChildWidget.call(this, widget, options);
        },

        removeChildWidget: function(widget) {
          if (!(widget instanceof cls.SplitterWidget)) {
            var pos = this._children.indexOf(widget) - 1;
            if (pos > 0) {
              this.removeChildWidget(this._children[pos]);
            }
          } else {
            this._splitters.remove(widget);
          }
          $super.removeChildWidget.call(this, widget);
        },

        _addChildWidgetToDom: function(widget, position) {
          this.getLayoutEngine().registerChild(widget, position);
          var widgetHost = document.createElement('div');
          widgetHost.addClass('g_BoxElement');
          widget.getLayoutInformation().setHost(widgetHost);
          widgetHost.appendChild(widget._element);
          widgetHost.insertAt(position, this._containerElement);
        },
        _removeChildWidgetFromDom: function(widget) {
          this.getLayoutEngine().unregisterChild(widget);
          var info = widget.getLayoutInformation(),
            host = info && info.getHost();
          if (host && host.parentNode === this._containerElement) {
            widget._element.remove();
            host.remove();
            host = null;
          }
        },
        getIndexOfChild: function(widget) {
          if (!(widget instanceof cls.SplitterWidget)) {
            return this._children.indexOf(widget) / 2;
          } else {
            return this._children.indexOf(widget);
          }
        },
        setSplitter: function(hasSplitters) {
          if (this._hasSplitters !== hasSplitters) {
            this._hasSplitters = hasSplitters;
            for (var i = 0; i < this._splitters.length; i++) {
              this._splitters[i].setSplitter(this._hasSplitters);
            }
          }
        },
        getSplitInfo: function() {

        },
        updateSplitInfo: function() {
          this.emit(cls.BoxWidget.splitterEvent);
        }
      };
    });
    cls.WidgetFactory.register('Box', cls.BoxWidget);
  });
