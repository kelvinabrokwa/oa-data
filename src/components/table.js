'use strict';

var React = require('react');

module.exports = React.createClass({
  render() { 
    return (
      <div>
        {this.props.data.map(country => <Table 
          country={Object.keys(country)[0]}
          data={country[Object.keys(country)[0]]}
       />)}
      </div>
    );
  }
});

var Table = React.createClass({
  render() {
    return (
      <div>
        <h2 id='country'>{this.props.country}</h2>
        <table>
          <thead>
            <tr>
              <th className='name-col'>Name</th>
              <th className='dl-col'>Download</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(d => <Row json={d.json} name={d.name} csv={d.csv} />)}
          </tbody>
        </table>
      </div>
    );
  }
});

var Row = React.createClass({
  render() {
    return (
      <tr>
        <td>
          <a href={this.props.json}>{this.props.name}</a>
        </td>
        <td>
          <a href={this.props.csv}>zip</a>
        </td>
      </tr>
    )
  }
});
