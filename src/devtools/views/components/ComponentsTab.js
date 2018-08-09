import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentList from '../../components/ComponentList/ComponentList';
import ComponentInspector from '../../components/ComponentInspector/ComponentInspector';

class ComponentsContainer extends Component {
  render() {
    const { components } = this.props;

    return (
      <div>
        <div className="column">
          <ComponentList components={components}/>
        </div>
        <div className="column">
          <ComponentInspector/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    components: state.components
  };
};

export default connect(mapStateToProps)(ComponentsContainer);