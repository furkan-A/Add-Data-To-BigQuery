const common = require('../helpers/common.js');

// for json file
const CompanyData = (data) => {
  let newCompany = {};

  newCompany.companyId = data._id.$oid.toString();
  newCompany.companyName = data.companyName;
  newCompany.companyForm = data.companyForm;
  newCompany.description = data.description;
  newCompany.companyTypeOther = data.companyTypeOther;
  newCompany.code = data.code;
  newCompany.slug = data.slug;
  newCompany.status = data.status;
  newCompany.user = data.user.$oid.toString();
  newCompany.updatedBy = data.updatedBy ? data.updatedBy.$oid.toString() : null;
  newCompany.registerAddress = data.registerAddress;
  newCompany.registerPostCode = data.registerPostCode;
  newCompany.registerCity = data.registerCity.name;
  newCompany.registerState = data.registerState.name;
  newCompany.registerCountry = data.registerCountry.name;
  newCompany.principalPlaceAddress = data.principalPlaceAddress;
  newCompany.principalPlacePostCode = data.principalPlacePostCode;
  newCompany.principalPlaceCity = data.principalPlaceCity.name;
  newCompany.principalPlaceState = data.principalPlaceState.name;
  newCompany.principalPlaceCountry = data.principalPlaceCountry.name;
  newCompany.isSamePrincipalPlace = data.isSamePrincipalPlace;
  newCompany.totalMember = Number(common.GetNumericData(data.totalMember));
  newCompany.arrivalDueDay = Number(common.GetNumericData(data.arrivalDueDay));
  newCompany.arrivalDueHour = Number(
    common.GetNumericData(data.arrivalDueHour)
  );
  newCompany.paymentTerm = Number(common.GetNumericData(data.paymentTerm));
  newCompany.standardPaymentTerm = data.standardPaymentTerm;

  newCompany.createdAt = common.DateFormatted(
    new Date(Number(common.GetNumericData(data.createdAt.$date))),
    'YYYY-MM-DD HH:MM:SS'
  );

  newCompany.updatedAt = data.updatedAt
    ? common.DateFormatted(
        new Date(Number(common.GetNumericData(data.updatedAt.$date))),
        'YYYY-MM-DD HH:MM:SS'
      )
    : null;
  newCompany.exportedAt = common.CurrentDate('YYYY-MM-DD HH:MM:SS');

  newCompany.locationLat = data.location
    ? common.GetNumericData(data.location[0])
    : null;
  newCompany.locationLong = data.location
    ? common.GetNumericData(data.location[1])
    : null;

  return newCompany;
};

const CompanySpecialitysData = (data, speciality) => {
  let newCompany = {};

  if (typeof data._id.$oid === 'undefined') {
    newCompany.companyId = data._id.toString();
  } else {
    newCompany.companyId = data._id.$oid.toString();
  }
  newCompany.speciality = speciality;
  newCompany.exportedAt = common.CurrentDate('YYYY-MM-DD HH:MM:SS');
  console.log('new company:', newCompany);
  return newCompany;
};

const CompanyTypesData = (data, type) => {
  let newCompany = {};

  if (typeof data._id.$oid === 'undefined') {
    newCompany.companyId = data._id.toString();
  } else {
    newCompany.companyId = data._id.$oid.toString();
  }
  newCompany.companyType = type;
  newCompany.exportedAt = common.CurrentDate('YYYY-MM-DD HH:MM:SS');

  return newCompany;
};

// for reading mongodb docs
const CompanyDataForMongoDB = (data) => {
  let newCompany = {};

  newCompany.companyId = data._id.toString();
  newCompany.companyName = data.companyName;
  newCompany.companyForm = data.companyForm;
  newCompany.description = data.description;
  newCompany.companyTypeOther = data.companyTypeOther;
  newCompany.code = data.code;
  newCompany.slug = data.slug;
  newCompany.status = data.status;
  newCompany.user = data.user.toString();
  newCompany.updatedBy = data.updatedBy ? data.updatedBy.toString() : null;
  newCompany.registerAddress = data.registerAddress;
  newCompany.registerPostCode = data.registerPostCode;
  newCompany.registerCity = data.registerCity.name;
  newCompany.registerState = data.registerState.name;
  newCompany.registerCountry = data.registerCountry.name;
  newCompany.principalPlaceAddress = data.principalPlaceAddress;
  newCompany.principalPlacePostCode = data.principalPlacePostCode;
  newCompany.principalPlaceCity = data.principalPlaceCity.name;
  newCompany.principalPlaceState = data.principalPlaceState.name;
  newCompany.principalPlaceCountry = data.principalPlaceCountry.name;
  newCompany.isSamePrincipalPlace = data.isSamePrincipalPlace;
  newCompany.totalMember = data.totalMember;
  newCompany.arrivalDueDay = data.arrivalDueDay ?? null;
  newCompany.arrivalDueHour = data.arrivalDueHour ?? null;
  newCompany.paymentTerm = data.paymentTerm;
  newCompany.standardPaymentTerm = data.standardPaymentTerm;
  newCompany.createdAt = common.DateFormatted(
    new Date(data.createdAt),
    'YYYY-MM-DD HH:MM:SS'
  );
  newCompany.updatedAt = data.updatedAt
    ? common.DateFormatted(new Date(data.updatedAt), 'YYYY-MM-DD HH:MM:SS')
    : null;
  newCompany.exportedAt = common.CurrentDate('YYYY-MM-DD HH:MM:SS');

  newCompany.locationLat = data.location ? data.location[0] : null;
  newCompany.locationLong = data.location ? data.location[1] : null;

  return newCompany;
};

module.exports = {
  CompanyData,
  CompanyDataForMongoDB,
  CompanyTypesData,
  CompanySpecialitysData,
};
