import * as httpRequest from '~/utils/httpRequest';

export const getVideos = async (type, page) => {
    try {
        const resp = await httpRequest.get('/videos', {
            params: {
                type,
                page,
            },
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
