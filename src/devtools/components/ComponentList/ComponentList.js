import React, { Component } from 'react';
import { connect } from 'react-redux'
import ComponentItem from './ComponentItem';
import { aliasCreators } from './../../../core/aliases';

class ComponentList extends Component {
  render() {
    return (
      <div>
        <input className="input" placeholder="Filter components" type="text" />
        <ul className="list">
          {this.props.components.map((component, i) => {
            return (
              <ComponentItem
                key={i}
                name={component.strudelProps.name}
                selected={component.id === this.props.selectedComponentId}
                clickHandler={() => this.props.selectComponent(component.id)}></ComponentItem>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectComponent: (id) => {
    dispatch(aliasCreators.selectComponent({ id }));
  }
})

export default connect(null, mapDispatchToProps)(ComponentList);
