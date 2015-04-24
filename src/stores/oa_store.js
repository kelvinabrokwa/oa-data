'use strict';

var Reflux = require('reflux');

var data = require('../data.json');
var actions = require('../actions/actions.js');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(actions.filterList, this.filter);
  },
  getInitialState: function () {
    this.data = data;
    return this.data;
  },
  filter: function (input) {
    this.trigger(
      this.data.map(function(country) {
        var key = Object.keys(country)[0];
        var val = country[key];
        var out = {};
        input = input.toLowerCase();
        out[key] = val.filter(function(src) {
          return (src['name'].indexOf(input) > -1) || (key.toLowerCase().indexOf(input) > -1);
        });
        return out;
      }).filter(function(area) {
        return area[Object.keys(area)[0]].length > 0;
      })
    );
  }
});