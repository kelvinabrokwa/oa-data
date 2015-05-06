'use strict';

var Reflux = require('reflux');

var iso3 = require('../iso3.json'),
    data = require('../data.json')

var actions = require('../actions/actions.js');

module.exports = Reflux.createStore({
  init() {
    //this.listenTo(actions.filterList, this.filter);
  },
  getInitialState() {
    var countries = data.map(country => {
      return Object.keys(country)[0] 
    });
    this.data = Object.keys(iso3).filter(code => {
      return countries.indexOf(iso3[code]) > -1
    });
    return this.data;
  },
  filter: function (input) {
    this.trigger(
      this.data.filter(country => {
        input = input.toLowerCase();
        return iso3[country].toLowerCase().indexOf(input) > -1;
      })
    );
  }
});
