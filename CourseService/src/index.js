const express = require('express');
const axios = require('axios');
const { response, request } = require('express');
const logger = require('./logger.js');

const app = express(),
      bodyParser = require("body-parser"),
      fs = require('fs'),
      port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app.get('/', (req, res) => {
  res.send('Project setup!!');
})

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.get('/courses', (req, res) => {
    // res.send('Get the list of courses!!');
    const headers = {
        "Content-Type": "text/json"
    };
    axios.get("https://jsonplaceholder.typicode.com/todos", headers)
        .then(response => {
            
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.error(err);
            logger.error(err);
            res.sendStatus(500);
        })

    res.send("List of courses is available!");
  })

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
  // console.log(`Example app listening on port ${port}`);
})