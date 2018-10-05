import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitPane from '../../components/SplitPane';
import ScrollPane from '../../components/ScrollPane';
import EventList from './EventList';
import EventInspector from './EventInspector';

class EventsContainer extends Component {
  render() {
    const { events, selectedEvent } = this.props;

    return (
      <div>
        <SplitPane>
          <EventList key="left" events={events}/>
          <ScrollPane key="right">
            <EventInspector data={selectedEvent}/>
          </ScrollPane>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    selectedEvent: state.selectedEvent
  };
};

export default connect(mapStateToProps)(EventsContainer);
