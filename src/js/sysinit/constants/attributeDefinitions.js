/// FOURJS_START_COPYRIGHT: D,2014
/// Property of Four Js*
/// : c Copyright Four Js 2014, 2015. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.accessoryType = {
  checkmark: "checkmark",
  detailButton: "detailButton",
  disclosureIndicator: "disclosureIndicator"
};

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.selectionMode = {
  none: "",
  set: "set",
  unset: "unset",
  exset: "exset"
};

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.textJustify = {
  left: "left",
  center: "center",
  right: "right"
};

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.fontSize = {
  xxSmall: "xx-small",
  xSmall: "x-small",
  small: "small",
  medium: "medium",
  large: "large",
  xLarge: "x-large",
  xxLarge: "xx-large"
};

/**
 * Action visibility
 * @readonly
 * @enum {number};
 */
gbc.constants.visibility = {
  visible: 0,
  hiddenByProgram: 1,
  hiddenByUser: 2
};

/**
 * Font pitch
 * @readonly
 * @enum {string};
 */
gbc.constants.fontPitch = {
  default: "default",
  fixed: "fixed",
  variable: "variable"
};

/**
 * Table column sort type
 * @readonly
 * @enum {string};
 */
gbc.constants.sortType = {
  none: "",
  ascending: "asc",
  descending: "desc"
};

/**
 * VM runtime status
 * @readonly
 * @enum {string};
 */
gbc.constants.runtimeStatus = {
  interactive: "interactive",
  processing: "processing",
  childstart: "childstart"
};

/**
 * Widget spacing policy
 * @readonly
 * @enum {string};
 */
gbc.constants.spacing = {
  compact: "compact",
  normal: "normal"
};

/**
 * Stretching orientation
 * @readonly
 * @enum {string};
 */
gbc.constants.stretch = {
  none: "none",
  x: "x",
  y: "y",
  both: "both"
};

/**
 * Scrollbars to display
 * @readonly
 * @enum {string};
 */
gbc.constants.scrollBars = {
  none: "none",
  vertical: "vertical",
  horizontal: "horizontal",
  both: "both"
};

/**
 * Widget size policy
 * @readonly
 * @enum {string};
 */
gbc.constants.sizePolicy = {
  initial: "initial",
  fixed: "fixed",
  dynamic: "dynamic"
};

/**
 * Action visibility policy
 * @readonly
 * @enum {string};
 */
gbc.constants.viewType = {
  showNever: "no",
  showAlways: "yes",
  showIfNoExplicitView: "auto"
};

/**
 * Form display mode
 * @readonly
 * @enum {string};
 */
gbc.constants.uiMode = {
  default: "default",
  traditional: "traditional"
};

/**
 * Dialog type
 * @readonly
 * @enum {string};
 */
gbc.constants.dialogType = {
  display: "Display",
  input: "Input",
  construct: "Construct",
  displayArray: "DisplayArray",
  inputArray: "InputArray"
};

/**
 * Text case shift
 * @readonly
 * @enum {string};
 */
gbc.constants.shift = {
  none: "none",
  up: "up",
  down: "down"
};

/**
 * Current drag and drop operation to do
 * @readonly
 * @enum {string};
 */
gbc.constants.dndOperation = {
  none: "none",
  copy: "copy",
  move: "move"
};

/**
 * Widget orientation
 * @readonly
 * @enum {string};
 */
gbc.constants.orientation = {
  vertical: "vertical",
  horizontal: "horizontal"
};

/**
 * Table's aggregate type
 * @readonly
 * @enum {string};
 */
gbc.constants.aggregateType = {
  sum: "sum",
  average: "avg",
  minimum: "min",
  maximum: "max",
  count: "count",
  program: "program"
};

/**
 * Current drag and drop visual feedback
 * @readonly
 * @enum {string};
 */
gbc.constants.dndFeedback = {
  insert: "insert",
  insertAfter: "insert_after",
  select: "select"
};

/**
 * Tab key field order
 * @readonly
 * @enum {number};
 */
gbc.constants.fieldOrder = {
  unconstrained: 0,
  constrained: 1,
  form: 2
};

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.precisionType = {
  year: "year",
  month: "month",
  day: "day",
  hour: "hour",
  minute: "minute",
  second: "second",
  fraction: "fraction"
};

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.keyboardHint = {
  default: "default",
  number: "number",
  phone: "phone",
  email: "email"
};

/**
 * @readonly
 * @enum {string};
 */
gbc.constants.windowType = {
  normal: "",
  left: "left",
  right: "right",
  navigator: "navigator",
  popup: "popup"
};

/**
 * @typedef = {number}; IntBoolean : 0,1
 */

/**
 * @typedef = {string}; Direction : 'nw'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w'
 */

/**
 * @typedef = {string}; Color : 'black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'
 */
