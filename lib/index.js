import React from "react";
import reactElementToJsxString from "react-element-to-jsx-string";
import slugify from "slugify";
import hl from "highlight.js/lib/highlight.js";
import xml from "highlight.js/lib/languages/xml";

hl.registerLanguage('xml', xml);

function highlightMarkup(markup) {
  return hl.highlightAuto(markup).value;
}

export default class StyleGuideItem extends React.Component {

  constructor(props) {
    super(props);

    this.toggleExpander = () => {
      this.setState({
        markupExpanded: !this.state.markupExpanded
      });
    };

    this.renderTitle = () => {
      if (!this.props.title) return null;

      const HeadingTag = this.props.headingTag;
      const sectionId = slugify(this.props.title);
      const titleElement = this.props.sectionAnchor ? React.createElement(
        "a",
        { className: this.props.anchorClass, href: "#" + sectionId },
        this.props.title
      ) : this.props.title;

      return React.createElement(
        HeadingTag,
        { id: sectionId, className: this.props.headingClass },
        titleElement
      );
    };

    this.renderDescription = () => {
      if (!this.props.description) return null;

      if (this.props.descriptionIsHtml) {
        return React.createElement("div", {
          className: this.props.descriptionClass,
          dangerouslySetInnerHTML: { __html: this.props.description }
        });
      }

      return React.createElement(
        "div",
        { className: this.props.descriptionClass },
        React.createElement(
          "p",
          null,
          this.props.description
        )
      );
    };

    this.renderMarkup = markup => {
      if (this.props.expandingMarkup && !this.state.markupExpanded) return null;

      if (this.props.highlighter) {
        return React.createElement("pre", {
          className: this.props.markupClass,
          dangerouslySetInnerHTML: { __html: this.props.highlighter(markup) }
        });
      }

      return React.createElement(
        "pre",
        { className: this.props.markupClass },
        markup
      );
    };

    this.renderExpander = () => {
      if (!this.props.expandingMarkup) return null;

      return React.createElement(
        "div",
        { className: this.props.expanderSectionClass },
        React.createElement(
          "button",
          {
            className: this.props.expanderClass,
            onClick: this.toggleExpander,
            type: "button"
          },
          this.state.markupExpanded ? this.props.expanderActiveText : this.props.expanderInactiveText
        )
      );
    };

    this.state = {
      markupExpanded: props.markupExpandedByDefault
    };
  }

  render() {
    const markup = this.props.staticMarkup || reactElementToJsxString(this.props.children);

    return React.createElement(
      "div",
      { className: this.props.componentClass },
      this.renderTitle(),
      this.renderDescription(),
      React.createElement(
        "div",
        { className: this.props.exampleClass },
        this.props.children
      ),
      this.renderMarkup(markup),
      this.renderExpander()
    );
  }
}
StyleGuideItem.propTypes = {
  // Content
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  descriptionIsHtml: React.PropTypes.bool,
  staticMarkup: React.PropTypes.string,

  // Behavior
  highlighter: React.PropTypes.func,
  expandingMarkup: React.PropTypes.bool,
  markupExpandedByDefault: React.PropTypes.bool,
  sectionLink: React.PropTypes.bool,
  sectionId: React.PropTypes.string,

  // Classes and Markup
  headingTag: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  headingClass: React.PropTypes.string,
  descriptionClass: React.PropTypes.string,
  exampleClass: React.PropTypes.string,
  markupClass: React.PropTypes.string,
  anchorClass: React.PropTypes.string,
  expanderSectionClass: React.PropTypes.string,
  expanderClass: React.PropTypes.string,

  // Text
  expanderInactiveText: React.PropTypes.string,
  expanderActiveText: React.PropTypes.string
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