import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventsList from './EventsList';
import SplitPane from '../../components/SplitPane';
import ScrollPane from '../../components/ScrollPane';

class EventsContainer extends Component {
  render() {
    const { events } = this.props;

    return (
      <div>
        <SplitPane>
          <EventsList key="left" events={events}/>
          <ScrollPane key="right">
            asdf
          </ScrollPane>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('STATE', state);

  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(EventsContainer);
