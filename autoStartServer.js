const Service = require('node-windows').Service;
const config = require('./config');

console.log('app')
const npfabisService = new Service({
    name: 'NPFABIS Web Service',
    description: 'NPFABIS service aims to auto start the NPFABIS web application node server on system reboot',
    script: config.npfabisEntryFilePath
});

npfabisService.on('install', function() {
    npfabisService.start();
});

npfabisService.install();