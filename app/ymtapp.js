var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log('[master] ' + 'start master...');
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('listening', function(worker, address) {
    console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ':' + address.port);
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  require('./service');
}