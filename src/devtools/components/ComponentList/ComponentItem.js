import React, { Component } from 'react';

class ComponentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  handleClick() {
    this.setState(() => ({
      selected: true
    }));
  }

  render() {
    const className = `item ${this.state.selected ? 'selected' : ''}`;

    return (
      <p className={className} onClick={this.handleClick.bind(this)}>
        <span>&lt;</span>{this.props.name}<span>&gt;</span>
      </p>
    )
  }
}

export default ComponentItem;
