import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selected } from '../../../core/actions';

class ComponentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  handleClick() {
    this.setState(() => ({
      selected: true
    }));
    this.props.dispatch(selected(this.props.component.id));
  }

  render() {
    const className = `item ${this.state.selected ? 'selected' : ''}`;

    return (
      <li className={className} onClick={this.handleClick.bind(this)}>
        <span>&lt;</span>{this.props.component.name}<span>&gt;</span>
      </li>
    )
  }
}


export default connect(null, null)(ComponentItem);
