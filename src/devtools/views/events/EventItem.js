import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventItem extends Component {
  render() {
    const { event, active, onClick } = this.props;
    const className = `item event ${active ? 'selected' : ''}`;

    return (
      <li className={className} onClick={onClick}>
        <span className="eventName">{event.eventName}</span>
        <span className="by small">by</span>
        <span className="small">
          <span>&lt;</span><span className="name">{event.source}</span><span>&gt;</span>
        </span>
        <span className="timestamp">{(new Date(event.timestamp)).toString().match(/\d\d:\d\d:\d\d/)[0]}</span>
      </li>
    )
  }
}

export default connect(null, null)(EventItem);
