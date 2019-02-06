import React, { Component } from 'react';

const Button = (props) => {
  return (
    <button
      className={props.class}
      aria-label={props.ariaLabel}
      onClick={props.clickHandler}></button>
  )
};

export default Button;
