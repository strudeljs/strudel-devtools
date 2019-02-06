import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComponentItem from './ComponentItem';
import ScrollPane from '../../components/ScrollPane';
import {
  selectComponent,
  scrollIntoView,
  highlightComponent,
  removeHighlight,
} from '../../../core/actions';

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
                  mouseEnterHandler={() => this.props.highlightComponent(component.id)}
                  mouseLeaveHandler={() => this.props.removeHighlight()}
                  eyeClickHandler={() => this.props.scrollIntoView(component.id)}
                  crosshairClickHandler={() => this.props.inspect(component.id)}></ComponentItem>
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
  inspect: (id) => {
    const ev = `inspect(window.__STRUDEL_DEVTOOLS_INSTANCE_MAP__.get(${id}))`;
    chrome.devtools.inspectedWindow.eval(ev);
  },
  scrollIntoView: (id) => {
    dispatch(scrollIntoView(id));
  },
  highlightComponent: (id) => {
    dispatch(highlightComponent(id));
  },
  removeHighlight: () => {
    dispatch(removeHighlight());
  }
});

export default connect(null, mapDispatchToProps)(ComponentList);
