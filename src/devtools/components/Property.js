import React, { Component } from 'react';

const isPlainObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const valueType = (value) => {
  const type = typeof value;

  if (value == null || !value) {
    return 'null'
  } else if (
    type === 'boolean' ||
    type === 'number'
  ) {
    return 'literal';
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

  render() {
    const { prop, value } = this.props;
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
                return (<Property key={i} prop={i} value={val}/>)
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
              return (<Property key={prop} prop={k} value={value[k]}/>)
            })}
            </div>
          </div>
        );
        break;
      default:
        return (
          <div className="property" key={prop} onClick={this.toggleCollapsed.bind(this)}>
            <span className="key">{prop}</span>
            <span className="colon">:</span>
            <span className={valueClassName}>
              {type === 'string' && ( <span>"</span> ) }
              {value}
              {type === 'string' && ( <span>"</span> ) }
            </span>
          </div>
        )
    }
  }
}

export default Property;
