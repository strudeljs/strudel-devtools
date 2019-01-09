import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentItem from './ComponentItem';
import ScrollPane from '../../components/ScrollPane';
import { selectComponent, scrollIntoView } from '../../../core/actions';

class ComponentList extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange(e) {
    this.setState({
      input: e.target.value,
    })
  }

  render() {
    const components = this.props.components.filter(component => 
      component.strudelProps.name.toLowerCase().includes(this.state.input.toLowerCase()))

    return (
      <div>
        <input
          className="input" 
          value={this.state.input} 
          placeholder="Filter components" 
          type="text" 
          onChange={this.onInputChange.bind(this)}/>
        <ScrollPane>
          <ul className="list">
            {components.map((component, i) => {
              return (
                <ComponentItem
                  key={i}
                  name={component.strudelProps.name}
                  selected={component.id === this.props.selectedComponentId}
                  itemClickHandler={() => this.props.selectComponent(component.id)}
                  crosshairClickHandler={() => this.props.scrollIntoView(component.id)}></ComponentItem>
              )
            })}
          </ul>
        </ScrollPane>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  selectComponent: (id) => {
    dispatch(selectComponent(id));
  },
  scrollIntoView: (id) => {
    dispatch(scrollIntoView(id));
  },
});

export default connect(null, mapDispatchToProps)(ComponentList);
