/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2015. All Rights Reserved.
///  Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
/// 
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT"use strict";

gbc.constants.debugInfo.attributeInfo = {
  acceleratorKey1: {
    desc: "Accelerator Key related to mouse left button.",
    type: "string"
  },
  acceleratorKey3: {
    desc: "Accelerator Key related to mouse right button.",
    type: "string"
  },
  acceleratorName2: {
    desc: "The second accelerator key.",
    type: "string"
  },
  acceleratorName3: {
    desc: "The third accelerator key.",
    type: "string"
  },
  acceleratorName4: {
    desc: "The fourth accelerator key.",
    type: "string"
  },
  acceleratorName: {
    desc: "The accelerator key.",
    type: "string"
  },
  action: {
    desc: "The name of the action the Node is linked with",
    type: "string"
  },
  actionActive: {
    desc: "This action-view node is active, a Action can be invoked.",
    type: "number"
  },
  active: {
    desc: "This interactive node is active, a FormField can be edited, a Action can be invoked.",
    type: "IntBoolean"
  },
  aggregateText: {
    desc: "The aggregate caption. The default is 'Summary'.",
    type: "string"
  },
  aggregateType: {
    desc: "Displays an aggregate value.  final='1'",
    type: "AggregateType"
  },
  aggregateValue: {
    desc: "The aggregate value set by program.",
    type: "string"
  },
  anchor: {
    desc: "The direction of the CanvasText.",
    type: "Direction"
  },
  autoNext: {
    desc: "Leave the field automatically if the input buffer has been filled.",
    type: "IntBoolean"
  },
  autoScale: {
    desc: "",
    type: "IntBoolean"
  },
  blink: {
    desc: "The text of the field is blinking. Required for compatibility.",
    type: "IntBoolean"
  },
  bold: {
    desc: "The text of the field is bold.",
    type: "IntBoolean"
  },
  border: {
    desc: "The Window has a border-frame.",
    type: "IntBoolean"
  },
  bufferSize: {
    desc: "The number of rows needed by the front end to display the current array. Must be greater or equal as pageSize.",
    type: "number"
  },
  build: {
    desc: "DVM Only - The version and build of fglform used to compile the form.  volatile='1'",
    type: "string"
  },
  buttonTextHidden: {
    desc: "Defines if the text is displayed on toolBarItem.",
    type: "IntBoolean"
  },
  century: {
    desc: "The century attribute specifies how to expand abbreviated one- and two- digit year specifications in a DATE and DATETIME field.  Symbol Algorithm for Expanding Abbreviated Years.&lt;br/&gt;C or c Use the past, future, or current year closest to the current date.&lt;br/&gt;F or f Use the nearest year in the future to expand the entered value.&lt;br/&gt;P or p Use the nearest year in the past to expand the entered value.&lt;br/&gt;R or r Prefix the entered value with the first two digits of the current year.",
    type: "string"
  },
  className: {
    desc: "The class attribute as specified in the per file.",
    type: "string"
  },
  clickedCanvasItemId: {
    desc: "The id of the last clicked canvas item - for internal use only.  volatile='1' final='1'",
    type: "number"
  },
  cloneColumns: {
    desc: "Static elements cloned in matrix - number of columns",
    type: "number"
  },
  cloneCount: {
    desc: "Static elements cloned in matrix",
    type: "number"
  },
  colName: {
    desc: "The identifier to lookup this Node in the 4gl program.  The identifier to lookup this Edit in the 4gl program.  Convention Rule: all nodes having a colName attribute can be used within the 4gl program as replacement of the 'old' formfield.  Those statements are ScreenInteraction statements expecting the name of a formfield.  final='1'",
    type: "string"
  },
  color: {
    desc: "A color name, typical for text foreground.",
    type: "Color"
  },
  colorCondition: {
    desc: "DVM Only - an internal value corresponding to COLOR WHERE attribute.  volatile='1'",
    type: "string"
  },
  columnCount: {
    desc: "The number of columns of the current Matrix.",
    type: "number"
  },
  comment: {
    desc: "Item specific help-text.",
    type: "string"
  },
  commentLine: {
    desc: "DVM Only -",
    type: "number"
  },
  commentLineHidden: {
    desc: "DVM Only -",
    type: "number"
  },
  componentType: {
    desc: "",
    type: "string"
  },
  compress: {
    desc: "DVM Only - Remove fill characters after input has been done. Required for compatibility.",
    type: "IntBoolean"
  },
  config: {
    desc: "The config attribute as specified in the .per file.",
    type: "string"
  },
  container: {
    desc: "Defines the name of the parent MDI",
    type: "string"
  },
  contextMenu: {
    desc: "Indicates that the action must be displayed in the context menu.  no: never shown,  yes: always shown,  auto: is shown if there is no explicit view (toolbar, topmenu, button in form..)",
    type: "Trilean"
  },
  count: {
    desc: "The count number of the Message.",
    type: "number"
  },
  currentColumn: {
    desc: "The id of the active column in a Table. The id of the first columns is 0.",
    type: "number"
  },
  currentParentRow: {
    desc: "Parent row of current row.",
    type: "number"
  },
  currentRow: {
    desc: "The index of the current row.",
    type: "number"
  },
  currentWindow: {
    desc: "The id of the active Window",
    type: "number"
  },
  cursor2: {
    desc: "The secondary position of the editor cursor, used for text selection.",
    type: "number"
  },
  cursor: {
    desc: "The current position of the editor cursor. The left most position is 0.",
    type: "number"
  },
  dataType: {
    desc: "Describes a data type in string format (ex:'DECIMAL(4.2)').",
    type: "string"
  },
  dbCentury: {
    desc: "The century to apply client specific date conversions.",
    type: "string"
  },
  dbDate: {
    desc: "The date format to apply client specific date conversions.",
    type: "string"
  },
  decimalSeparator: {
    desc: "Defines the decimal separator for numbers (used for numeric keypad).",
    type: "string"
  },
  defaultValue: {
    desc: "DVM Only - The initial value when making an INPUT.  The value the initialize the target-variable when making an INPUT WITHOUT DEFAULTS.  volatile='1'",
    type: "string"
  },
  defaultView: {
    desc: "Indicates in ringmenu/fkey/action button must be displayed.  no: never shown,  yes: always shown,  auto: button is shown if there is no explicit view (toolbar, topmenu..)",
    type: "Trilean"
  },
  delimiters: {
    desc: "DVM Only - The delimiter-characters as defined in the per-file.",
    type: "string"
  },
  dialogEventItem: {
    desc: "Holds the id of the form item linked to the event (screen-record).",
    type: "number"
  },
  dialogEventType: {
    desc: "Contains the name of the dialog trigger. BeforeField, AfterRow,...",
    type: "string"
  },
  dialogType: {
    desc: "The type name of the controlling dialog.",
    type: "DialogType"
  },
  diameter: {
    desc: "The diameter of the Canvas Item.",
    type: "number"
  },
  dim: {
    desc: "",
    type: "IntBoolean"
  },
  dirty: {
    desc: "DVM Only - The Edit has been used by subdialog.  volatile='1'",
    type: "IntBoolean"
  },
  disabled: {
    desc: "Indicates that the element does not allow any user interaction.",
    type: "IntBoolean"
  },
  dndAccepted: {
    desc: "This Drag can be dropped.",
    type: "IntBoolean"
  },
  dndBuffer: {
    desc: "",
    type: "string"
  },
  dndCanCopy: {
    desc: "",
    type: "IntBoolean"
  },
  dndCanMove: {
    desc: "",
    type: "IntBoolean"
  },
  dndFeedback: {
    desc: "",
    type: "DndFeedback"
  },
  dndIdRef: {
    desc: "",
    type: "number"
  },
  dndMimeTypes: {
    desc: "fgl:in, gdc:out",
    type: "string"
  },
  dndOperation: {
    desc: "",
    type: "DndOperation"
  },
  dndRequiredMimeType: {
    desc: "The required mime type. fgl:out, gdc:in",
    type: "string"
  },
  doubleClick: {
    desc: "Defines the action to be sent by client on a double-click",
    type: "string"
  },
  endX: {
    desc: "The X pos of the ending point of the Canvas Item.",
    type: "number"
  },
  endY: {
    desc: "The Y pos of the ending point of the Canvas Item.",
    type: "number"
  },
  errorLine: {
    desc: "Required for compatibility.",
    type: "number"
  },
  exec: {
    desc: "DVM Only - The command to be executed from the 4gl runtime. Specifies a parameter for a RUN command invoked from fglrun when selecting the command.  The invocation of the command is controlled by the fgl runtime.  volatile='1'",
    type: "string"
  },
  expanded: {
    desc: "Child rows visible?",
    type: "IntBoolean"
  },
  expandedColumn: {
    desc: "The name of the column holding the expanded state of a tree node  volatile='1' final='1'",
    type: "string"
  },
  extentDegrees: {
    desc: "The ending angle for the Canvas Arc.",
    type: "number"
  },
  fieldId: {
    desc: "DVM Only - The unique id of this Edit within the Form. The attribute will be used by fglrun to lookup the Edit.  The fieldId attribute is used to lookup a FormField qualified by a record-name.  final='1'",
    type: "number"
  },
  fieldIdRef: {
    desc: "DVM Only - The fieldId attribute of the FormField or Matrix this Link is referencing.",
    type: "number"
  },
  fieldOrder: {
    desc: "DVM Only - Controls the cursor tabbing in INPUT or CONSTRUCT statements.",
    type: "IntBoolean"
  },
  fieldSelection: {
    desc: "Indicates if the field must be selected, even if focus has not changed.",
    type: "number"
  },
  fileName: {
    desc: "DVM Only - This attribute is for debugging only: fileName is the absolute file name of the resource file.",
    type: "string"
  },
  fillColor: {
    desc: "The color used to fill the Canvas Item.",
    type: "string"
  },
  focus: {
    desc: "The id of the node having the focus.",
    type: "number"
  },
  fontPitch: {
    desc: "The character width of the font. Required for compatibility.",
    type: "FontPitch"
  },
  formLine: {
    desc: "The top-offset when displaying a FORM. Required for compatibility.",
    type: "number"
  },
  format: {
    desc: "A mask to format the output. Only used for NUMERIC and DATE values.",
    type: "string"
  },
  gridChildrenInParent: {
    desc: "The children items are aligned into the parent grid and not into the current container. This can be used to have an alignment between several Groups.",
    type: "IntBoolean"
  },
  gridHeight: {
    desc: "The height in grid-cells.",
    type: "number"
  },
  gridWidth: {
    desc: "The width in grid-cells.",
    type: "number"
  },
  hasChildren: {
    desc: "Is Node.",
    type: "IntBoolean"
  },
  height: {
    desc: "The visible height of an object in character cells. For some objects like windows, tables and images, it can be followed by an optional unit (co,ln,pt,px). Default unit is character cells.",
    type: "string"
  },
  helpNum: {
    desc: "DVM Only - The HELP number value of a MENU-Command clause.",
    type: "number"
  },
  hidden: {
    desc: "Visibility (0=visible,1=hidden by program,2=hidden by user). Runtime handles hidden fields as inactive.",
    type: "number"
  },
  idColumn: {
    desc: "The name of the column holding the tree item id  volatile='1' final='1'",
    type: "string"
  },
  image: {
    desc: "Is the case sensitive name of the file of the icon which should be displayed.",
    type: "string"
  },
  imageCollapsed: {
    desc: "The default image for a collapsed node.  volatile='1' final='1'",
    type: "string"
  },
  imageColumn: {
    desc: "The name of the column holding the image attribute of this TableColumn  volatile='1' final='1'",
    type: "string"
  },
  imageExpanded: {
    desc: "The default image for a expanded node.  volatile='1' final='1'",
    type: "string"
  },
  imageLeaf: {
    desc: "The default image for a leaf.  volatile='1' final='1'",
    type: "string"
  },
  include: {
    desc: "A list of values or ranges.  Will be used to constrain special values when making an input.  &lt;danger&gt;The attribute should be replaced by an Element because of the sub-grammar.&lt;/danger&gt; The list separator is a &lt;code&gt;|&lt;/code&gt;. The separator for the start and end value is &lt;code&gt;:&lt;/code&gt;. The escape character is a backslash.",
    type: "string"
  },
  initializer: {
    desc: "DVM Only - The name of a 4gl function to initialize the item list of this combo box.  volatile='1' final='1'",
    type: "string"
  },
  inputWrap: {
    desc: "DVM Only - Leaving the last field of a INPUT will set the focus to the first field.  Secifies if an INPUT or CONSTRUCT will be termined when leaving the last field if will be continued on the first field (the input cursor wraps). GUI-client implementors can ignore this attribute - the tabbing is controlled by the vm yet.",
    type: "IntBoolean"
  },
  isHotKey: {
    desc: "DVM Only - This has been declared by a COMMAND KEY (key-name).",
    type: "number"
  },
  isNodeColumn: {
    desc: "The name of the column holding the isNode attribute a tree node  volatile='1' final='1'",
    type: "string"
  },
  isNull: {
    desc: "Indicates if the element is NULL.",
    type: "number"
  },
  isPassword: {
    desc: "This is a field with password input.",
    type: "IntBoolean"
  },
  isSystem: {
    desc: "Defines if the element is system or user (used by FunctionCall).",
    type: "IntBoolean"
  },
  isTree: {
    desc: "This table is decorated as tree.  volatile='1' final='1'",
    type: "IntBoolean"
  },
  justify: {
    desc: "Text justification form the element.",
    type: "TextJustify"
  },
  maxLength: {
    desc: "What's the maximum number if characters a user can enter (0 is unlimited).",
    type: "number"
  },
  menuLine: {
    desc: "Required for compatibility.",
    type: "number"
  },
  messageLine: {
    desc: "Required for compatibility.",
    type: "number"
  },
  minHeight: {
    desc: "minimum height for the form measured in characters.",
    type: "number"
  },
  minWidth: {
    desc: "minimum width for the form measured in characters.",
    type: "number"
  },
  moduleName: {
    desc: "Defines the name of a module.",
    type: "string"
  },
  multiRowSelection: {
    desc: "Table allows multirow selection.",
    type: "IntBoolean"
  },
  name: {
    desc: "The name of this Node. Convenience rule: all Node-objects should have a name attribute with a unique value in the list of siblings. This simplifies the identification of the Node.",
    type: "string"
  },
  noEntry: {
    desc: "Do not enable INPUT from this field. If this flag is set the field will be ignored for making input.",
    type: "IntBoolean"
  },
  nodeIdRef: {
    desc: "The id of a node in the AUI tree.",
    type: "number"
  },
  notNull: {
    desc: "On leave an INPUT the target-variable will be checked to be NOT NULL.",
    type: "IntBoolean"
  },
  numAlign: {
    desc: "Indicates if a field contains a numeric value, for text justification.",
    type: "IntBoolean"
  },
  offset: {
    desc: "The index of the first visible row.",
    type: "number"
  },
  orientation: {
    desc: "Defines the orientation of an element.",
    type: "Orientation"
  },
  pageSize: {
    desc: "The number of usable rows in the visible Array. Is lower than bufferSize.",
    type: "number"
  },
  paramCount: {
    desc: "Defines a number of parameters.",
    type: "number"
  },
  parent: {
    desc: "The id attribute of the parent Menu.",
    type: "number"
  },
  parentIdColumn: {
    desc: "The name of the column holding the tree item parent id  volatile='1' final='1'",
    type: "string"
  },
  picture: {
    desc: "A mask defining which character-classes are allowed on fix input positions. Only used for INPUT.",
    type: "string"
  },
  posX: {
    desc: "The X position of the Node in its container. The leftmost position is 0.",
    type: "number"
  },
  posY: {
    desc: "The Y position of the Node in its container. The topmost position is 0.",
    type: "number"
  },
  procId: {
    desc: "The process identifier of a program (hostname:pid).",
    type: "string"
  },
  procIdParent: {
    desc: "The process identifier of the parent program (hostname:pid).",
    type: "string"
  },
  procIdWaiting: {
    desc: "The process identifier of the waiting parent program (hostname:pid).",
    type: "string"
  },
  program: {
    desc: "The name of a program that will be called to edit TEXT or BYTE values.",
    type: "string"
  },
  promptLine: {
    desc: "Required for compatibility.",
    type: "number"
  },
  queryEditable: {
    desc: "Indicates if the field (combobox) is editable during CONSTRUCT.",
    type: "IntBoolean"
  },
  required: {
    desc: "The user must enter something but can also leave the field empty.",
    type: "IntBoolean"
  },
  returnCount: {
    desc: "Defines a number of returned values.",
    type: "number"
  },
  reverse: {
    desc: "Make reverse colors - if You can.",
    type: "IntBoolean"
  },
  row: {
    desc: "(Tree) Row",
    type: "number"
  },
  runtimeStatus: {
    desc: "Tell the client the status of the runtime, interactive: the runtime waits for a user interaction, processing: the runtime is busy,childstart: the runtime is starting a child application process.",
    type: "RuntimeStatus"
  },
  sample: {
    desc: "A sample of a typical value.",
    type: "string"
  },
  screenRecord: {
    desc: "The name of the attached screen record in INPUT|DISPLAY ARRAY.",
    type: "string"
  },
  scroll: {
    desc: "Required for compatibility.",
    type: "IntBoolean"
  },
  scrollBars: {
    desc: "Defines scrolling and word wrapping.",
    type: "ScrollBars"
  },
  selected: {
    desc: "Object selection indicator (0 = not selected, 1 = selected).",
    type: "IntBoolean"
  },
  selection: {
    desc: "The id attribute of the current MenuAction-child.",
    type: "string"
  },
  shift: {
    desc: "The shift attribute controls up or down shifting if this field is in input mode.",
    type: "Shift"
  },
  size: {
    desc: "The size of the array.",
    type: "number"
  },
  sizePolicy: {
    desc: "how elements grow if content is displayed to them.",
    type: "SizePolicy"
  },
  sortColumn: {
    desc: "The index of the Column, data is ordered by.",
    type: "number"
  },
  sortType: {
    desc: "(none|asc|desc)",
    type: "string"
  },
  spacing: {
    desc: "Defines the spacing between two visible siblings.",
    type: "Spacing"
  },
  splitter: {
    desc: "Children will be separated by a splitter.",
    type: "IntBoolean"
  },
  sqlDbName: {
    desc: "The name of the database used to compile this form.  volatile='1' final='1'",
    type: "string"
  },
  sqlTabName: {
    desc: "The name of the SQL Table this Edit is related to. For debugging only.  volatile='1' final='1'",
    type: "string"
  },
  sqlType: {
    desc: "A SQL-type-name. Will be used for CONSTRUCT.  volatile='1' final='1'",
    type: "string"
  },
  startDegrees: {
    desc: "The starting angle for the Canvas Arc.",
    type: "number"
  },
  startX: {
    desc: "The X pos of the starting point of the Canvas Item.",
    type: "number"
  },
  startY: {
    desc: "The Y pos of the starting point of the Canvas Item.",
    type: "number"
  },
  step: {
    desc: "The step between two marks.",
    type: "number"
  },
  stepX: {
    desc: "The space between two cells (horizontal).",
    type: "number"
  },
  stepY: {
    desc: "The space between two cells (vertical).",
    type: "number"
  },
  stretch: {
    desc: "One of { none x y both } - Indicates if the Image can be streched.",
    type: "Stretch"
  },
  style: {
    desc: "The given style of the Node.This is used to centralize attributes in the node.stylename style.",
    type: "string"
  },
  tabIndex: {
    desc: "Sets the order of fields in a form.",
    type: "number"
  },
  tabIndexRt: {
    desc: "The tab index of the field in the current dialog.",
    type: "number"
  },
  tabName: {
    desc: "DVM Only - An identifier to lookup children of this node in the rogram.",
    type: "string"
  },
  tag: {
    desc: "User specific text. Can be added to any node.",
    type: "string"
  },
  targetType: {
    desc: "Type of the target variable associated to this screen field.",
    type: "string"
  },
  text: {
    desc: "Text associated to this Control. he text is typically visible for the user.",
    type: "string"
  },
  thousandsSeparator: {
    desc: "Defines the thousands separator for numbers (used for numeric keypad).",
    type: "string"
  },
  timeout: {
    desc: "After timeout seconds beeing idle this action must be invoked",
    type: "number"
  },
  touched: {
    desc: "DVM Only - The Edit has been touched in the current dialog.  volatile='1'",
    type: "IntBoolean"
  },
  ttyAttr: {
    desc: "TTY attributes (COLOR, REVERSE, UNDERLINE, BOLD) as seen from fglcomp.  volatile='1' final='1'",
    type: "string"
  },
  type: {
    desc: "",
    type: "string"
  },
  uiMode: {
    desc: "Render as close as possible like the text user interface.",
    type: "UIMode"
  },
  underline: {
    desc: "Indicates if the current text is underlined. Required for compatibility.",
    type: "IntBoolean"
  },
  unhidable: {
    desc: "Not hidable.",
    type: "IntBoolean"
  },
  unhidableColumns: {
    desc: "Table columns cannot be hidden.",
    type: "IntBoolean"
  },
  unmovable: {
    desc: "Can't be move. Have sense if at least two columns are unmovable: then the order for these columns is fixed.",
    type: "IntBoolean"
  },
  unmovableColumns: {
    desc: "All columns of this list-view have a fixed position. This attribute disables user to set the order of columns at runtime.",
    type: "IntBoolean"
  },
  unsizable: {
    desc: "Not resizable.",
    type: "IntBoolean"
  },
  unsizableColumns: {
    desc: "Table columns are not resizable.",
    type: "IntBoolean"
  },
  unsortable: {
    desc: "Not sortable.",
    type: "IntBoolean"
  },
  unsortableColumns: {
    desc: "Table columns cannot be used for sort.",
    type: "IntBoolean"
  },
  validate: {
    desc: "volatile='1' final='1'",
    type: "number"
  },
  value: {
    desc: "The current value.",
    type: "string"
  },
  valueChecked: {
    desc: "The value the checkbox holds when checked. The default value is 1.",
    type: "string"
  },
  valueMax: {
    desc: "The upper limit of a range of allowed values.",
    type: "number"
  },
  valueMin: {
    desc: "The lower limit of a range of allowed values.",
    type: "number"
  },
  valueUnchecked: {
    desc: "The value the checkbox holds when unchecked. The default value is 0",
    type: "string"
  },
  verify: {
    desc: "DVM Only - the value must be entered twice by the user.",
    type: "IntBoolean"
  },
  version: {
    desc: "The version of an element (used for example in form version).",
    type: "string"
  },
  visibleId: {
    desc: "Ensure the item with the given id to be visible.",
    type: "number"
  },
  waiting: {
    desc: "DVM Only - The command started in a start menu will be started WITH waitingor not depending on waiting value, defaults to 0, not waiting  volatile='1'",
    type: "number"
  },
  wantFixedPageSize: {
    desc: "The pageSize can't be set interactively. This attribute disables users to resize the listView at runtime.",
    type: "IntBoolean"
  },
  wantReturns: {
    desc: "Indicates that this textEdit will consume return-characters. Return characters will not be used to leave the input.",
    type: "IntBoolean"
  },
  wantTabs: {
    desc: "Indicates that this textEdit will consume tab-characters. Tab characters will not be used to leave this field.",
    type: "IntBoolean"
  },
  width: {
    desc: "The visible width of an object in character cells. For some objects like windows, tables and images, it can be followed by an optional unit (co,ln,pt,px). Default unit is character cells.",
    type: "string"
  },
  windowStyle: {
    desc: "Defines the parent window style of a form.",
    type: "string"
  },
  xyList: {
    desc: "A space separated list of coordinates describing the CanvasPolygon.",
    type: "string"
  }
};
