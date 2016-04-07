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

modulum('Factory', [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    var construct = function(constructor, args) {
      function F() {
        return constructor.apply(this, args);
      }
      F.prototype = constructor.prototype;
      return new F();
    };
    /**
     * @class classes.Factory
     */
    cls.Factory = context.oo.Class( /** @lends classes.Factory.prototype */ {
      __name: "Factory",
      _default: null,
      _fabrics: null,
      _topic: "",
      /**
       * @constructs {classes.Factory}
       * @param {string} topic
       * @param {Function=} defaultConstructor
       */
      constructor: function(topic, defaultConstructor) {
        this._topic = topic;
        this._default = defaultConstructor || null;
        this._fabrics = {};
      },
      setDefault: function(constructor) {
        this._default = constructor;
      },
      register: function(id, constructor) {
        if (!!this._fabrics[id]) {
          context.LogService.warn("Fabric (" + this._topic + ") already registered : " + id);
        }
        this._fabrics[id] = constructor;
      },
      unregister: function(id) {
        this._fabrics[id] = null;
      },
      create: function(id, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        //       var args = Array.prototype.slice.call(arguments, 1);
        var Fabric = this._fabrics[id] || this._default;
        if (typeof(Fabric) === "function") {
          return new Fabric(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
          //          return construct(Fabric, args);
        }
        context.LogService.warn("Fabric (" + this._topic + ") not found : " + id);
        return null;
      }
    });
  });
