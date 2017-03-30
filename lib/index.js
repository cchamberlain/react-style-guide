"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactElementToJsxString = require("react-element-to-jsx-string");

var _reactElementToJsxString2 = _interopRequireDefault(_reactElementToJsxString);

var _slugify = require("slugify");

var _slugify2 = _interopRequireDefault(_slugify);

var _highlight = require("highlight.js/lib/highlight.js");

var _highlight2 = _interopRequireDefault(_highlight);

var _xml = require("highlight.js/lib/languages/xml");

var _xml2 = _interopRequireDefault(_xml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highlight2.default.registerLanguage('xml', _xml2.default);

function highlightMarkup(markup) {
  return _highlight2.default.highlightAuto(markup).value;
}

var StyleGuideItem = function (_React$Component) {
  (0, _inherits3.default)(StyleGuideItem, _React$Component);

  function StyleGuideItem(props) {
    (0, _classCallCheck3.default)(this, StyleGuideItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StyleGuideItem.__proto__ || (0, _getPrototypeOf2.default)(StyleGuideItem)).call(this, props));

    _this.toggleExpander = function () {
      _this.setState({
        markupExpanded: !_this.state.markupExpanded
      });
    };

    _this.renderTitle = function () {
      if (!_this.props.title) return null;

      var HeadingTag = _this.props.headingTag;
      var sectionId = (0, _slugify2.default)(_this.props.title);
      var titleElement = _this.props.sectionAnchor ? _react2.default.createElement(
        "a",
        { className: _this.props.anchorClass, href: "#" + sectionId },
        _this.props.title
      ) : _this.props.title;

      return _react2.default.createElement(
        HeadingTag,
        { id: sectionId, className: _this.props.headingClass },
        titleElement
      );
    };

    _this.renderDescription = function () {
      if (!_this.props.description) return null;

      if (_this.props.descriptionIsHtml) {
        return _react2.default.createElement("div", {
          className: _this.props.descriptionClass,
          dangerouslySetInnerHTML: { __html: _this.props.description }
        });
      }

      return _react2.default.createElement(
        "div",
        { className: _this.props.descriptionClass },
        _react2.default.createElement(
          "p",
          null,
          _this.props.description
        )
      );
    };

    _this.renderMarkup = function (markup) {
      if (_this.props.expandingMarkup && !_this.state.markupExpanded) return null;

      if (_this.props.highlighter) {
        return _react2.default.createElement("pre", {
          className: _this.props.markupClass,
          dangerouslySetInnerHTML: { __html: _this.props.highlighter(markup) }
        });
      }

      return _react2.default.createElement(
        "pre",
        { className: _this.props.markupClass },
        markup
      );
    };

    _this.renderExpander = function () {
      if (!_this.props.expandingMarkup) return null;

      return _react2.default.createElement(
        "div",
        { className: _this.props.expanderSectionClass },
        _react2.default.createElement(
          "button",
          {
            className: _this.props.expanderClass,
            onClick: _this.toggleExpander,
            type: "button"
          },
          _this.state.markupExpanded ? _this.props.expanderActiveText : _this.props.expanderInactiveText
        )
      );
    };

    _this.state = {
      markupExpanded: props.markupExpandedByDefault
    };
    return _this;
  }

  (0, _createClass3.default)(StyleGuideItem, [{
    key: "render",
    value: function render() {
      var markup = this.props.staticMarkup || (0, _reactElementToJsxString2.default)(this.props.children);

      return _react2.default.createElement(
        "div",
        { className: this.props.componentClass },
        this.renderTitle(),
        this.renderDescription(),
        _react2.default.createElement(
          "div",
          { className: this.props.exampleClass },
          this.props.children
        ),
        this.renderMarkup(markup),
        this.renderExpander()
      );
    }
  }]);
  return StyleGuideItem;
}(_react2.default.Component);

StyleGuideItem.propTypes = {
  // Content
  title: _react2.default.PropTypes.string,
  description: _react2.default.PropTypes.string,
  descriptionIsHtml: _react2.default.PropTypes.bool,
  staticMarkup: _react2.default.PropTypes.string,

  // Behavior
  highlighter: _react2.default.PropTypes.func,
  expandingMarkup: _react2.default.PropTypes.bool,
  markupExpandedByDefault: _react2.default.PropTypes.bool,
  sectionLink: _react2.default.PropTypes.bool,
  sectionId: _react2.default.PropTypes.string,

  // Classes and Markup
  headingTag: _react2.default.PropTypes.string,
  componentClass: _react2.default.PropTypes.string,
  headingClass: _react2.default.PropTypes.string,
  descriptionClass: _react2.default.PropTypes.string,
  exampleClass: _react2.default.PropTypes.string,
  markupClass: _react2.default.PropTypes.string,
  anchorClass: _react2.default.PropTypes.string,
  expanderSectionClass: _react2.default.PropTypes.string,
  expanderClass: _react2.default.PropTypes.string,

  // Text
  expanderInactiveText: _react2.default.PropTypes.string,
  expanderActiveText: _react2.default.PropTypes.string
};
StyleGuideItem.defaultProps = {
  // Content
  title: null,
  description: null,
  descriptionIsHtml: false,
  staticMarkup: null,

  // Behavior
  highlighter: highlightMarkup,
  expandingMarkup: true,
  markupExpandedByDefault: false,
  sectionAnchor: true,

  // Classes and Markup
  headingTag: 'h2',
  componentClass: 'Guide',
  headingClass: 'Guide-heading',
  descriptionClass: 'Guide-description',
  exampleClass: 'Guide-example',
  markupClass: 'Guide-markup',
  anchorClass: 'Guide-anchor',
  expanderSectionClass: 'Guide-expanderSection',
  expanderClass: 'Guide-expander',

  // Text
  expanderInactiveText: 'Expand',
  expanderActiveText: 'Collapse'
};
exports.default = StyleGuideItem;