const {BASE_URL, API_LOGIN} = require('./api')

const DEFAULT_PASSWORD = 'Working@@123';
const Roles = ['Admin', 'PartnerAdmin', 'ManagerAdmin', 'Manager', 'Employee'];

const Credentials = {
  Admin: 'admin@142.com',
  PartnerAdmin: 'jc_pa@test.com',
  ManagerAdmin: 'manageradmin@142.com',
  Manager: 'manager@142.com',
  Employee: 'employee@142.com',
};

const AuthTokens = new Map();

// 🔐 Login single user
const loginUser = async (role) => {
  const res = await API_LOGIN.post('/cognitomiddlewares/user/login', {
    email: Credentials[role],
    password: DEFAULT_PASSWORD
  });

  return res.data?.AuthenticationResult?.IdToken;
};

// 🔐 Login all users (same logic as your loop but FIXED)
const loginAllUsers = async () => {
  for (const role of Object.keys(Credentials)) {
    const token = await loginUser(role); // ✅ important
    AuthTokens.set(role, token);
  }
};

module.exports = {
  loginAllUsers,
  AuthTokens,
  BASE_URL,
  Roles
};