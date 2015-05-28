/*!
 *  Copyright (C) 2010-2015 by Revolution Analytics Inc.
 *  Released under the Apache License 2.0
 *  http://www.apache.org/licenses/LICENSE-2.0
 */
var deployr    = require('deployr').configure({ host: 'http://166.78.105.110:7400' }),
    stream     = require('stream')
    JSONStream = require('JSONStream'),
    got        = require('got'),
    nano       = require('nano')('http://localhost:5984'),
    feature    = nano.db.use('feature');

//
// Stream Transform duplex to download DeployR response artifact URLs in 
// geoJSON and store it in CouchDB
//
var geo = new stream.Transform({ objectMode: true });

geo._transform = function(chunk, encoding, done) {
    var data = chunk.toString();

    if (data) {
        got.get(data.replace(/\"/g, ''))
            .pipe(feature.insert(null, 'feature'));
    }

    done();
};

//
// Execute `RUGclusters.R` in DeployR and pipe geoJSON response into CouchDB
//
deployr.script('/sheri/geo/RUGclusters.R')
    .numeric('nclus', 5)
    .pipe(JSONStream.parse('deployr.response.execution.artifacts.*.url'))
    .pipe(JSONStream.stringify(false))
    .pipe(geo);