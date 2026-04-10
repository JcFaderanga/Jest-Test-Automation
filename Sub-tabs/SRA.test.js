const { GLOBAL_API } = require('../utils/api');
const { GET_Users_List, GET_Client_Data } = require('../api/ManageClients');
const POST_Login = require('../api/POST_Login');
const { MAIN_PARTNER_CREDENTIALS } = require('../utils/SetUp');

// ==== CONFIG / CONSTANTS ====
const CLIENT_ID = 'VGxSbk1rNUVSVDA9';
const ROLE_CONFIG = {
    INTERNAL: ['A', 'PA', 'MA', 'M', 'E'],
    EXTERNAL: ['MA', 'M', 'E']
};

// ==== STATE ====
let adminToken;
let clientInfo;
const userTokens = new Map();

// ==== HELPERS ====
// Fail-fast assertion helper
const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};
// API wrapper with validation
const fetchWithValidation = async (fn, errorMessage) => {
    const res = await fn;
    assert(res?.data, errorMessage);
    return res.data;
};
// Login helper
const loginUser = async (credentials, roleLabel = 'UNKNOWN') => {
    const token = await POST_Login(credentials);
    assert(token, `Failed to retrieve token for role: ${roleLabel}`);
    return token;
};
// Extract unique active users by role
const extractUniqueUsersByRole = (users) => {
    const seen = new Set();

    return users.filter(user => {
        const role = user?.group_role?.label;

        if (!user?.active || !role) return false;
        if (seen.has(role)) return false;

        seen.add(role);
        return true;
    });
};

// Resolve expected roles 
const getExpectedRoles = (isInternal) => {
    return isInternal ? ROLE_CONFIG.INTERNAL : ROLE_CONFIG.EXTERNAL;
};

// ==== SETUP FLOW ====
const setupEnvironment = async () => {

    // 1. Admin Login
    adminToken = await loginUser(MAIN_PARTNER_CREDENTIALS.Admin, 'ADMIN');

    // 2. Fetch Client Info
    clientInfo = await fetchWithValidation(
        GET_Client_Data(CLIENT_ID, adminToken),
        'Client info not retrieved'
    );

    // 3. Fetch Users
    const users = await fetchWithValidation(
        GET_Users_List(CLIENT_ID, adminToken),
        'Client users not retrieved'
    );

    // 4. Filter Users by Role
    const uniqueUsers = extractUniqueUsersByRole(users);

    // 5. Login Users in Parallel
    await Promise.all(
        uniqueUsers.map(async (user) => {
            const role = user.group_role.label;
            const token = await loginUser(user.email, role);
            userTokens.set(role, token);
        })
    );
};

// ==== VALIDATION HELPERS ====
 
const validateTokens = () => {
    const expectedRoles = getExpectedRoles(clientInfo?.is_internal);
    const actualRoles = Array.from(userTokens.keys());

    const missingRoles = expectedRoles.filter(r => !actualRoles.includes(r));

    if (missingRoles.length) {
        console.error('Token validation failed');
        console.error('Expected Roles:', expectedRoles);
        console.error('Actual Roles:', actualRoles);
        console.error('Missing Roles:', missingRoles);

        throw new Error(`Missing roles: ${missingRoles.join(', ')}`);
    }

    expect(userTokens.size).toBe(expectedRoles.length);
    expect(actualRoles).toEqual(expect.arrayContaining(expectedRoles));

    console.log('🔑 User Tokens:', Object.fromEntries(userTokens));
};

/**
 * ============================
 * TEST SUITE
 * ============================
 */
describe('Environment Setup', () => {
    beforeAll(async () => {
        await setupEnvironment();
    }, 30000);

    test('Admin token should be valid', () => {
        expect(adminToken).toBeTruthy();
    });

    test('Client info should be retrieved', () => {
        expect(clientInfo).toBeTruthy();
    });

    test('User tokens should match expected roles', () => {
        validateTokens();
    });
});