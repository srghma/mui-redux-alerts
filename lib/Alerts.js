'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Snackbar = require('@material-ui/core/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cleanAndOrder = function cleanAndOrder(obj) {
  return Object.keys(obj).map(function (key) {
    return _extends({ key: key }, obj[key]);
  }).sort(function (a, b) {
    return a.timestamp - b.timestamp;
  }).map(function (_p) {
    var p = _p;delete p.timestamp;return p;
  });
};

var style = {
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 0px)'
};

var Alerts = function Alerts(_ref) {
  var alerts = _ref.alerts;
  return _react2.default.createElement(
    'div',
    { style: style },
    cleanAndOrder(alerts.snackbars).map(function (p) {
      return _react2.default.createElement(_Snackbar2.default, p);
    }),
    cleanAndOrder(alerts.dialogs).map(function (p) {
      return _react2.default.createElement(_Dialog2.default, p);
    })
  );
};

Alerts.propTypes = {
  alerts: _propTypes2.default.shape({
    dialogs: _propTypes2.default.object.isRequired,
    snackbars: _propTypes2.default.object.isRequired
  }).isRequired
};

exports.default = Alerts;
module.exports = exports.default;