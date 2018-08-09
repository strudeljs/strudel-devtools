import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <img className="logo" src={logo} alt="Strudel"/>
        <h1 className="heading">Detected Strudel {this.props.version}</h1>
        <div className="navigation">
          <NavLink to="/components">Components</NavLink>
          <NavLink to="/events">Events</NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    version: state.version
  };
};

export default withRouter(connect(mapStateToProps)(Header));
