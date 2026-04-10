const { GLOBAL_API } = require('../../utils/api');

const GET_Client_Data = async (client_id, auth) => {
    const query = `/sra/Clients/${client_id}/info`;

    return await GLOBAL_API.get(query, {
        headers: { Authorization: auth }
    });
};

module.exports = GET_Client_Data;