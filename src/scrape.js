'use strict';

var fs = require('fs'),
    path = require('path'),
    request = require('request');

function scrape (url) {
  request(url, function(err, resp, txt) {
    if (!err) {
      var rows = txt.split('\n').map(function(row) {
        return row.split('\t').map(function(item) {
          return item.replace(/[\r\n]/g,'').trim();
        });
      }).filter(function(row) {
        return (row.length === 11) && (row[1]);
      });
      rows.shift();

      var output = {};
      var countries = [];
      var iso = JSON.parse(fs.readFileSync(path.join(__dirname, 'iso2.json')));
      
      rows.forEach(function(row) {
        var code = row[0].substring(0,2).toUpperCase();
        if (!(iso[code] in output)) {
          output[iso[code]] = [];
          countries.push(code.toUpperCase());
        }
        var obj = {};
        obj['name'] = row[0].split('.')[0];
        obj['csv'] = row[1];
        obj['json'] = 'https://github.com/openaddresses/openaddresses/blob/master/sources/' + row[0];
        output[iso[code]].push(obj);
      });

      var out = [];
      for (var key in output) {
        var obj = {};
        obj[key] = output[key];
        out.push(obj);
      }

      fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(out, null, 2));
      fs.writeFileSync(path.join(__dirname, './map.json'), JSON.stringify(countries, null, 2));      
      console.log('Done scraping. Data cached at /src/data.json');
    }
  });
}

var url = 'http://data.openaddresses.io/runs/1429682917.812/state.txt';
scrape(url);