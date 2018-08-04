import React, { Component } from 'react';
import styles from './ComponentList.css';

class ComponentItem extends Component {
  render() {
    return (
      <p className={styles.item}>&lt;{this.props.name}&gt;</p>
    )
  }
}

export default ComponentItem;
