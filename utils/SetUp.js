
const BASE_URL = 'https://qa.api.pii-protect.com';
const AMANZON_URL = 'https://zvmses86cc.execute-api.us-east-1.amazonaws.com'
const ORIGIN = 'https://qa-portal.breachsecurenow.com';

const HTTP_HEADER = {
    accept: "application/json, text/plain, */*",
    "content-type": "application/json",
    origin: ORIGIN
  }
  
//April Partner 142
const MAIN_PARTNER_CREDENTIALS = {
  Admin: 'admin@142.com',
  PartnerAdmin: 'jc_pa@test.com',
  ManagerAdmin: 'manageradmin@142.com',
  Manager: 'manager@142.com',
  Employee: 'employee@142.com',
};

const MAIN_INTERNAL_CLIENT_ID = 'VGxSak0wMXFWVDA9';
const DEFAULT_PASSWORD = 'Working@@123';
const ROLES = ['Admin', 'PartnerAdmin', 'ManagerAdmin', 'Manager', 'Employee'];

module.exports = {
    BASE_URL,
    AMANZON_URL,
    ORIGIN,
    MAIN_PARTNER_CREDENTIALS,
    MAIN_INTERNAL_CLIENT_ID,
    HTTP_HEADER,
    DEFAULT_PASSWORD,
    ROLES
}