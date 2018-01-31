"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

_highlight2.default.registerLanguage('xml', _xml2.default);

function highlightMarkup(markup) {
  return _highlight2.default.highlightAuto(markup).value;
}

var StyleGuideItem = function (_React$Component) {
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

    _this.renderMarkup = function () {
      if (_this.props.expandingMarkup && !_this.state.markupExpanded) return null;
      if (!_this.props.staticMarkup) return null;

      if (_this.props.highlighter) {
        return _react2.default.createElement("pre", {
          className: _this.props.markupClass,
          dangerouslySetInnerHTML: { __html: _this.props.highlighter(_this.props.staticMarkup) }
        });
      }

      return _react2.default.createElement(
        "pre",
        { className: _this.props.markupClass },
        _this.props.staticMarkup
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
        this.renderMarkup(),
        this.renderExpander()
      );
    }
  }]);

  return StyleGuideItem;
}(_react2.default.Component);

StyleGuideItem.propTypes = {
  // Content
  title: _propTypes2.default.string,
  description: _propTypes2.default.string,
  descriptionIsHtml: _propTypes2.default.bool,
  staticMarkup: _propTypes2.default.string,

  // Behavior
  highlighter: _propTypes2.default.func,
  expandingMarkup: _propTypes2.default.bool,
  markupExpandedByDefault: _propTypes2.default.bool,
  sectionLink: _propTypes2.default.bool,
  sectionId: _propTypes2.default.string,

  // Classes and Markup
  headingTag: _propTypes2.default.string,
  componentClass: _propTypes2.default.string,
  headingClass: _propTypes2.default.string,
  descriptionClass: _propTypes2.default.string,
  exampleClass: _propTypes2.default.string,
  markupClass: _propTypes2.default.string,
  anchorClass: _propTypes2.default.string,
  expanderSectionClass: _propTypes2.default.string,
  expanderClass: _propTypes2.default.string,

  // Text
  expanderInactiveText: _propTypes2.default.string,
  expanderActiveText: _propTypes2.default.string
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