import React, { Component } from 'react';

class ComponentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  crosshairClickHandler(event) {
    event.stopPropagation();
    this.props.crosshairClickHandler();
  }

  render() {
    const className = `item ${this.props.selected ? 'selected' : ''}`;

    return (
      <p className={className} onClick={this.props.itemClickHandler.bind(this)}>
        <span>&lt;</span>{this.props.name}<span>&gt;</span>
        <button
          className="crosshair" 
          aria-label="Scroll element into view"
          onClick={this.crosshairClickHandler.bind(this)}></button>
      </p>
    )
  }
}

export default ComponentItem;
