import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentList from '../../components/ComponentList/ComponentList';
import ComponentInspector from '../../components/ComponentInspector/ComponentInspector';

class ComponentsContainer extends Component {
  render() {
    const { components, selectedComponentId } = this.props;
    const selectedComponent = components.find(component => component.id === selectedComponentId);

    return (
      <div>
        <div className="column">
          <ComponentList
            components={components}
            selectedComponentId={selectedComponentId}/>
        </div>
        <div className="column">
          <ComponentInspector component={selectedComponent}/>
        </div>
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

export default connect(mapStateToProps)(ComponentsContainer);
