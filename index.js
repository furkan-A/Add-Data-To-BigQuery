const big_query = require('./db/big_query');
const mongodb = require('./db/mognodb');
const createCompany = require('./db/company-data');
const company = require('./db/schema/company');
const common = require('./helpers/common');
const responseMessages = require('./helpers/response-messages');

const projectId = common.GetProjectId();
const gcpDatasetId = 'company';
const tableId = 'companies';

exports.CreateTableToBigQuery = async (req, res) => {
  let schemaName = req.path.split('/').pop();
  const createTableOptions = {
    schema: getSchema(schemaName),
    location: 'europe-west2',
  };
  const tableName = getTableName(schemaName);

  const response = await big_query.CreateTable(
    gcpDatasetId,
    tableName,
    createTableOptions
  );

  res.status(response.status).send(response);
};

exports.AddCompanyToBigQuery = async (req, res) => {
  let companyData = createCompany.CompanyData(req.body);

  var response = await big_query.InsertData(gcpDatasetId, tableId, companyData);
  response = await AddCompanySpeciality(req);
  response = await AddCompanyType(req);

  res.status(200).send(response);
};

exports.ReadAllDataFromDB = async (req, res) => {
  let collectionName = req.path.split('/').pop();
  let docs = await mongodb.ReadAllDataFromDatabase(collectionName);

  try {
    const response = await mongodb.WriteAllDataToBigQuery(
      gcpDatasetId,
      tableId,
      docs
    );
    console.log(`success: ${response}`);
  } catch (e) {
    console.log(`error in data tranfer to bigQuerybig: ${e}`);
  }
};

async function AddCompanyType(req) {
  req.body.types.forEach(async (element) => {
    // console.log('item: ', element);
    await big_query.InsertData(
      gcpDatasetId,
      'company_types',
      createCompany.CompanyTypesData(req.body, element)
    );
  });
}

async function AddCompanySpeciality(req) {
  req.body.specialities.forEach(async (element) => {
    // console.log('item: ', element);
    await big_query.InsertData(
      gcpDatasetId,
      'company_specialities',
      createCompany.CompanySpecialitysData(req.body, element)
    );
  });
}

function getTableName(schemaName) {
  let tableName;
  switch (schemaName) {
    case 'companyTypeSchema':
      tableName = 'company_types';
      break;
    case 'companySpecialitySchema':
      tableName = 'company_specialities';
      break;
    default:
      tableName = 'companies';
      break;
  }
  return tableName;
}

function getSchema(schemaName) {
  switch (schemaName) {
    case 'companyTypeSchema':
      return company.companyTypeSchema;
    case 'companySpecialitySchema':
      return company.companySpecialitySchema;
    default:
      return company.companySchema;
  }
}
