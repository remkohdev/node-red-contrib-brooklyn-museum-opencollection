Node-RED Nodes for Brooklyn Museum
==================================

### New in version 0.0.5
- README.md corrections.

### New in version 0.0.5
- Added a node for 'GET /exhibition' endpoint.
- Changed the directory structure and configuration to include multiple nodes.

### Node-RED Nodes for Brooklyn Museum

This collection of Node-RED nodes can be used to interact with the [Brooklyn Museum Opencollection API](https://www.brooklynmuseum.org/opencollection/api).

# Nodes

- Collection
    - Calls the 'GET /collection' endpoint
- Exhibition
    - Calls the 'GET /exhibition' endpoint

### Usage

Configure the node adding the API Key.

The Collection ID or Exhibition ID can be configured in the node configuration. The Collection ID and Exhibition ID in the configuration will be overwritten by the 'collectionid' and 'exhibitid' in the msg.payload if present.

### Pre-requisites

You must register for a Brooklyn Museum Opencollection API api-key to access the Opencollection API. 

### Installation

This node can be installed through the Node-Red palette or manually using npm in your node-red folder.

Install as user in your local directory:
```
$ npm install --save node-red-contrib-brooklyn-museum-opencollection
```

Or install as root user for all users:
```
$ sudo npm install -g node-red-contrib-brooklyn-museum-opencollection
```

If you need a 1-click deployment of Node-RED, you can use the [Node-RED Starter](https://console.ng.bluemix.net/catalog/starters/node-red-starter) on Bluemix.net.

### Contributing


### Further Details

For more details how to use the node, how to build apps with the node, or how to build a Node-RED node, look at [FreeBootcamp.io](http://freebootcamp.io).


