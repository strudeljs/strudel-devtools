import React, { Component } from 'react';
import EventItem from './EventItem';
import ScrollPane from '../../components/ScrollPane';
import { connect } from 'react-redux';
import { flushEvent, selectEvent } from '../../../core/actions';
import fuzzysearch from 'fuzzysearch';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      filter: ''
    };
  }

  handleItemClick(index, event) {
    this.setState({
      active: index
    });
    this.props.dispatch(selectEvent(event));
  }

  getFilteredEvents() {
    return this.props.events.filter((event) => {
      return fuzzysearch(this.state.filter, event.eventName);
    })
  }

  handleFilter(event) {
    this.setState({
      filter: event.target.value
    });
  }

  handleClear() {
    this.props.dispatch(flushEvent());
  }

  render() {
    const active = this.state.active;

    return (
      <div>
        <div className="filter">
          <input className="input" onChange={this.handleFilter.bind(this)} placeholder="Filter events" type="text" />
          <button className="clear" onClick={this.handleClear.bind(this)}>Clear</button>
        </div>
        <ScrollPane>
          <ul className="list list--event">
            {this.getFilteredEvents().map((event, i) => {
              return (<EventItem
                key={i}
                event={event}
                active={active === i}
                onClick={this.handleItemClick.bind(this, i, event)}></EventItem>)
            })}
          </ul>
        </ScrollPane>
      </div>
    )
  }
}

export default connect(null, null)(EventList);
