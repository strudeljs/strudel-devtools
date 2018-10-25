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
        <button className="crosshair" aria-label="Find instance on the page"></button>
      </p>
    )
  }
}

export default ComponentItem;
