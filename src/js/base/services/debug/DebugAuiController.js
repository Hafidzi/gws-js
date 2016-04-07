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

modulum('DebugAuiController', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {

    /**
     * @class classes.DebugAuiController
     */
    cls.DebugAuiController = context.oo.Class(function() {
      /** @lends classes.DebugAuiController.prototype */
      return {
        __name: "DebugAuiController",
        $static: {
          defaultTreeViewItemTemplate: {
            color: "#000000",
            collapsed: false
          }
        },
        _treeWidget: null,
        /**
         * @type classes.NodeBase
         */
        _lastRootNode: null,
        constructor: function() {
          this._treeWidget = cls.WidgetFactory.create("MonitorDebugTree");
        },
        getWidget: function() {
          return this._treeWidget;
        },
        _createNodeInfo: function(id) {
          var info = cls.WidgetFactory.create("MonitorDebugNodeInfo");
          this._displayProperties(info.getPropertiesContainer(), id);
          return info.getElement();
        },
        _createLayoutInfo: function(id) {
          var info = cls.WidgetFactory.create("MonitorDebugLayoutInfo");
          this._displayLayout(info, id);
          return info.getElement();
        },

        _createSub: function(node) {
          var widget = cls.WidgetFactory.create("MonitorDebugTreeItem");
          widget.setLabel(node._tag + (node.attribute("name") ? (' (' + node.attribute("name") + ')') : ""));
          widget.setIdRef(node._id);
          widget.setIconColor((context.constants.debugInfo.auiTreeNodeInfo[node._tag] || cls.DebugAuiController.defaultTreeViewItemTemplate)
            .color);
          widget.setCollapsed((context.constants.debugInfo.auiTreeNodeInfo[node._tag] || cls.DebugAuiController.defaultTreeViewItemTemplate)
            .collapsed);
          widget.on(gbc.constants.widgetEvents.click, function() {
            this._treeWidget.setNodeDebugContent(this._createNodeInfo(node._id));
            this._treeWidget.setLayoutInfoContent(this._createLayoutInfo(node._id));
          }.bind(this));
          return widget;
        },
        refresh: function(node) {
          this._lastRootNode = node;
          var subs = function(w, children) {
            for (var i = 0; i < children.length; i++) {
              var widget = this._createSub(children[i]);
              w.addChildWidget(widget);
              subs(widget, children[i].getChildren());
            }
          }.bind(this);
          var rootWidget = this._createSub(node);
          subs(rootWidget, node.getChildren());

          this._treeWidget.empty();
          this._treeWidget.addChildWidget(rootWidget);

        },
        _displayLayout: function(widget, refId) {
          var app = this._lastRootNode.getApplication();
          var omNode = app.getNode(refId);
          if (omNode) {
            var w = omNode.getController() && omNode.getController().getWidget();
            if (w) {
              var layoutInfo = w.getLayoutInformation();
              widget.setLayoutEngineName(w.getLayoutEngine() && w.getLayoutEngine().__name);

              widget.setPosX(layoutInfo.getGridX());
              widget.setPosY(layoutInfo.getGridY());
              widget.setGridWidth(layoutInfo.getGridWidth());
              widget.setGridHeight(layoutInfo.getGridHeight());
              widget.setWidth(layoutInfo.getPreferred().getWidth());
              widget.setHeight(layoutInfo.getPreferred().getHeight());
              widget.setMeasuredHasSize(layoutInfo.getMeasured().hasSize());
              widget.setMeasuredWidth(layoutInfo.getMeasured().getWidth());
              widget.setMeasuredHeight(layoutInfo.getMeasured().getHeight());
              widget.setMinimalHasSize(layoutInfo.getMinimal().hasSize());
              widget.setMinimalWidth(layoutInfo.getMinimal().getWidth());
              widget.setMinimalHeight(layoutInfo.getMinimal().getHeight());
              widget.setMaximalHasSize(layoutInfo.getMaximal().hasSize());
              widget.setMaximalWidth(layoutInfo.getMaximal().getWidth());
              widget.setMaximalHeight(layoutInfo.getMaximal().getHeight());
              widget.setAvailableHasSize(layoutInfo.getAvailable().hasSize());
              widget.setAvailableWidth(layoutInfo.getAvailable().getWidth());
              widget.setAvailableHeight(layoutInfo.getAvailable().getHeight());
              widget.setAllocatedHasSize(layoutInfo.getAllocated().hasSize());
              widget.setAllocatedWidth(layoutInfo.getAllocated().getWidth());
              widget.setAllocatedHeight(layoutInfo.getAllocated().getHeight());
              widget.setDecoratingHasSize(layoutInfo.getDecorating().hasSize());
              widget.setDecoratingWidth(layoutInfo.getDecorating().getWidth());
              widget.setDecoratingHeight(layoutInfo.getDecorating().getHeight());
              widget.setStretchX(layoutInfo.getStretched().getX(true));
              widget.setStretchY(layoutInfo.getStretched().getY(true));
              widget.setChildrenStretchX(layoutInfo.isChildrenXStretched());
              widget.setChildrenStretchY(layoutInfo.isChildrenYStretched());
            }
          }
        },
        _displayProperties: function(propertyContainer, refId) {
          var app = this._lastRootNode.getApplication();
          var omNode = app.getNode(refId);
          if (omNode) {
            var values = {};
            var categories = {};
            context.constants.nodeAttributes[omNode._tag].forEach(function(property) {
              values[property] = null;
              var cat = categories[context.constants.debugInfo.attributeCategory[property]] || [];
              cat.push(property);
              categories[context.constants.debugInfo.attributeCategory[property]] = cat.sort();
            });
            Object.keys(omNode._attributes).forEach(function(key) {
              values[key] = omNode._attributes[key];
            });

            var cats = [];
            Object.keys(categories).sort().forEach(function(c) {
              cats.push({
                name: c,
                properties: categories[c].map(function(p) {
                  return {
                    key: p,
                    value: values[p],
                    underscored: ("" + values[p]).replace(new RegExp("\\s", "g"), "_"),
                    default: cls.NodeHelper.getAttributeDefaultValue(omNode.tag, p),
                    notDefault: !!omNode._attributesSetByVM[p]
                  };
                })
              });
            });
            $(context.TemplateService.renderAs("MonitorDebugNodeInfoItems", cats)).appendTo(propertyContainer);
            /*if (omNode.getLayout) {
              propertyContainer.parent().parent().find(".extended").empty()
                .append($(context.$tmpl.renderAs("auiTreeViewGridInfo", omNode.getLayout().asContainer())))
                .append($("<hr/>"))
                .append($(context.$tmpl.renderAs("auiTreeViewExtendedProperties", {
                  layoutData: omNode.getLayout().getInfo().getData(),
                  fromController: omNode.getLayout().getInfo().getControllerInfo(),
                  xstretch: omNode.getLayout().getInfo().isXStretched(),
                  ystretch: omNode.getLayout().getInfo().isYStretched(),
                  childrenXStretch: omNode.getLayout().getInfo().childrenXStretch,
                  childrenYStretch: omNode.getLayout().getInfo().childrenYStretch
                })));
            }*/
          }
        }
      };
    });
  });
