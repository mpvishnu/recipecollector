import React, { Component } from 'react';
import './FormBody.css';
import Recipe from './Recipe.js'


class FormBody extends Component {
  render() {
    return (
      <div className="fb1">
        <h3>Form</h3>
        {/* Components to display Recipe name and a ratings widget */}
        <Recipe rid="1" />
        <Recipe rid="2" />
        <Recipe rid="3" />
        <p>Want to rate more recipes? Click Below!</p>
        
      </div>
    );
  }
}

export default FormBody;