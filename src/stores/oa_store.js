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
      this.data.filter(function (i) {
        return (i.name.indexOf(input) > -1);
      })
    );
  }
});