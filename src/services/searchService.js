import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const resp = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
