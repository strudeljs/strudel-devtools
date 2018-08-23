import React, { Component } from 'react';
import StateInspector from '../../components/StateInspector';

class EventInspector extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="event-inspector">
        <h2>event info</h2>
        <StateInspector data={data}/>
      </div>
    )
  }
}

export default EventInspector;
