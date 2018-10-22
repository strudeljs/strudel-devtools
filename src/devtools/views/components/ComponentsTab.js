import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentList from './ComponentList';
import ComponentInspector from './ComponentInspector';
import SplitPane from '../../components/SplitPane';
import ScrollPane from '../../components/ScrollPane';

class ComponentsTab extends Component {
  render() {
    const { components, selectedComponentId } = this.props;

    return (
      <div>
        <SplitPane>
          <ComponentList key="left" components={components} selectedComponentId={selectedComponentId}/>
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
    components: state.components,
    selectedComponentId: state.selectedComponentId,
  };
};

export default connect(mapStateToProps)(ComponentsTab);
