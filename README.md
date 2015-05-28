# DeployR - R Analytics Integration

Same DeployR enabled R Script, diffrent client.

This example can be used in conjunction with the [mlds-ui-demo](https://github.com/mlds-deployr/mlds-ui-demo) to demonstrate how a **different** DeployR consumer/client can invoke the same R Script [/sheri/geo/RUGclusters.R](https://github.com/mlds-deployr/mlds-ui-demo#rugclustersr) and do something different with the result. For this example,
the **geoJSON** returned from calling [/sheri/geo/RUGclusters.R](https://github.com/mlds-deployr/mlds-ui-demo#rugclustersr) is stored in [CouchDB](http://couchdb.apache.org)
rather than building a UI as we did in [mlds-ui-demo](https://github.com/mlds-deployr/mlds-ui-demo).

## Prerequisites

- Install the latest stable version of [Node.js](http://nodejs.org/) (version 0.10.x).
- Install [CouchDB](http://couchdb.apache.org)

## Quick start

1. Install [Node.js](http://nodejs.org/) 
2. Install [CouchDB](http://couchdb.apache.org)
3. Create a new Database named `feature` from the [CouchDB Admin Console](http://127.0.0.1:5984/_utils/index.html) 
4. ```$ git clone https://github.com/mlds-deployr/mlds-couchdb-demo.git```
5. ```$ cd mlds-couchdb-demo```
6. ```$ npm install```
7. ```$ node index.js``` This runs the demo.
8. Open the [CouchDB Admin Console](http://127.0.0.1:5984/_utils/index.html) and
   view the newly inserted **geoJSON** returned from executing the R Script 
   [/sheri/geo/RUGclusters.R](https://github.com/mlds-deployr/mlds-ui-demo#rugclustersr)
   under the `feature` Database.


 ```js
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
// Execute `uspop.R` in DeployR and pipe geoJSON response into CouchDB
//
deployr.script('/sheri/geo/RUGclusters.R')
    .numeric('nclus', 5)
    .pipe(JSONStream.parse('deployr.response.execution.artifacts.*.url'))
    .pipe(JSONStream.stringify(false))
    .pipe(geo);
 ```
