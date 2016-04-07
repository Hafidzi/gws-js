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

modulum("AuiProtocolWriter", [],
  /**
   * @param {gbc} context
   * @param {classes} cls
   */
  function(context, cls) {
    var auiTreeCode = "\x01";
    var escapeSpecials = function(text) {
      if (Object.isString(text)) {
        return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/"/g, "\\\"");
      } else {
        return text;
      }
    };
    var stringifiers = {
      om: function(obj, application) {
        var result = [];

        result.push("event _om ", obj.order, "{}{", cls.AuiProtocolWriter.translate(obj.orders, application), "}\n");
        //noinspection JSDeprecatedSymbols
        var sendString = result.join("");
        var finalString = sendString;
        if (application.encapsulation) {
          var size = sendString.getBytesCount();
          var encodedSize = Number.encodeInteger(size);
          finalString = encodedSize + encodedSize + auiTreeCode + sendString;
        }
        return finalString;
      },
      meta: function(obj) {
        var result = [];
        result.push("meta ", obj.verb, "{", stringifiers.attributes(obj.attributes), "}\n");
        return result.join("");
      },
      functionCallEvent: function(obj) {
        var result = [];
        result.push("{FunctionCallEvent 0{{result \"", obj.status, "\"}");
        if (!!obj.message) {
          result.push("{errorMessage \"" + escapeSpecials(obj.message) + "\"}");
        }
        result.push("}");
        if (Object.isArray(obj.values)) {
          result.push("{");
          for (var i = 0; i < obj.values.length; i++) {
            var value = obj.values[i];
            result.push("{FunctionCallReturn " + i + "{");
            if (value === null || value === undefined) {
              result.push("{isNull \"1\"}{value \"0\"}");
            } else if (Object.isBoolean(value)) {
              result.push("{isNull \"0\"}{value \"" + (value ? "1" : "0") + "\"}");
            } else {
              result.push("{isNull \"0\"}{value \"" + escapeSpecials(value.toString()) + "\"}");
            }
            result.push("}{}}");
          }
          result.push("}");
        }
        result.push("}");
        return result.join("");
      },
      configureEvent: function(obj) {
        var result = [];
        result.push("{ConfigureEvent 0{", stringifiers.attributes(obj.attributes), "}}");
        return result.join("");
      },
      keyEvent: function(obj) {
        var result = [];
        result.push("{KeyEvent 0{", stringifiers.attributes(obj.attributes), "}}");
        return result.join("");
      },
      actionEvent: function(obj) {
        var result = [];
        result.push("{ActionEvent 0{", stringifiers.attributes(obj.attributes), "}}");
        return result.join("");
      },
      rowSelectionEvent: function(obj) {
        var result = [];
        result.push("{RowSelectionEvent 0{", stringifiers.attributes(obj.attributes), "}}");
        return result.join("");
      },
      dragDropEvent: function(obj) {
        var result = [];
        result.push("{DragDropEvent 0{", stringifiers.attributes(obj.attributes), "}}");
        return result.join("");
      },
      attributes: function(attributeList) {
        var string = [];
        var keys = Object.keys(attributeList);
        for (var i = 0; i < keys.length; i++) {
          string.push("{", keys[i], " \"", escapeSpecials(attributeList[keys[i]]), "\"", "}");
        }
        return string.join("");
      },
      _default: function(obj) {
        context.LogService.info("no aui protocol implementation for " + obj.type, obj);
        return "";
      }
    };
    /**
     * @class classes.AuiProtocolWriter
     */
    cls.AuiProtocolWriter = context.oo.Singleton(
      /** @lends classes.AuiProtocolWriter */
      {
        __name: "AuiProtocolWriter",
        translate: function(obj, application) {
          return (Object.isArray(obj) ? obj : [obj]).map(function(item) {
            return (stringifiers[item.type] || stringifiers._default)(item, application);
          }).join("");

        }
      });
  });
