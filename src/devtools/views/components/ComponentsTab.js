import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentList from './ComponentList';
import ComponentInspector from './ComponentInspector';
import SplitPane from '../../components/SplitPane';
import ScrollPane from '../../components/ScrollPane';

class ComponentsTab extends Component {
  render() {
    const { components } = this.props;

    return (
      <div>
        <SplitPane>
          <ComponentList key="left" components={components}/>
          <ScrollPane key="right">
            <ComponentInspector/>
          </ScrollPane>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    components: state.components
  };
};

export default connect(mapStateToProps)(ComponentsTab);
