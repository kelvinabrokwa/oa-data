'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    var output = JSON.stringify(this.props.data);
    return (
      <p>{output}</p>
    )
  }
});