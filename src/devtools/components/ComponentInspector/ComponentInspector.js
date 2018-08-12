import React, { Component } from 'react';

class ComponentInspector extends Component {
  render() {
    let noComponentSelectedMsg;
    let inspector;

    if (this.props.component) {
      inspector = 
        <div>
          <p>Selector: {this.props.component.strudelProps.selector}</p>
        </div>;
    } else {
      noComponentSelectedMsg = 
        <div>
          <p className="empty">Select a component instance to inspect</p>
        </div>;
    }

    return this.props.component ? inspector : noComponentSelectedMsg;
  }
}

export default ComponentInspector;
