'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () { 
    var output = [];
    this.props.data.forEach(function(country) {
      var key = Object.keys(country)[0];
      output.push(
        <Table country={key} data={country[key]}/>
      );
    });
    return (
      <div>
        {output}
      </div>
    );
  }
});

var Table = React.createClass({
  render: function () {
    var raw = this.props.data;
    var output = []
    raw.forEach(function (r) {
      output.push(
        <Row
          json={r.json}
          name={r.name}
          type={r.type}
          csv={r.csv}
        />
      );
    });
    return (
      <div>
        <h3 id='country'>{this.props.country}</h3>
        <table>
          <thead>
            <tr>
              <th className='name-col'>Name</th>
              <th className='type-col'>Type</th>
              <th className='dl-col'>Download</th>
            </tr>
          </thead>
          <tbody>
            {output}
          </tbody>
        </table>
      </div>
    )
  }
});

var Row = React.createClass({
  render: function () {
    return (
      <tr>
        <td>
          <a href={this.props.json}>{this.props.name}</a>
        </td>
        <td>
          {this.props.type}
        </td>
        <td>
          <a href={this.props.csv}>download</a>
        </td>
      </tr>
    )

  }
});