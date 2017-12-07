import React, { Component } from 'react';

class ComponentTree extends Component {
  render() {
    const { components } = this.props;
    const value = components.components;

    return (
      <p>
        Components: { value.length }
      </p>
    );
  }
}

export default ComponentTree;
