import React, { Component } from 'react';

class ComponentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  render() {
    const className = `item ${this.props.selected ? 'selected' : ''}`;

    return (
      <p className={className} onClick={() => this.props.clickHandler()}>
        <span>&lt;</span>{this.props.name}<span>&gt;</span>
      </p>
    )
  }
}

export default ComponentItem;
