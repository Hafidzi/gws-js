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
modulum('NodeBase', ['EventListener', 'ControllerBindings'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * Memory implementation of an AUI Node.
     *
     * Reflects the state of the AUI node in the DVM.
     *
     * @class classes.NodeBase
     * @extends classes.EventListener
     */
    cls.NodeBase = context.oo.Class(cls.EventListener, function($super) {
      /** @lends classes.NodeBase.prototype */
      return {
        /** @lends classes.NodeBase */
        $static: {
          attributeChangedEvent: "attributeChanged",
          nodeCreatedEvent: "nodeCreated",
          nodeRemovedEvent: "nodeRemoved",
          childrenCreatedEvent: "nodeChildrenCreated"
        },
        __name: "NodeBase",
        /** @type {classes.NodeBase} */
        _parent: null,
        /** @type {number} */
        _id: null,
        /** @type {string} */
        _uid: null,
        /** @type {classes.NodeBase[]} */
        _children: null,
        /** @protected
         *  @type {classes.ControllerBase}
         */
        _controller: null,
        /** @type classes.VMApplication */
        _application: null,
        /** @type {string} */
        _tag: null,
        /** @type {Object.<string, *>} */
        _attributes: null,
        /** @type {Object.<string, boolean>} */
        _attributesSetByVM: null,
        /** @type {Object} */
        _previousAttributes: null,
        /** @type {Object} */
        _stylesByPseudoSelectors: null,

        /**
         * Node object (AUI model)
         * @constructs {classes.NodeBase}
         * @param {classes.NodeBase} parent parent node
         * @param {string|nodeInfo} tag tag name (WINDOW, GROUP, MENU, etc...) or an object containing type, id, attributes
         * @param {number=} id id
         * @param {Object=} attributes attributes list
         * @param {classes.VMApplication} app application
         */
        constructor: function(parent, tag, id, attributes, app) {
          $super.constructor.call(this);

          if (!!tag && !!tag.attributes) {
            app = id;
            attributes = tag.attributes;
            id = tag.id;
            tag = tag.type;
          }
          this._parent = parent;
          this._id = id;
          this._application = app;
          this._children = [];
          this._tag = tag;
          this._uid = cls.NodeHelper.getUid(!!app && app.applicationHash || 0, id);

          this._attributes = {};
          this._attributesSetByVM = {};
          this._previousAttributes = {};
          // Set the default attributes
          var nodeAttributes = cls.NodeHelper.getDefaultAttributes(tag);
          for (var i = 0; i < nodeAttributes.length; i++) {
            cls.NodeHelper.setAttributeDefaultValue(this, nodeAttributes[i]);
          }
          // Set the attributes with VM info
          var attributesToSet = Object.keys(attributes);
          for (var a = 0; a < attributesToSet.length; a++) {
            var attributeName = attributesToSet[a];
            this._attributesSetByVM[attributeName] = true;
            var attributeValue = this._attributes[attributeName] = attributes[attributeName];

            this.emit(cls.NodeBase.attributeChangedEvent + attributeName, {
              node: this,
              attr: attributeName,
              old: null,
              new: attributeValue,
              changed: attributeValue !== null
            });
          }

          // Attaching the node to its parent children list
          if (parent !== null) {
            parent.addChildNode(this);
          }

          // Registering the node in the global hash
          if (this._application) {
            this._application.model.addNode(id, this);
          }
          var parents = this.getAncestors();
          for (var p = 0; p < parents.length; p++) {
            parents[p].emit(cls.NodeBase.nodeCreatedEvent, this);
          }

          this.updateApplicableStyles();
        },
        /**
         * Destroy a node (and remove all its references)
         */
        destroy: function() {
          // destroy children first
          while (this._children.length > 0) {
            this._children[this._children.length - 1].destroy();
          }
          var parents = this.getAncestors();
          for (var p = 0; p < parents.length; p++) {
            parents[p].emit(cls.NodeBase.nodeRemovedEvent, this);
          }

          // Remove node from the parent children list
          if (this._id !== 0) {
            this._parent.removeChildNode(this);
          }

          if (this._application) {
            this._application.model.removeNode(this._id);
            this._application = null;
          }
          this._children = null;
          this._parent = null;
          this.destroyController();
          $super.destroy.call(this);
        },

        /**
         * @returns {string} tag name of this node
         */
        getTag: function() {
          return this._tag;
        },

        /**
         *
         * @param {classes.NodeBase} node
         */
        addChildNode: function(node) {
          this._children.push(node);
        },
        /**
         *
         * @param {classes.NodeBase} node
         */
        removeChildNode: function(node) {
          this._children.splice(this._children.indexOf(node), 1);
        },
        /**
         *
         * @returns {classes.NodeBase}
         */
        getParentNode: function() {
          return this._parent;
        },
        /**
         * @param {string=} tag if provided, returns only child nodes of the given type.
         * @returns {classes.NodeBase[]}
         */
        getChildren: function(tag) {
          if (tag) {
            var result = [];
            var length = this._children.length;
            for (var i = 0; i < length; ++i) {
              var child = this._children[i];
              if (child._tag === tag) {
                result.push(child);
              }
            }
            return result;
          } else {
            return this._children;
          }
        },
        /**
         * @param {string=} tag if provided, returns only a child node of the given type.
         * @returns {classes.NodeBase}
         */
        getFirstChild: function(tag) {
          if (tag) {
            var length = this._children.length;
            for (var i = 0; i < length; ++i) {
              var child = this._children[i];
              if (child._tag === tag) {
                return child;
              }
            }
          } else if (!!this._children.length) {
            return this._children[0];
          }
          return null;
        },
        /**
         * @param {string=} tag if provided, returns only a child node of the given type.
         * @returns {classes.NodeBase}
         */
        getLastChild: function(tag) {
          if (tag) {
            var length = this._children.length;
            for (var i = length - 1; i > -1; i--) {
              var child = this._children[i];
              if (child._tag === tag) {
                return child;
              }
            }
          } else if (!this._children.isEmpty()) {
            return this._children[this._children.length - 1];
          }
          return null;
        },
        /**
         * Usage:
         *  - getChildrenWithAttribute("TagName", "attributeName", "attributeValue");
         *  - getChildrenWithAttribute("attributeName", "attributeValue");
         *  - getChildrenWithAttribute("attributeName");
         * @param {string=} tag node tag name
         * @param {string} attributeName searched attribute name
         * @param {string=} attributeValue searched attribute value
         * @returns {classes.NodeBase[]} List of matching nodes
         */
        getChildrenWithAttribute: function(tag, attributeName, attributeValue) {
          if (!attributeName) {
            attributeName = tag;
            tag = null;
          }
          var result = [];
          var length = this._children.length;
          for (var i = 0; i < length; ++i) {
            var child = this._children[i];
            if (!tag || child._tag === tag) {
              var value = child.attribute(attributeName);
              if (value) {
                if (!attributeValue || attributeValue === value) {
                  result.push(child);
                }
              }
            }
          }
          return result;
        },
        /**
         * Usage:
         *  - getFirstChildWithAttribute("TagName", "attributeName", "attributeValue");
         *  - getFirstChildWithAttribute("attributeName", "attributeValue");
         *  - getFirstChildWithAttribute("attributeName");
         * @param {string=} tag node tag name
         * @param {string} attributeName searched attribute name
         * @param {string=} attributeValue searched attribute value
         * @returns {classes.NodeBase} first matching node or null
         */
        getFirstChildWithAttribute: function(tag, attributeName, attributeValue) {
          if (!attributeName) {
            attributeName = tag;
            tag = null;
          }
          var length = this._children.length;
          for (var i = 0; i < length; ++i) {
            var child = this._children[i];
            if (!tag || child._tag === tag) {
              var value = child.attribute(attributeName);
              if (value) {
                if (!attributeValue || attributeValue === value) {
                  return child;
                }
              }
            }
          }
          return null;
        },
        /**
         * @param {string} node id
         * @returns {classes.NodeBase} first matching node or null
         */
        getFirstChildWithId: function(id) {
          if (this._children) {
            var length = this._children.length;
            for (var i = 0; i < length; ++i) {
              var child = this._children[i];
              if (child._id === id) {
                return child;
              }
            }
          }
          return null;
        },
        /**
         * Will return the first ancestor that has this tag, null otherwise.
         * @param {String} tag name of the ancestor node
         * @returns {classes.NodeBase} a node if found, null otherwise
         */
        getAncestor: function(tag) {
          var result = this._parent;
          while (result && result._tag !== tag) {
            result = result._parent;
          }
          return result;
        },
        /**
         * Will return a collection of parents
         * @returns {classes.NodeBase[]} a node collection
         */
        getAncestors: function() {
          var result = [],
            parent = this._parent;

          while (parent) {
            result.push(parent);
            parent = parent._parent;
          }
          return result;
        },
        /**
         * @param tag tag name of the descendants
         * @returns {classes.NodeBase[]} list of descendants matching the given tag
         * @private
         */
        getDescendants: function(tag) {
          return this._getDescendants(tag);
        },

        /**
         * @param tag tag name of the descendants
         * @param {classes.NodeBase[]} result optional array to populate. (For internal use only)
         * @returns {classes.NodeBase[]} list of descendants matching the given tag
         * @private
         */
        _getDescendants: function(tag, result) {
          if (result === undefined) {
            result = [];
          } else if (tag === this._tag) {
            // Matching tags should only be added for children
            result.push(this);
          }
          var length = this._children.length;
          for (var i = 0; i < length; ++i) {
            var child = this._children[i];
            child._getDescendants(tag, result);
          }
          return result;
        },

        /**
         * @param {string=} tag tag name of the siblings to consider
         * @returns {number} The index of this node in its parent's children array
         */
        getIndex: function(tag) {
          var siblings = this._parent._children;
          var length = siblings.length;
          var index = 0;
          for (var i = 0; i < length; ++i) {
            var sibling = siblings[i];
            if (sibling === this) {
              break;
            }
            if (!tag || sibling._tag === tag) {
              ++index;
            }
          }
          return index;
        },

        /**
         * Will get the next Sibling node
         * @param {String} tag optional tag name to limit result by name
         * @returns {*|node} next Sibling if exists
         */
        getNextSibling: function(tag) {
          var children = this.getParentNode().getChildren();
          var index = null;
          var result = null;
          if (tag) {
            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child._tag === tag) {
                index = children.indexOf(child);
                break;
              }
            }
          }
          if (!index) {
            return null;
          }
          if (children.length > index + 1) {
            return null;
          } else {
            return children[index];
          }
        },
        findNodeWithAttributeValue: function(tag, attributeName, attributeValue) {
          var tagged = this.getDescendants(tag);
          for (var i = 0; i < tagged.length; i++) {
            if (tagged[i].attribute(attributeName) === attributeValue) {
              return tagged[i];
            }
          }
          return null;
        },

        forThisAndEachDescendant: function(callback) {
          callback(this);
          for (var i = 0; i < this._children.length; ++i) {
            this._children[i].forThisAndEachDescendant(callback);
          }
        },

        /**
         *
         * @returns {classes.VMApplication}
         */
        getApplication: function() {
          return this._application;
        },
        /**
         *
         * @param {Object.<string, *>} attributes
         */
        updateAttributes: function(attributes) {
          //          this._previousAttributes = Object.clone(this._attributes);
          var attributesToSet = Object.keys(attributes);
          for (var a = 0; a < attributesToSet.length; a++) {
            var attributeName = attributesToSet[a];
            this._attributesSetByVM[attributeName] = true;
            var oldValue = this._previousAttributes[attributeName] = this._attributes[attributeName];
            var newValue = attributes[attributeName];
            //if (oldValue !== newValue) {
            this._attributes[attributeName] = newValue;
            this.emit(cls.NodeBase.attributeChangedEvent + attributeName, {
              node: this,
              attr: attributeName,
              old: oldValue,
              new: newValue,
              changed: newValue !== oldValue
            });
            //}
          }
        },
        /**
         *
         * @param {string} attributeName
         * @param {boolean=} previous
         * @returns {*}
         */
        attribute: function(attributeName, previous) {
          return (previous ? this._previousAttributes : this._attributes)[attributeName];
        },
        /**
         * @param attributeName name of the attribute
         * @returns {boolean} true if the attribute has been set by the VM, false otherwise
         */
        isAttributesSetByVM: function(attributeName) {
          return this._attributesSetByVM.hasOwnProperty(attributeName);
        },
        /**
         *
         * @param {string} attributeName
         * @param {Function} handler
         * @param {boolean=} runInitialValue
         * @returns {HandleRegistration}
         */
        onAttributeChanged: function(attributeName, handler, runInitialValue) {
          if (runInitialValue) {
            var event = new cls.Event(cls.NodeBase.attributeChangedEvent + attributeName);
            event.data = [{
              node: this,
              attr: attributeName,
              old: null,
              new: this._attributes[attributeName],
              changed: this._attributes[attributeName] !== null
            }];
            handler.call(this, event, event.data);
          }
          return this.on(cls.NodeBase.attributeChangedEvent + attributeName, this._onAttributeChanged.bind(null, handler));
        },
        _onAttributeChanged: function(handler, event, node, data) {
          handler(event, node, data);
        },
        updateApplicableStyles: function(recursive) {
          var i, ui = this.getApplication().uiNode();
          var matchingAttributesByPseudoSelectors = {};
          var styleLists = ui.getChildren('StyleList');
          for (i = 0; i < styleLists.length; i++) {
            var styleList = styleLists[i];
            styleList.populateMatchingStyles(matchingAttributesByPseudoSelectors, this);
          }
          this._stylesByPseudoSelectors = [];
          var pseudoSelectorKeys = Object.keys(matchingAttributesByPseudoSelectors);
          for (i = 0; i < pseudoSelectorKeys.length; i++) {
            var pseudoSelectorKey = pseudoSelectorKeys[i];
            var styleAttributes = matchingAttributesByPseudoSelectors[pseudoSelectorKey];
            var styles = {};
            var styleAttributeKeys = Object.keys(styleAttributes);
            for (var k = 0; k < styleAttributeKeys.length; k++) {
              var styleAttributeName = styleAttributeKeys[k];
              styles[styleAttributeName] = styleAttributes[styleAttributeName];
            }
            this._stylesByPseudoSelectors.push({
              pseudoSelector: styleAttributes[styleAttributeKeys[0]].getParentNode().getPseudoSelectors(),
              styles: styles
            });
          }
          // Sort by pseudo-selector priority
          this._stylesByPseudoSelectors.sort(this._pseudoSelectorPrioritySorter);
          if (!!recursive) {
            for (i = 0; i < this._children.length; ++i) {
              this._children[i].updateApplicableStyles(true);
            }
          }
        },
        _pseudoSelectorPrioritySorter: function(pss1, pss2) {
          var firstStyleAttr1 = pss1.styles[Object.keys(pss1.styles)[0]];
          var firstStyleAttr2 = pss2.styles[Object.keys(pss2.styles)[0]];
          var pss1Weight = firstStyleAttr1.getParentNode().getPseudoSelectorWeight();
          var pss2Weight = firstStyleAttr2.getParentNode().getPseudoSelectorWeight();
          return pss2Weight - pss1Weight;
        },
        /**
         * return the value of the specified style attribute for the current node
         * @param {string} styleAttr
         * @param {Array.string=} forcedPseudoSelectors
         * @returns {string}
         */
        getStyleAttribute: function(styleAttr, forcedPseudoSelectors) {
          return this._getStyleAttributeImpl(styleAttr, forcedPseudoSelectors);
        },

        /**
         * return the value of the specified style attribute for the current node
         * This is the implementation method which computes the style.
         * The public getStyleAttribute method invokes this method directly or forwards it
         * to the appropriate node depending on the context (FormFieldNode, ValueNode)
         * @param {string} styleAttr
         * @param {Array.string=} forcedPseudoSelectors
         * @returns {string}
         */
        _getStyleAttributeImpl: function(styleAttr, forcedPseudoSelectors) {
          var pseudoSelectors = forcedPseudoSelectors || this._computePseudoSelectors();
          var matchingStyleAttribute = null;
          var pseudoSelectorCheck = function(ps) {
            return pseudoSelectors.indexOf(ps) !== -1;
          };
          for (var i = 0; i < this._stylesByPseudoSelectors.length; ++i) {
            var pseudoSelectorStyle = this._stylesByPseudoSelectors[i];
            // dict lookup first, as it is faster
            var styleAttribute = pseudoSelectorStyle.styles[styleAttr];
            if (styleAttribute !== undefined) {
              var matches = pseudoSelectorStyle.pseudoSelector.every(pseudoSelectorCheck);
              if (matches) {
                matchingStyleAttribute = styleAttribute;
                break;
              }
            }
          }
          if (matchingStyleAttribute) {
            return matchingStyleAttribute.attribute('value');
          } else {
            var parent = this.getParentNode();
            if (parent) {
              return parent._getStyleAttributeImpl(styleAttr, pseudoSelectors);
            } else {
              return null;
            }
          }
        },

        _computePseudoSelectors: function() {
          var focusedNodeIdRef = this.getApplication().uiNode().attribute('focus');
          var pseudoSelectors = this._populatePseudoSelectors({}, focusedNodeIdRef);
          var availableSelectors = [];
          var keys = Object.keys(pseudoSelectors);
          for (var i = 0; i < keys.length; i++) {
            var ps = keys[i];
            if (pseudoSelectors[ps]) {
              availableSelectors.push(ps);
            }
          }
          return availableSelectors;
        },

        /**
         * @param pseudoSelectors a dictionnary which will be populated. Keys are the active pseudo-selectors
         * @param focusedNodeIdRef the idref of the focused node. Passed as parameter to avoid tree lookups.
         * @returns {Object} returns the pseudoSelectors parameter
         * @private
         */
        _populatePseudoSelectors: function(pseudoSelectors, focusedNodeIdRef) {
          if (!Object.isBoolean(pseudoSelectors.focus) &&
            focusedNodeIdRef === this._id &&
            this._tag !== 'Table' &&
            this._tag !== 'Matrix') {
            // Table and Matrix focus is ignored as the real focused item is their current element
            pseudoSelectors.focus = true;
          }

          var active = this.attribute('active');
          // active will be undefined if the current node doesn't have this attribute
          if (active !== undefined) {
            if (!!active) {
              var dialogType = this.attribute('dialogType');
              if (!!dialogType && !Object.isBoolean(pseudoSelectors.display) && !Object.isBoolean(pseudoSelectors.input) && !Object
                .isBoolean(pseudoSelectors.query)) {
                if (dialogType.startsWith('Display')) {
                  pseudoSelectors.display = true;
                  pseudoSelectors.input = false;
                  pseudoSelectors.query = false;
                } else if (dialogType.startsWith('Input')) {
                  pseudoSelectors.display = false;
                  pseudoSelectors.input = true;
                  pseudoSelectors.query = false;
                } else if (dialogType === 'Construct') {
                  pseudoSelectors.display = false;
                  pseudoSelectors.input = false;
                  pseudoSelectors.query = true;
                }
              }
            } else {
              pseudoSelectors.display = false;
              pseudoSelectors.input = false;
              pseudoSelectors.query = false;
            }

            if (!Object.isBoolean(pseudoSelectors.active) && !Object.isBoolean(pseudoSelectors.inactive)) {
              if (!!active) {
                pseudoSelectors.active = true;
              } else {
                pseudoSelectors.inactive = true;
              }
            }
          }

          if (!!this._parent) {
            return this._parent._populatePseudoSelectors(pseudoSelectors, focusedNodeIdRef);
          } else {
            return pseudoSelectors;
          }
        },

        /**
         * @returns {classes.ControllerBase}
         */
        createController: function() {
          if (!this._controller) {
            this._controller = this._createController();
            this._createChildrenControllers();
          }
          return this._controller;
        },
        /**
         * Applies all behaviors
         */
        applyBehaviors: function(recursive, force) {
          if (this._controller) {
            this._controller.applyBehaviors(force);
          }
          if (recursive) {
            for (var i = 0; i < this._children.length; i++) {
              this._children[i].applyBehaviors(recursive, force);
            }
          }
        },
        /**
         *
         * @returns {classes.ControllerBase}
         * @protected
         */
        _createController: function() {
          return null;
        },
        /**
         *
         * @protected
         */
        _createChildrenControllers: function() {
          for (var i = 0; i < this._children.length; i++) {
            this._children[i].createController();
          }
        },
        /**
         * Removes the associated controller
         */
        destroyController: function() {
          if (this._controller) {
            this._controller.destroy();
            this._controller = null;
          }
        },
        /**
         *
         * @returns {Element | Element[]}
         */
        attachUI: function() {
          var result = [];
          for (var i = 0; i < this._children.length; i++) {
            result.push(this._children[i].attachUI());
          }
          if (!!this.getController() && !!this.getController().getWidget()) {
            this.getController().attachUI();
            return this.getController().getWidget().getElement();
          } else {
            return result.flatten();
          }
        },
        /**
         *
         * @returns {classes.ControllerBase}
         */
        getController: function() {
          return this._controller;
        },

        /**
         *
         * @returns {number}
         */
        getId: function() {
          return this._id;
        },
        onNodeCreated: function(hook, tag) {
          return this.on(cls.NodeBase.nodeCreatedEvent, function(event, src, node) {
            if (!tag || tag === node._tag) {
              hook(event, src, node);
            }
          });
        },
        onNodeRemoved: function(hook, tag) {
          return this.on(cls.NodeBase.nodeRemovedEvent, function(event, src, node) {
            if (!tag || tag === node._tag) {
              hook(event, src, node);
            }
          });
        },

        /**
         * Once all children are created, emit the corresponding event
         */
        childrenCreated: function() {
          this.emit(cls.NodeBase.childrenCreatedEvent);
        }
      };
    });
  });
