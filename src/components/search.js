'use strict'

var React = require('react'),
    Reflux = require('reflux');

var actions = require('../actions/actions');

module.exports = React.createClass({
  filter: function (e) {
    actions.filterList(e.target.value);
  },
  render: function () {
    return (
      <input type='text' placeholder='Search' onChange={this.filter} />
    )
  }
});