const axios = require('axios');
const { AMANZON_URL, BASE_URL, HTTP_HEADER } = require('../utils/SetUp');

const AMAZON_API = axios.create({
  baseURL: AMANZON_URL,
  headers: HTTP_HEADER
});

const GLOBAL_API = axios.create({
  baseURL: BASE_URL,
  headers: HTTP_HEADER
});


module.exports = { AMAZON_API, GLOBAL_API}