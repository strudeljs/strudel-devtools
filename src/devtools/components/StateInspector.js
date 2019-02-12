import React, { Component } from 'react';
import Property from './Property';

class StateInspector extends Component {
  render() {
    const { data, isParent } = this.props;

    return (
      <div className="inspector">
        { data ?
          (Object.keys(data).map((key, i) => {
            return (<Property key={key} prop={key} value={data[key]} parent={isParent === true ? key : ''}/>)
          })) : ('No data')
        }
      </div>
    )
  }
}

export default StateInspector;
