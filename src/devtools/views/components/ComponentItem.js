import React, { Component } from 'react';
import Button from '../../components/Button';

class ComponentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  eyeClickHandler(event) {
    event.stopPropagation();
    this.props.eyeClickHandler();
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
          <Button class="eye" ariaLabel="Scroll element into view" clickHandler={this.eyeClickHandler.bind(this)} />
          <Button class="crosshair" ariaLabel="Inspect element" clickHandler={this.crosshairClickHandler.bind(this)} />
      </p>
    )
  }
}

export default ComponentItem;
