import React, { Component } from 'react';
import { connect } from 'react-redux';
import StateInspector from '../../components/StateInspector';

class ComponentInspector extends Component {

  render() {
    const data = this.props.selectedComponentData;

    return data ?
      <div>
        <h2 className="inspector-heading item">
          <span>&lt;</span>{data.info.name}<span>&gt;</span>
        </h2>
        <StateInspector data={data.info}/>
        <h3 className="inspector-heading">Elements</h3>
        <StateInspector data={data.elements}/>
        <h3 className="inspector-heading">Properties</h3>
        <StateInspector data={data.properties}/>
        <h3 className="inspector-heading">Data attributes</h3>
        <StateInspector data={data.dataAttrs}/>
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
