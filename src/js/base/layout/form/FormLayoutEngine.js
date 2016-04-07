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

modulum('FormLayoutEngine', ['LayoutEngineBase'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.FormLayoutEngine
     * @extends classes.LayoutEngineBase
     */
    cls.FormLayoutEngine = context.oo.Class(cls.LayoutEngineBase, function($super) {
      /** @lends classes.FormLayoutEngine.prototype */
      return {
        __name: "FormLayoutEngine",
        measure: function() {
          var layoutInfo = this._getLayoutInfo();
          var element = this._widget.getElement();

          var isInModal = !!this._widget.getParentWidget().isModal;

          if (!isInModal) {
            layoutInfo.setMeasured(element.clientWidth - window.scrollBarSize, element.clientHeight - window.scrollBarSize);
          }
          var childInfo = this._getLayoutInfo(this._widget.getChildren()[0]);
          if (childInfo) {
            var measured = layoutInfo.getMeasured();
            if (!isInModal) {
              childInfo.setAvailable(measured.getWidth(), measured.getHeight(), true);
            }
          }
        },
        ajust: function() {
          var isInModal = !!this._widget.getParentWidget().isModal;

          if (isInModal) {
            var childInfo = this._getLayoutInfo(this._widget.getChildren()[0]);
            var measured = childInfo.getMeasured();
            childInfo.setAvailable(measured.getWidth(), measured.getHeight(), true);
          }
        },
        apply: function() {
          var isInModal = !!this._widget.getParentWidget().isModal;

          if (isInModal) {
            var childInfo = this._getLayoutInfo(this._widget.getChildren()[0]);
            var measured = childInfo.getAllocated();
            var style = {};
            style[".gbc_ModalWidget #w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
              width: Number.discrete(measured.getWidth()) + "px !important",
              height: Number.discrete(measured.getHeight()) + "px !important"
            };
            styler.appendStyleSheet(style, "formLayout_" + this._widget.getUniqueIdentifier());
          }
        },
        notify: function() {
          $super.notify.call(this);
          window.requestAnimationFrame(this._onNotified.bind(this));
        },
        _onNotified: function() {
          var widget = this._widget;
          if (!!widget) {
            var isInModal = !!this._widget.getParentWidget().isModal;
            if (isInModal) {
              var modal = this._widget.getElement().parent("gbc_ModalWidget"),
                modalpane = modal.child("mt-dialog-pane");
              var deltaWidth = modalpane.offsetWidth - modal.offsetWidth;
              var deltaHeight = modalpane.offsetHeight - modal.offsetHeight;
              widget.getLayoutInformation().setMeasured(
                widget.getElement().clientWidth - (deltaWidth > 0 ? deltaWidth : 0),
                widget.getElement().clientHeight - (deltaHeight > 0 ? deltaHeight : 0)
              );
              var _measured = widget.getLayoutInformation().getMeasured();
              var style = {};
              style[".gbc_ModalWidget #w_" + this._widget.getUniqueIdentifier() + ".g_measured"] = {
                width: _measured.getWidth() + "px !important",
                height: _measured.getHeight() + "px !important"
              };
              styler.appendStyleSheet(style, "formLayout_" + this._widget.getUniqueIdentifier());

            }
            var element = widget.getElement(),
              measured = widget.getLayoutInformation().getMeasured(),
              childAllocated = widget.getChildren()[0].getLayoutInformation().getAllocated(),
              dWidth = measured.getWidth() - childAllocated.getWidth(),
              dHeight = measured.getHeight() - childAllocated.getHeight();

            element.toggleClass("overflownX", dWidth < -0.9).toggleClass("overflownY", dHeight < -0.9);
          }
        }
      };
    });
  });
