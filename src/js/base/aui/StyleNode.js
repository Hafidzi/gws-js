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

modulum('StyleNode', ['NodeBase', 'NodeFactory'],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    /**
     * @class classes.StyleNode
     * @extends classes.NodeBase
     */
    cls.StyleNode = context.oo.Class(cls.NodeBase, function($super) {
      /** @lends classes.StyleNode.prototype */
      return {
        $static: {
          _pseudoSelectorsPriority: {
            focus: 1024,
            query: 512,
            display: 256,
            input: 128,
            even: 64,
            odd: 32,
            inactive: 16,
            active: 8,
            message: 4,
            error: 2,
            summaryLine: 1
          }
        },
        _parsedElementType: null,
        _parsedStyleName: null,
        _parsedPseudoSelectors: null,
        /** @type {number} */
        _weight: 0,
        /** @type {number} */
        _pseudoSelectorWeight: 0,

        constructor: function(parent, tag, id, attributes, app) {
          $super.constructor.call(this, parent, tag, id, attributes, app);
          var name = this.attribute("name");
          var dotIndex = name.indexOf('.');
          var colonIndex = name.indexOf(':');
          this._parsedStyleName = "";
          if (dotIndex === -1 && colonIndex === -1) {
            this._parsedElementType = name;
            this._weight = name === '*' ? 1 : 2;
          } else if (dotIndex !== -1 && colonIndex === -1) {
            this._parsedElementType = name.substring(0, dotIndex);
            this._parsedStyleName = name.substring(dotIndex + 1);
            this._weight = this._parsedElementType.length === 0 ? 3 : 6;
          } else if (dotIndex === -1 && colonIndex !== -1) {
            this._parsedElementType = name.substring(0, colonIndex);
            this._parsedPseudoSelectors = name.substring(colonIndex).split(':').splice(1).sort();
            this._weight = this._parsedElementType.length === 0 ? 4 : 5;
          } else {
            this._parsedElementType = name.substring(0, dotIndex);
            this._parsedStyleName = name.substring(dotIndex + 1, colonIndex);
            this._parsedPseudoSelectors = name.substr(colonIndex).split(':').splice(1).sort();
            this._weight = this._parsedElementType.length === 0 ? 7 : 8;
          }
          this._parsedPseudoSelectors = this._parsedPseudoSelectors || [];
          for (var i = 0; i < this._parsedPseudoSelectors.length; i++) {
            var pseudoSelector = this._parsedPseudoSelectors[i];
            this._pseudoSelectorWeight += cls.StyleNode._pseudoSelectorsPriority[pseudoSelector];
          }
        },

        getPseudoSelectors: function() {
          return this._parsedPseudoSelectors;
        },

        getWeight: function() {
          return this._weight;
        },

        getPseudoSelectorWeight: function() {
          return this._pseudoSelectorWeight;
        },

        matches: function(node) {
          var isMatching = true;
          if (this._parsedElementType.length !== 0) {
            isMatching = this._parsedElementType === '*' || this._parsedElementType === node.getTag();
          }
          if (isMatching && this._parsedStyleName.length !== 0) {
            var styleNames = node.attribute('style');
            if (!!styleNames) {
              isMatching = styleNames.split(' ').indexOf(this._parsedStyleName) !== -1;
            } else {
              isMatching = false;
            }
          }
          return isMatching;
        },

        populateMatchingStyles: function(matchingAttributesByPseudoSelectors, node) {
          if (!!this.getChildren().length && this.matches(node)) {
            var psKey = '';
            if (!!this._parsedPseudoSelectors.length) {
              psKey = ':' + this._parsedPseudoSelectors.join(':');
            }
            var dict = matchingAttributesByPseudoSelectors[psKey];
            if (!dict) {
              dict = {};
              matchingAttributesByPseudoSelectors[psKey] = dict;
            }
            for (var i = 0; i < this._children.length; ++i) {
              var child = this._children[i];
              var childName = child.attribute('name');
              var styleAttribute = dict[childName];
              if (!styleAttribute || styleAttribute.getParentNode()._weight < this._weight) {
                dict[childName] = child;
              }
            }
          }
        }
      };
    });
    cls.NodeFactory.register("Style", cls.StyleNode);
  });
