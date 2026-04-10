/*
tolltop: ['Administrator', 'Partner Administrator', 'Manager Admin', Manager, 'Employee']

Targer keys:
- active
- email
- group_role: { label, tolltip }
- user_id
- id
*/
const { AMAZON_API } = require('../../utils/api');
// const GET_CLIENT = axios.create({
//   baseURL: BASE_URL,
//   headers: HTTP_HEADER
// });

const GET_Users = async (client_id, auth) => {
    const query = `/qa/clients/usersList/${client_id}?_filter=&_sort=name&_start=0&_end=25&_order=ASC`;

    return await AMAZON_API.get(query, {
        headers: { authorization: auth }
    });
};

module.exports = GET_Users;