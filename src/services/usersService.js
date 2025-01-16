import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async (page, perPage) => {
    try {
        const resp = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
