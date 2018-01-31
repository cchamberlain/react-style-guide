import React from "react";
import PropTypes from "prop-types";
import slugify from "slugify";
import hl from "highlight.js/lib/highlight.js";
import xml from "highlight.js/lib/languages/xml";

hl.registerLanguage('xml', xml);

function highlightMarkup (markup) {
  return hl.highlightAuto(markup).value;
}

export default class StyleGuideItem extends React.Component {
  static propTypes = {
    // Content
    title: PropTypes.string,
    description: PropTypes.string,
    descriptionIsHtml: PropTypes.bool,
    staticMarkup: PropTypes.string,

    // Behavior
    highlighter: PropTypes.func,
    expandingMarkup: PropTypes.bool,
    markupExpandedByDefault: PropTypes.bool,
    sectionLink: PropTypes.bool,
    sectionId: PropTypes.string,

    // Classes and Markup
    headingTag: PropTypes.string,
    componentClass: PropTypes.string,
    headingClass: PropTypes.string,
    descriptionClass: PropTypes.string,
    exampleClass: PropTypes.string,
    markupClass: PropTypes.string,
    anchorClass: PropTypes.string,
    expanderSectionClass: PropTypes.string,
    expanderClass: PropTypes.string,

    // Text
    expanderInactiveText: PropTypes.string,
    expanderActiveText: PropTypes.string
  };

  static defaultProps = {
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

  constructor (props) {
    super(props);
    this.state = {
      markupExpanded: props.markupExpandedByDefault
    };
  }

  toggleExpander = () => {
    this.setState({
      markupExpanded: !this.state.markupExpanded
    });
  }

  renderTitle = () => {
    if (!this.props.title) return null;

    const HeadingTag = this.props.headingTag;
    const sectionId = slugify(this.props.title);
    const titleElement = this.props.sectionAnchor ? (
      <a className={this.props.anchorClass} href={"#" + sectionId}>
        {this.props.title}
      </a>
    ) : this.props.title;

    return (
      <HeadingTag id={sectionId} className={this.props.headingClass}>
        {titleElement}
      </HeadingTag>
    );
  };

  renderDescription = () => {
    if (!this.props.description) return null;

    if (this.props.descriptionIsHtml) {
      return (
        <div 
          className={this.props.descriptionClass} 
          dangerouslySetInnerHTML={{__html: this.props.description}} 
        />
      );
    }

    return (
      <div className={this.props.descriptionClass}>
        <p>{this.props.description}</p>
      </div>
    );
  };

  renderMarkup = () => {
    if (this.props.expandingMarkup && !this.state.markupExpanded) return null;
    if(!this.props.staticMarkup) return null;

    if (this.props.highlighter) {
      return (
        <pre 
          className={this.props.markupClass} 
          dangerouslySetInnerHTML={{__html: this.props.highlighter(this.props.staticMarkup)}}
        />
      );
    }

    return (
      <pre className={this.props.markupClass}>
        {this.props.staticMarkup}
      </pre>
    );
  };

  renderExpander = () => {
    if (!this.props.expandingMarkup) return null;

    return (
      <div className={this.props.expanderSectionClass}>
        <button
          className={this.props.expanderClass}
          onClick={this.toggleExpander}
          type="button"
        >
          {this.state.markupExpanded ? this.props.expanderActiveText : this.props.expanderInactiveText}
        </button>
      </div>
    )
  };

  render () {

    return (
      <div className={this.props.componentClass}>
        {this.renderTitle()}
        {this.renderDescription()}
        <div className={this.props.exampleClass}>
          {this.props.children}
        </div>
        {this.renderMarkup()}
        {this.renderExpander()}
      </div>
    );
  }
}
