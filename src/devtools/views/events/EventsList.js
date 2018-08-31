import React, { Component } from 'react';
import EventItem from './EventItem';
import ScrollPane from '../../components/ScrollPane';
import { connect } from 'react-redux';
import { flushEvent } from '../../../core/actions';

class EventsList extends Component {
  handleClear() {
    this.props.dispatch(flushEvent());
  }

  render() {
    return (
      <div>
        <div className="filter">
          <input className="input" placeholder="Filter events" type="text" />
          <button className="clear" onClick={this.handleClear.bind(this)}>Clear</button>
        </div>
        <ScrollPane>
          <ul className="list list--event">
            {this.props.events.map((event, i) => {
              return (<EventItem key={i} event={event}></EventItem>)
            })}
          </ul>
        </ScrollPane>
      </div>
    )
  }
}

export default connect(null, null)(EventsList);
