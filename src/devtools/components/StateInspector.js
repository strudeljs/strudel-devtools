import React, { Component } from 'react';
import Property from './Property';

class StateInspector extends Component {
  render() {
    const { data } = this.props;

    return (
      <div class="inspector">
        { data ?
          (Object.keys(data).map((key, i) => {
            return (<Property key={key} prop={key} value={data[key]}/>)
          })) : ('No data')
        }
      </div>
    )
  }
}

export default StateInspector;
