import React, { Component } from 'react';
import styles from './ComponentList.css';
import ComponentItem from './ComponentItem';

class ComponentList extends Component {
  render() {
    return (
      <div>
        <input className={styles.input} placeholder="Filter components" type="text" />
        <ul className={styles.list}>
          {this.props.components.map((component, i) => {
            return (<ComponentItem key={i} name={component.name}></ComponentItem>)
          })}
        </ul>
      </div>
    )
  }
}

export default ComponentList;
