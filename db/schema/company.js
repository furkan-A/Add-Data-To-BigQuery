var companySpecialitySchema = [
  {
    name: 'companyId',
    type: 'STRING',
    mode: 'REQUIRED',
  },
  { name: 'speciality', type: 'STRING' },
  { name: 'exportedAt', type: 'DATETIME' },
];
var companyTypeSchema = [
  {
    name: 'companyId',
    type: 'STRING',
    mode: 'REQUIRED',
  },
  { name: 'companyType', type: 'STRING' },
  { name: 'exportedAt', type: 'DATETIME' },
];

var companySchema = [
  {
    name: 'companyId',
    type: 'STRING',
    mode: 'REQUIRED',
  },
  { name: 'companyName', type: 'STRING' },
  { name: 'companyForm', type: 'STRING' },
  { name: 'description', type: 'STRING' },
  { name: 'companyTypeOther', type: 'STRING' },
  { name: 'code', type: 'STRING' },
  { name: 'slug', type: 'STRING' },
  { name: 'status', type: 'STRING' },
  { name: 'user', type: 'STRING' },
  { name: 'updatedBy', type: 'STRING' },
  { name: 'registerAddress', type: 'STRING' },
  { name: 'registerPostCode', type: 'STRING' },
  { name: 'registerCity', type: 'STRING' },
  { name: 'registerState', type: 'STRING' },
  { name: 'registerCountry', type: 'STRING' },
  { name: 'principalPlaceAddress', type: 'STRING' },
  { name: 'principalPlacePostCode', type: 'STRING' },
  { name: 'principalPlaceCity', type: 'STRING' },
  { name: 'principalPlaceState', type: 'STRING' },
  { name: 'principalPlaceCountry', type: 'STRING' },
  { name: 'isSamePrincipalPlace', type: 'BOOLEAN' },
  { name: 'totalMember', type: 'INTEGER' },
  { name: 'arrivalDueDay', type: 'INTEGER' },
  { name: 'arrivalDueHour', type: 'INTEGER' },
  { name: 'paymentTerm', type: 'INTEGER' },
  { name: 'standardPaymentTerm', type: 'STRING' },
  { name: 'createdAt', type: 'DATETIME' },
  { name: 'updatedAt', type: 'DATETIME' },
  { name: 'exportedAt', type: 'DATETIME' },
  { name: 'locationLat', type: 'FLOAT' },
  { name: 'locationLong', type: 'FLOAT' },
];

module.exports = {
  companySchema,
  companyTypeSchema,
  companySpecialitySchema,
};
