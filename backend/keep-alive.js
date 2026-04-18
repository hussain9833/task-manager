const http = require('http');
const express = require('express');

// Simple keep-alive server
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Task Manager API is running',
    health: '/health'
  });
});

// Create server
const server = http.createServer(app);

// Keep-alive mechanism - ping every 14 minutes (840000 ms)
const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000; // 14 minutes

function keepAlive() {
  const options = {
    hostname: 'localhost',
    port: process.env.PORT || 5000,
    path: '/health',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`Keep-alive ping: ${res.statusCode} - ${new Date().toISOString()}`);
  });

  req.on('error', (err) => {
    console.log('Keep-alive ping failed:', err.message);
  });

  req.on('timeout', () => {
    req.destroy();
    console.log('Keep-alive ping timeout');
  });

  req.end();
}

// Start keep-alive pings
setInterval(keepAlive, KEEP_ALIVE_INTERVAL);

// Initial ping after 30 seconds
setTimeout(keepAlive, 30000);

console.log('Keep-alive service started');
console.log(`Pinging every ${KEEP_ALIVE_INTERVAL / 60000} minutes`);

module.exports = app;
