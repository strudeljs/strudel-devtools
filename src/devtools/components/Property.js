import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './Button';

const isPlainObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const valueType = (value) => {
  const type = typeof value;

  if (
    type === 'boolean' ||
    type === 'number'
  ) {
    return 'literal';
  } else if (value === 'HTMLElement' || (value && value.__STRUDEL_DEVTOOLS__ISNODE__)) {
    return 'HTML-element';
  } else if (type === 'string') {
    return 'string';
  } else if (Array.isArray(value)) {
    return 'array';
  } else if (isPlainObject(value)) {
    return 'plain-object';
  } else {
    return 'unknown';
  }
}

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  toggleCollapsed(e) {
    this.setState(() => ({
      collapsed: !this.state.collapsed
    }));
    e.stopPropagation();
  }

  HTMLElemInspect(e) {
    const { parent, prop, selectedComponentId, value } = this.props;
    if (value && value._isNode) {
      const ev = `inspect(window.__STRUDEL_DEVTOOLS_INSTANCE_MAP__.get(${selectedComponentId}).__strudel__.$element._nodes[0])`;
      chrome.devtools.inspectedWindow.eval(ev);
    } else {
      const pathToParent = `${parent}._nodes`;
      const ev = `inspect(window.__STRUDEL_DEVTOOLS_INSTANCE_MAP__.get(${selectedComponentId}).__strudel__.${pathToParent}[${prop}])`;
      chrome.devtools.inspectedWindow.eval(ev);
    }

    e.stopPropagation();
  }

  render() {
    const { prop, value, parent, selectedComponentId } = this.props;
    const type = valueType(value);
    const valueClassName = `value ${type}`;
    const childrenClassName = `children${this.state.collapsed ? ' is-hidden' : ''}`;
    const arrowClassName = `arrow${this.state.collapsed ? ' right' : ' bottom'}`;

    switch (type) {
      case 'array':
        return (
          <div className="property" key={prop} onClick={this.toggleCollapsed.bind(this)}>
            <span className={arrowClassName}></span>
            <span className="key">{prop}</span>
            <span className="colon">:</span>
            <span className={valueClassName}>Array[{value.length}]</span>
            <div className={childrenClassName}>
              {value.map((val, i) => {
                return (
                  <Property key={i} prop={i} parent={parent ? parent : ''} selectedComponentId={selectedComponentId} value={prop === '_nodes' ? 'HTMLElement' : val}
                />)
              })}
            </div>
          </div>
        );
        break;
      case 'plain-object':
        return (
          <div className="property" key={prop} onClick={this.toggleCollapsed.bind(this)}>
            <span className={arrowClassName}></span>
            <span className="key">{prop}</span>
            <span className="colon">:</span>
            <span className={valueClassName}>Object</span>
            <div className={childrenClassName}>
            {Object.keys(value).map((k, i) => {
              return (
                <Property key={prop} prop={k} parent={parent ? parent : ''}  selectedComponentId={selectedComponentId} value={value[k]}
              />)
            })}
            </div>
          </div>
        );
        break;
      case 'HTML-element':
        return (
          <div className="property" key={prop}>
            <span className="key">{prop}</span>
            <span className="colon">:</span>
            <span className={valueClassName}>
              HTMLElement
              <Button class="crosshair" ariaLabel="Inspect element" clickHandler={this.HTMLElemInspect.bind(this)} />
            </span>
          </div>
        );
        break;
      default:
        let processedValue = value;
        if (value === null) processedValue = 'null';
        return (
          <div className="property" key={prop} onClick={this.toggleCollapsed.bind(this)}>
            <span className="key">{prop}</span>
            <span className="colon">:</span>
            <span className={valueClassName}>
              {type === 'string' && ( <span>"</span> ) }
              {processedValue}
              {type === 'string' && ( <span>"</span> ) }
            </span>
          </div>
        )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedComponentId: state.selectedComponentId,
  };
};

export default connect(mapStateToProps)(Property);
