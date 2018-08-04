import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import styles from './Header.css';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <img className={styles.logo} src={logo} alt="Strudel"/>
        <h1 className={styles.heading}>Detected Strudel {this.props.version}</h1>
      </div>
    )
  }
}

export default Header;
