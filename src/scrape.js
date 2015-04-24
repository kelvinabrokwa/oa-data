'use strict'

var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    cheerio = require('cheerio');

function scrape (url) {
  request(url, function (err, resp, html) {
    if (!err) {
      var data = [];
      var $ = cheerio.load(html);
      var rows = $('body').children('table').first().children('tr').filter(function (tr) {
        return ($(this).children().length === 6);
      });
      rows.each(function (r) {
        if (! $(this).children(':nth-child(4)').children('a').attr('href')) 
          return;
        var row = $(this).children();
        var obj = {};
        var count = 0;
        row.each(function (child) {
          switch (count) {
            case 0:
              obj['name'] = $(this).text().replace(/[\r\n]/g,'').trim()
              obj['json'] = $(this).children('a').attr('href')
              break;
            case 1:
              obj['type'] = $(this).text().replace(/[\r\n]/g,'').trim()
              break;
            case 2:
              obj['cached'] = $(this).text().replace(/[\r\n]/g,'').trim()
              break;
            case 3:
              if ($(this).text().trim() === 'csv') {
                obj['csv'] = $(this).children('a').attr('href')
              } else {
                obj['csv'] = null
              }
              break;
          }
          count++;
        });
        data.push(obj);
      });
      data.shift();
      var iso = JSON.parse(fs.readFileSync(path.join(__dirname, 'iso.json')))
      data = data.map(function(item) {
         var code = item['name'].substring(0,2).toUpperCase();
         item['country'] = iso[code];
        return item;
      });

      var sorted = {};

      data.map(function(i) {
        return i['country'];
      }).sort().filter(function(elem, idx, arr) {
        return (elem !== arr[idx - 1]);
      }).forEach(function(country) {
        sorted[country] = data.filter(function(i) {
          return i['country'] === country;
        });
      });

      var final = [];
      for (var key in sorted) {
        var out = {}
        out[key] = sorted[key]
        final.push(out);
      }
      
      fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(final, null, 2));
      console.log('Done scraping. Data cached at /src/data.json')
    }
  });
}

var url = 'http://data.openaddresses.io/runs/1429682917.812/index.html';
scrape(url);
