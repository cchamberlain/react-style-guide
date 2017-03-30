import React from "react";
import reactElementToJsxString from "react-element-to-jsx-string";
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

  renderMarkup = (markup) => {
    if (this.props.expandingMarkup && !this.state.markupExpanded) return null;

    if (this.props.highlighter) {
      return (
        <pre 
          className={this.props.markupClass} 
          dangerouslySetInnerHTML={{__html: this.props.highlighter(markup)}}
        />
      );
    }

    return (
      <pre className={this.props.markupClass}>
        {markup}
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
    const markup = this.props.staticMarkup || reactElementToJsxString(this.props.children);

    return (
      <div className={this.props.componentClass}>
        {this.renderTitle()}
        {this.renderDescription()}
        <div className={this.props.exampleClass}>
          {this.props.children}
        </div>
        {this.renderMarkup(markup)}
        {this.renderExpander()}
      </div>
    );
  }
}