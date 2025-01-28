const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might fail
  someAsyncOperation().then(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Success!');
  }).catch(error => {
    // This error is not handled properly, and it will cause the server to crash silently
    console.error('Error:', error); // This will only log the error, not handle it gracefully
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

async function someAsyncOperation() {
  // Simulate a failing operation
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random failure
      if (Math.random() < 0.5) {
        reject(new Error('Simulated database error'));
      } else {
        resolve();
      }
    }, 1000);
  });
}