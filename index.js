const express = require('express');
const http = require('http');

const app = express();

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3002;
const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


app.get('/', (req, res) => {
    console.log('/ called');
    res.send({
        status: 200,
        message: 'Service is running'
    })
})

app.get('/getInfo', (req, res) => {
    console.log('getInfo called');
    res.send({
        status: 200,
        message: 'success',
        data: {
            info: "This is /getInfo GET service called on node-ms2 instance"
        }
    })
})

app.get('/checkInfo', (req, res) => {
    console.log('checkInfo called');

    const options = {
        hostname: '172.21.85.105',
        port: 3001,
        path: '/getInfo',
        method: 'GET'
      }
      const request = https.request(options, result => {
        console.log(`statusCode: ${result.statusCode}`)
      
        result.on('data', d => {
          process.stdout.write(d)
          res.send({
              status: 200,
              data: d
          })
        })
      })
      
      request.on('error', error => {
        console.error(error)
        res.status(400).send({
            status: 400,
            message: error
        });
      })
      
      request.end();
})

app.listen(PORT, ip);
console.log(`Node MS-2 Server is  running at port : ${PORT}`);
