import React, { Component } from 'react';
import ComponentItem from './ComponentItem';

class ComponentList extends Component {
  render() {
    return (
      <div>
        <input className="input" placeholder="Filter components" type="text" />
        <ul className="list">
          {this.props.components.map((component, i) => {
            return (<ComponentItem key={i} name={component.name}></ComponentItem>)
          })}
        </ul>
      </div>
    )
  }
}

export default ComponentList;
