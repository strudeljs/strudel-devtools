import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import ComponentsTab from './views/components/ComponentsTab';
import EventsTab from './views/events/EventsTab.js';

const NoMatch = () => (
  <p>No Match</p>
);

class App extends Component {
  render() {
    const { theme } = this.props;
    const className = `app ${theme}`;

    return (
      <div className={className}>
        <Header />
        <Switch>
          <Route path="/components" component={ComponentsTab} />
          <Route path="/events" component={EventsTab} />
          <Route path="/" render={() => (<Redirect to="/components" />)} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
