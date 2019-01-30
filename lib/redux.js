'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// Constants
// ----------------------------------------------------------------------------

var OPEN_SNACKBAR = '@@mui-redux-alerts/OPEN_SNACKBAR';
var OPEN_DIALOG = '@@mui-redux-alerts/OPEN_DIALOG';
var CLOSE_SNACKBAR = '@@mui-redux-alerts/CLOSE_SNACKBAR';
var CLOSE_DIALOG = '@@mui-redux-alerts/CLOSE_DIALOG';

var initialState = {
  snackbars: {},
  dialogs: {}
};

//
// Reducer
// ----------------------------------------------------------------------------

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        snackbars: _extends(_defineProperty({}, action.payload.key, action.payload.props), state.snackbars),
        dialogs: state.dialogs
      };
    case OPEN_DIALOG:
      return {
        snackbars: state.snackbars,
        dialogs: _extends(_defineProperty({}, action.payload.key, action.payload.props), state.dialogs)
      };
    case CLOSE_SNACKBAR:
      {
        var _state$snackbars = state.snackbars,
            omit = _state$snackbars[action.payload.key],
            snackbars = _objectWithoutProperties(_state$snackbars, [action.payload.key]);

        return { snackbars: snackbars, dialogs: state.dialogs };
      }
    case CLOSE_DIALOG:
      {
        var _state$dialogs = state.dialogs,
            _omit = _state$dialogs[action.payload.key],
            dialogs = _objectWithoutProperties(_state$dialogs, [action.payload.key]);

        return { snackbars: state.snackbars, dialogs: dialogs };
      }
    default:
      return state;
  }
};

//
// Helper Functions
// ----------------------------------------------------------------------------

exports.reducer = reducer;
var count = 0;

/**
 * Gets keys, props and a close function
 */
var getKeyProps = function getKeyProps(first, second, dispatch, closeAction) {
  var key = void 0;
  var propsOrGetProps = void 0;

  // Define key and props
  if (typeof first === 'string') {
    key = first;
    propsOrGetProps = second;
  } else {
    count += 1;
    key = 'Snackbar_' + count;
    propsOrGetProps = first;
  }

  var close = function close() {
    dispatch(closeAction(key));
  };

  var props = typeof propsOrGetProps === 'function' ? propsOrGetProps(close, key) : propsOrGetProps;

  var props_ = _extends({}, props, {

    // Set default props
    timestamp: Date.now(),
    open: true,

    // override onClose
    onClose: function onClose(event, reason) {
      close();

      // dialog and snackbar have same onClose function arguments
      // https://material-ui.com/api/snackbar/
      // https://material-ui.com/api/dialog/#dialog-api
      if (props.onClose) props.onClose(event, reason);
    }
  });

  return { key: key, props: props_ };
};

//
// Action Creators
// ----------------------------------------------------------------------------

var closeSnackbar = exports.closeSnackbar = function closeSnackbar(key) {
  return {
    type: CLOSE_SNACKBAR,
    payload: { key: key }
  };
};

var closeDialog = exports.closeDialog = function closeDialog(key) {
  return {
    type: CLOSE_DIALOG,
    payload: { key: key }
  };
};

var openSnackbar = exports.openSnackbar = function openSnackbar(keyOrPropsOrGetProps, propsOrGetProps) {
  return function (dispatch) {
    var payload = getKeyProps(keyOrPropsOrGetProps, propsOrGetProps, dispatch, closeSnackbar);
    dispatch({ type: OPEN_SNACKBAR, payload: payload });
  };
};

var openDialog = exports.openDialog = function openDialog(keyOrPropsOrGetProps, propsOrGetProps) {
  return function (dispatch) {
    var payload = getKeyProps(keyOrPropsOrGetProps, propsOrGetProps, dispatch, closeDialog);
    dispatch({ type: OPEN_DIALOG, payload: payload });
  };
};