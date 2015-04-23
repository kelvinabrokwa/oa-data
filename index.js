'use strict'

var React = require('react'),
    Reflux = require('reflux');

var Search = require('./src/components/search'),
    Table = require('./src/components/table');

var OaStore = require('./src/stores/oa_store.js');


var App = React.createClass({
  mixins: [
    Reflux.connect(OaStore, 'data')
  ],
  render: function () {
    return (
      <div>
        <Search />
        <Table data={this.state.data} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));