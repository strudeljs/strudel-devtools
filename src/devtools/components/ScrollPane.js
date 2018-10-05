import React, { Component } from 'react';

class ScrollPane extends Component {
  render() {
    return (
      <div className="scrollPane">
        { this.props.children }
      </div>
    )
  }
}

export default ScrollPane;
