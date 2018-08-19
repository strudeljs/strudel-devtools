import React, { Component } from 'react';

class ComponentInspector extends Component {
  render() {
    let { component } = this.props;
    let noComponentSelectedMsg;
    let inspector;

    if (component) {
      inspector = 
        <div>
          <h2 className="inspector-heading item">
            <span>&lt;</span>{component.strudelProps.name}<span>&gt;</span>
          </h2>
          <div className="inspector-content">
            <p className="inspector-item">
              <span>selector: </span><span>{component.strudelProps.selector}</span>
            </p>
          </div>
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
