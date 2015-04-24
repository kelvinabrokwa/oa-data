'use strict';

var fs = require('fs'),
		path = require('path'),
		request = require('request');

var url = 'http://data.openaddresses.io/runs/1429682917.812/state.txt';
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

			rows.shift()

			var output = {}
			var iso = JSON.parse(fs.readFileSync(path.join(__dirname, 'iso.json')));
			
			rows.forEach(function(row) {
				var code = row[0].substring(0,2).toUpperCase();
				if (!(iso[code] in output)) {
					output[iso[code]] = [];
				}
				var obj = {};
				obj['name'] = row[0].split('.')[0];
				obj['csv'] = row[1];
				obj['json'] = row[2];
				output[iso[code]].push(obj);
			});

			var out = [];
			for (var key in output) {
				var obj = {};
				obj[key] = output[key]
				out.push(obj);
			}

     	fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(out, null, 2));
      console.log('Done scraping. Data cached at /src/data.json');
		}
	});
}

scrape(url)