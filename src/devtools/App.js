import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import ComponentList from './components/ComponentList/ComponentList';

class App extends Component {
  render() {
    const { components, version } = this.props;

    return (
      <div>
        <Header version={version}/>
        <ComponentList components={components}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    components: state.components,
    version: state.version
  };
};

export default connect(mapStateToProps)(App);
