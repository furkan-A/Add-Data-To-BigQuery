const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const index = require('./index');

const app = express();
const PORT = 5000;

dotenv.config();

console.clear();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});

app.get('/companies', index.ReadAllDataFromDB);
app.post('/companySchema', index.CreateTableToBigQuery);
app.post('/companyTypeSchema', index.CreateTableToBigQuery);
app.post('/companySpecialitySchema', index.CreateTableToBigQuery);
app.post('/company', index.AddCompanyToBigQuery);

// app.post('/companyAdd', index.AddCompanyToBigQuery);
