import React, { Component } from 'react';

class ComponentTree extends Component {
  render() {
    const { components } = this.props;
    const value = components.components;
    console.log(value);

    return (
      <div>
        <p>
          Components: { value.length }
        </p>
        <p>
          { value }
        </p>
      </div>
    );
  }
}

export default ComponentTree;
