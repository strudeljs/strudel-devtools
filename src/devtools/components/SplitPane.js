import React, { Component } from 'react';

class SplitPane extends Component {
  getComponent(key) {
    return this.props.children.filter((comp) => {
      return comp.key === key;
    });
  }

  render() {
    return (
      <div>
        <div className="column">
          {this.getComponent('left')}
        </div>
        <div className="column">
          {this.getComponent('right')}
        </div>
      </div>
    )
  }
}

export default SplitPane;
