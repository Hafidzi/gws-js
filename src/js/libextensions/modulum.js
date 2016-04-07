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

/**
 * @param w {Window}
 */
(function(w) {
  var modules = [];
  var loadedModules = {};
  var injection = [];
  var resolve = function() {
    var moduleIndex = 0;
    for (;;) {
      if (moduleIndex >= modules.length) {
        break;
      }
      var module = modules[moduleIndex];
      var dependencyIndex = 0;
      for (;;) {
        if (dependencyIndex >= module.after.length) {
          break;
        }
        if (loadedModules[module.after[dependencyIndex]]) {
          module.after.splice(dependencyIndex, 1);
        } else {
          dependencyIndex++;
        }
      }
      if (!module.after.length) {
        loadedModules[module.id] = true;
        module.exec.apply(w, injection);
        modules.splice(moduleIndex, 1);
      } else {
        moduleIndex++;
      }
    }
  };
  var error = function() {
    var errorPad = document.createElement('div');
    errorPad.style.position = 'absolute';
    errorPad.style.top = 0;
    errorPad.style.left = 0;
    errorPad.style.background = '#F88';
    errorPad.style.padding = '5px';
    errorPad.style.border = 'solid 3px #F00';
    errorPad.style.fontFamily = 'monospace';
    errorPad.style.color = 'white';

    var contents = ["<div>Modulum.js</div><div>----------</div><div>Cyclic dependency detected</div>"];
    for (var i = 0; i < modules.length; i++) {
      contents.push("<div>" + modules[i].id + " depends on [" + modules[i].after.join(", ") + "]</div>");
    }
    errorPad.innerHTML = contents.join("");
    document.body.appendChild(errorPad);
  };
  w.modulum = function(module, dependencies, exec) {
    if (!exec) {
      exec = dependencies;
      dependencies = [];
    }
    modules.push({
      id: module,
      after: dependencies,
      exec: exec
    });
  };
  w.modulum.inject = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    injection = [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9];
  };
  w.modulum.assemble = function() {
    var stillWaiting = modules.length;
    while (stillWaiting > 0) {
      resolve();
      if (modules.length === stillWaiting) {
        error();
        throw "cyclic dependencies";
      }
      stillWaiting = modules.length;
    }
  };
})(window);
