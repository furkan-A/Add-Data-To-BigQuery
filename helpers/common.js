const fileReader = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const readFile = (path) => {
  var file = fileReader.readFileSync(path);
  return JSON.parse(file);
};

const GetProjectId = () => {
  const keyData = readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  return keyData.project_id;
};

const GetNumericData = (field) => {
  if (field) {
    const result =
      field.$numberDouble ||
      field.$numberInt ||
      field.$numberLong ||
      field.$numberDecimal;

    if (result) {
      return Number(result);
    } else {
      return field;
    }
  } else {
    return 0;
  }
};

const CurrentDate = (format) => {
  let currentDate = new Date();

  return DateFormatted(currentDate, format);
};

const DateFormatted = (currentDate, format) => {
  let day = ('0' + currentDate.getDate()).slice(-2);
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let year = currentDate.getFullYear();

  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  let millisecond = currentDate.getMilliseconds();
  let result = `${year}-${PadNumber(month, 2)}-${PadNumber(day, 2)} ${PadNumber(
    hour,
    2
  )}:${PadNumber(minute, 2)}:${PadNumber(second, 2)}.${PadNumber(
    millisecond,
    3
  )}`;

  switch (format) {
    case 'YYYY-MM-DD':
      result = `${year}-${PadNumber(month, 2)}-${PadNumber(day, 2)}`;
      break;
    case 'YYYYMMDD':
      result = `${year}${PadNumber(month, 2)}${PadNumber(day, 2)}`;
      break;
    case 'DDMMYYYY':
      result = `${PadNumber(day, 2)}${PadNumber(month, 2)}${year}`;
      break;
    case 'DD.MM.YYYY':
      result = `${PadNumber(day, 2)}.${PadNumber(month, 2)}.${year}`;
      break;
    case 'YYYY-MM-DD HH:MM:SS':
      result = `${year}-${PadNumber(month, 2)}-${PadNumber(day, 2)} ${PadNumber(
        hour,
        2
      )}:${PadNumber(minute, 2)}:${PadNumber(second, 2)}`;
      break;
    case 'DD/MM/YYYY':
      result = `${PadNumber(day, 2)}/${PadNumber(month, 2)}/${year}`;
      break;
  }
  return result;
};

function PadNumber(num, padlen) {
  const padchar = '0';
  var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
  var pad = new Array(1 + padlen).join(pad_char);
  return (pad + num).slice(-pad.length);
}

module.exports = {
  GetNumericData,
  readFile,
  GetProjectId,
  CurrentDate,
  DateFormatted,
};
