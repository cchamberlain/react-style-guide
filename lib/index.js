"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleGuideItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _slugify = require("slugify");

var _slugify2 = _interopRequireDefault(_slugify);

var _highlight = require("highlight.js/lib/highlight.js");

var _highlight2 = _interopRequireDefault(_highlight);

var _xml = require("highlight.js/lib/languages/xml");

var _xml2 = _interopRequireDefault(_xml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import reactElementToJsxString from "react-element-to-jsx-string-compat";


_highlight2.default.registerLanguage('xml', _xml2.default);

function highlightMarkup(markup) {
  return _highlight2.default.highlightAuto(markup).value;
}

var StyleGuideItem = exports.StyleGuideItem = function (_React$Component) {
  _inherits(StyleGuideItem, _React$Component);

  function StyleGuideItem(props) {
    _classCallCheck(this, StyleGuideItem);

    var _this = _possibleConstructorReturn(this, (StyleGuideItem.__proto__ || Object.getPrototypeOf(StyleGuideItem)).call(this, props));

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

  _createClass(StyleGuideItem, [{
    key: "render",
    value: function render() {
      //const markup = this.props.staticMarkup || reactElementToJsxString(this.props.children);
      var markup = this.props.staticMarkup || (this.props.children ? this.props.children.toString() : "N/A");

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