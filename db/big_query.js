const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
const responseMessages = require('../helpers/response-messages');
const common = require('../helpers/common.js');

exports.CreateTable = async (datasetId, tableId, options) => {
  let response = responseMessages.error;
  try {
    await bigquery.dataset(datasetId).createTable(tableId, options);
    response = responseMessages.success;
    response.message = `The table named "${tableId}" has been created`;
    return response;
  } catch (e) {
    response.message = `error in create table: ${e}`;
    return response;
  }
};

exports.InsertData = async (datasetId, tableId, data) => {
  let response = responseMessages.error;

  try {
    await bigquery.dataset(datasetId).table(tableId).insert(data);
    response = {
      status: 200,
      date: common.CurrentDate(),
      message: `Data Added to ${tableId}`,
    };
    console.log('insert data response: ', response);

    return response;
  } catch (e) {
    response = {
      status: 400,
      date: common.CurrentDate(),
      message: `error in insert data: ${e}`,
    };

    return response;
  }
};
