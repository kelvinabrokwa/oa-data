'use strict';

var React = require('react');

module.exports = React.createClass({
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
        <table>
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