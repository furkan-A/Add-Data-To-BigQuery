const common = require('./common');

const responseCodes = {
  success: 200,
  error: 400,
};

const ResponseMessage = (status, message) => {
  return {
    status: status,
    date: common.CurrentDate(),
    message: message,
  };
};

module.exports = {
  error: ResponseMessage(responseCodes.error, ''),
  success: ResponseMessage(responseCodes.success, ''),
};
