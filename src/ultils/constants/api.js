const host = 'http://45.76.158.173:1995';
const url = {
    urlGetStatusAroundUser: (user, region, r, from, limit) =>
        `${host}/api/status/around/${user.userId}?latitude=${region.latitude}
                            &longitude=${region.longitude}&r=${r}&from=${from || 0}&limit=${limit || 20}`,
    API_LOGIN: `${host}/api/user/login`,
    makeRequest: `${host}/api/conversation`,
    createStatus: `${host}/api/status`
};
export default url;
