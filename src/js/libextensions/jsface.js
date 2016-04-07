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

/**
 * ### __jsface override__
 * adds some new features:
 *
 * * introduce $super keyword
 * * ability to declare mixins in class definition
 *
 * See {@link augmentedFace#Class} to create classes
 * @class augmentedFace
 * @replaces jsface
 * @memberOf libextensions
 */
(function(context, jsface) {
  var nativeJsface = jsface;

  var augmentedFace = {
    /**
     * Creates a class
     * @example
     * // Simple class, no inheritance
     * var MyClass = jsface.Class({
     *   myMethod : function(){
     *     this.myMember = 1;
     *   }
     * });
     * @example
     * // Simple class, inherits from MyClass, overrides myMethod
     * jsface.Class(MyClass, {
     *   myMethod : function(){
     *     this.myMember = 2;
     *   }
     * });
     * @example
     * // Simple class, inherits from MyClass, calls superclass' myMethod
     * jsface.Class(MyClass, function($super){
     *   return {
     *     myMethod : function(){
     *       this.myMember = 2;
     *     }
     *   };
     * });
     * @method Class
     * @memberOf augmentedFace
     * @param {object|function} [params]
     * if *params* is omitted, the defined class will not have a superclass
     * @param {object|function} api
     * if *api* is omitted, the *params* parameter will be used as api description
     * The *api* parameter can be:
     *
     * * an object, describing the different members of the class
     * * a function, that will return an object as above desciption, but with the ability to inject *$super* accessor
     * @returns {JSObject} the constructed class
     */
    Class: function(params, api) {
      var parent = 0;
      if (!api) {
        params = (api = params, 0);
      }
      if (typeof params === "function") {
        parent = params;
      } else if (typeof params === "object") {
        parent = params.base || 0;
      }

      var $super = {
        constructor: parent || function() {}
      };

      if (!!parent) {
        var memberKeys = Object.keys(parent.prototype);
        for (var k = 0; k < memberKeys.length; k++) {
          var methodName = memberKeys[k];
          var method = parent.prototype[methodName];
          if (typeof(method) === "function") {
            $super[methodName] = method;
          } else if (methodName === "__name") {
            $super.__name = method;
          }
        }
      }

      api = (typeof api === "function" ? api($super) : api) || {};

      api.isInstanceOf = function(type) {
        return type && type.prototype && type.prototype.__name === this.__name;
      };
      if (!api.hasOwnProperty("constructor")) {
        api.constructor = //$super.constructor||function(){};
          function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            $super.constructor.call(this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
          };
      }

      var resultClass = nativeJsface.Class(parent, api);

      return resultClass;
    },

    Singleton: function(params, api) {
      if (!api) {
        params = (api = params, 0);
      }
      if (api) {
        if (typeof api === "function") {
          var originalApi = api;
          api = function($super) {
            var result = originalApi($super);
            if (result) {
              result.$singleton = true;
            }
            return result;
          };
        } else {
          api.$singleton = true;
        }
      }
      return this.Class(params, api);
    }
  };

  context.jsface = augmentedFace;
})(window, window.jsface);
