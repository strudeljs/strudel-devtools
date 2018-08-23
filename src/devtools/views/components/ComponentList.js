import React, { Component } from 'react';
import ComponentItem from './ComponentItem';
import ScrollPane from '../../components/ScrollPane';

class ComponentList extends Component {
  render() {
    return (
      <div>
        <input className="input" placeholder="Filter components" type="text" />
        <ScrollPane>
          <ul className="list">
            {this.props.components.map((component, i) => {
              return (<ComponentItem key={i} component={component}></ComponentItem>)
            })}
          </ul>
        </ScrollPane>
      </div>
    )
  }
}

export default ComponentList;
