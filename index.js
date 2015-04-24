'use strict'

var React = require('react'),
    Reflux = require('reflux');

var Map = require('./src/components/map'),
    Search = require('./src/components/search'),
    Table = require('./src/components/table');

var OaStore = require('./src/stores/oa_store.js'),
    MapStore = require('./src/stores/map_store');


var App = React.createClass({
  mixins: [
    Reflux.connect(OaStore, 'data'),
    Reflux.connect(MapStore, 'map')
  ],
  render: function () {
    return (
      <div>
        <Map data={this.state.map} />
        <Search />
        <Table data={this.state.data} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));