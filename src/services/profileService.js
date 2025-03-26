import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (username) => {
    try {
        const resp = await httpRequest.get(`/users/${username}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
