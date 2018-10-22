import React, { Component } from 'react';
import { connect } from 'react-redux';
import StateInspector from '../../components/StateInspector';

class ComponentInspector extends Component {
  render() {
    return this.props.selectedComponentData ?
      <div>
        <h2 className="inspector-heading item">
          <span>&lt;</span>{this.props.selectedComponentData.name}<span>&gt;</span>
        </h2>
        <StateInspector data={this.props.selectedComponentData}/>
      </div>
      :
      <div>
        <p className="empty">Select a component instance to inspect</p>
      </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedComponentData: state.selectedComponentData,
  };
};

export default connect(mapStateToProps)(ComponentInspector);
