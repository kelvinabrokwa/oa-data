'use strict';

var React = require('react'),
    Reflux = require('reflux');

module.exports = React.createClass({
  render: function () {
    var data_obj = {};
    this.props.data.forEach(function (country) {
      data_obj[country] = {fillKey: 'result'};
    });
    this.props.data = data_obj;
    return (
      <div>
        <Map data={this.props.data} />
      </div>
    );
  }
});

var Map = React.createClass({
  componentDidMount: function () {
    this.map = new Datamap({
      element: this.refs.map.getDOMNode(),
      scope: 'world',
      fills: {
        result: '#3887be',
        defaultFill: '#afafaf'
      },
      height: window.innerWidth / 5,
      width: window.innerWidth / 2,
      data: this.props.data
    });
  },
  componentDidUpdate: function () {
    this.map.updateChoropleth(this.props.data);
  },
  render: function () {
    return (
      <div id='map_container'>
        <div id='map' ref='map'></div>
      </div>
    );
  }
});