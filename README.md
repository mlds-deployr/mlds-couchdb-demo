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
