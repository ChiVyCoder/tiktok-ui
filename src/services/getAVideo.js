import * as httpRequest from '~/utils/httpRequest';

export const getAVideo = async (videoId) => {
    try {
        const resp = await httpRequest.get(`/videos/${videoId}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};
