const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  if(req.method === 'GET' ){
    if(req.url === '/calculate'){
      const data = fs.readFileSync('inputs.txt', 'utf-8').split('\n');
      if(data[2] === 'add'){
        if(data[0].isNumber === false || data[1].isNumber === false){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid Number');
        }
        else{
          const result = Number(data[0]) + Number(data[1]);
          try{
          await fs.writeFile('result.txt', result.toString());
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(result.toString());
          }
          catch(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Unable to write result');
          }
        }
      }
      else if(data[2] === 'subtract'){
        if(data[0].isNumber === false || data[1].isNumber === false){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid Number');
        }
        else{
          const result = Number(data[0]) - Number(data[1]);
          try{
          await fs.writeFile('result.txt', result.toString());
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(result.toString());
          }
          catch(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Unable to write result');
          }
        }
      }
      else if(data[2] === 'multiply'){
        if(data[0].isNumber === false || data[1].isNumber === false){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid Number');
        }
        else{
          const result = Number(data[0]) * Number(data[1]);
          try{
          await fs.writeFile('result.txt', result.toString());
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(result.toString());
          }
          catch(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Unable to write result');
          }
        }
      }
      else if(data[2] === 'divide'){
        if(data[0].isNumber === false || data[1].isNumber === false){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid Number');
        }
        else if(Number(data[1]) === 0){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Division by zero error');
        }
        else{
          const result = Number(data[0]) / Number(data[1]);
          try{
          await fs.writeFile('result.txt', result.toString());
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(result.toString());
          }
          catch(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Unable to write result');
          }
        }
      }
      else{
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid Operator');
      }
    };
  } else {
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
