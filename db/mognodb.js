const dotEnv = require('dotenv');
const { MongoClient } = require('mongodb');
const responseMessages = require('../helpers/response-messages');
const createCompany = require('./company-data');
const big_query = require('./big_query');

dotEnv.config();

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_DATASET}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.ReadAllDataFromDatabase = async (collectionName) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_DATABASE);
    const collection = db.collection(collectionName);
    docs = await collection.find({}).toArray();
    console.log('Connected successfully to DB');
    // console.log('All documents =>', docs);
    return docs;
  } catch (error) {
    console.log(`error in db: ${error}`);
  }
};

exports.WriteAllDataToBigQuery = async (datasetId, tableId, dataList) => {
  let response = responseMessages.error;
  let companyData;

  for (var i = 0; i < dataList.length; i++) {
    ({ companyData, response } = await AddCompanyData(
      companyData,
      dataList[i],
      response,
      datasetId,
      tableId
    ));
  }
  return response;
};

exports.AddCompanyData = async (
  companyData,
  data,
  response,
  datasetId,
  tableId
) => {
  companyData = createCompany.CompanyDataForMongoDB(data);
  try {
    response = await big_query.InsertData(datasetId, tableId, companyData);
  } catch (error) {
    console.log(`error in WriteAllDataToBigQuery: ${error}`);
  }
  response = await AddCompanyToCompanyTypes(data, response, datasetId);
  response = await AddCompanyToCompanySpecialities(data, response, datasetId);
  return { companyData, response };
};

async function AddCompanyToCompanyTypes(dataList, response, datasetId) {
  for (let index = 0; index < dataList.types.length; index++) {
    companyDataForTypes = createCompany.CompanyTypesData(
      dataList,
      dataList.types[index]
    );

    try {
      response = await big_query.InsertData(
        datasetId,
        'company_types',
        companyDataForTypes
      );
    } catch (e) {
      console.log(`error in AddCompanyToCompanyTypes: ${e}`);
    }
  }
  return response;
}
async function AddCompanyToCompanySpecialities(dataList, response, datasetId) {
  for (let index = 0; index < dataList.specialities.length; index++) {
    companyDataForSpeciality = createCompany.CompanySpecialitysData(
      dataList,
      dataList.specialities[index]
    );
    try {
      response = await big_query.InsertData(
        datasetId,
        'company_specialities',
        companyDataForSpeciality
      );
    } catch (e) {
      console.log(`error in AddCompanyToCompanySpecialities: ${e}`);
    }
  }
  return response;
}
