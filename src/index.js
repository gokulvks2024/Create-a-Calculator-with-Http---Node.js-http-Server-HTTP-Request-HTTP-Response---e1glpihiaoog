const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  if(req.method === 'GET' ){
    if(req.url === '/calculate'){
      try{
        const dat = await fs.readFile('../inputs.txt', 'utf-8');
        const data = dat.split('\n');
        if(data[2] === 'add'){
          if(isNaN(Number(data[0])) || isNaN(Number(data[1]))){
            res.statusCode = 400;
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid Number');
          }
          else{
            const result = Number(data[0]) + Number(data[1]);
            await fs.writeFile('result.txt', result.toString());
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(result.toString());
          }
        }
        else if(data[2] === 'subtract'){
          if(isNaN(Number(data[0])) || isNaN(Number(data[1]))){
            res.statusCode = 400;
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid Number');
          }
          else{
            const result = Number(data[0]) - Number(data[1]);
            await fs.writeFile('result.txt', result.toString());
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(result.toString());
          }
        }
        else if(data[2] === 'multiply'){
          if(isNaN(Number(data[0])) || isNaN(Number(data[1]))){
            res.statusCode = 400;
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid Number');
          }
          else{
            const result = Number(data[0]) * Number(data[1]);
            await fs.writeFile('result.txt', result.toString());
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(result.toString());
          }
        }
        else if(data[2] === 'divide'){
          if(isNaN(Number(data[0])) || isNaN(Number(data[1]))){
            res.statusCode = 400;
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid Number');
          }
          else if(Number(data[1]) === 0){
            res.statusCode = 400;
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Division by zero error');
          }
          else{
            const result = Number(data[0]) / Number(data[1]);
            await fs.writeFile('result.txt', result.toString());
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(result.toString());
          }
        }
        else{
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.statusCode = 400;
          res.end('Invalid Operator');
        }
      }
      catch(err){
        res.statusCode = 500;
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Unable to write result');
      }
    };
  } else {
    res.statusCode = 404;
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
})

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
