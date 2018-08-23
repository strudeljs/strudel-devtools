import React, { Component } from 'react';

class EventItem extends Component {
  render() {
    const { event } = this.props;

    return (
      <li className="item event">
        <span className="eventName">{event.eventName}</span>
        <span className="by small">by</span>
        <span className="small">
          <span>&lt;</span><span className="name">{event.name}</span><span>&gt;</span>
        </span>
        <span className="timestamp">{(new Date(event.timestamp)).toString().match(/\d\d:\d\d:\d\d/)[0]}</span>
      </li>
    )
  }
}


export default EventItem;
