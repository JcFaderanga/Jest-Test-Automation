const { DEFAULT_PASSWORD } = require('../utils/SetUp')
const { GLOBAL_API } = require('../utils/api')

const POST_Login = async (email, password = DEFAULT_PASSWORD) => {
  const res = await GLOBAL_API.post('/cognitomiddlewares/user/login', {
    email,
    password,
  });

  return res.data?.AuthenticationResult?.IdToken;
};

module.exports = POST_Login;