import classNames from 'classnames/bind';
import { useState, useEffect, useCallback } from 'react';

import styles from './Home.module.scss';
import * as videosService from '~/services/videosService';
import Content from './component/Content/Content';

const cx = classNames.bind(styles);
function Home() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(Math.ceil(Math.random() * 40));
    useEffect(() => {
        loadInitVideo();
    }, []);

    const loadInitVideo = async () => {
        const result = await videosService.getVideos('for-you', page);
        setVideos(result);
    };
    const loadMoreVideos = useCallback(async () => {
        const nextPage = Math.floor(Math.random() * 100);
        const results = await videosService.getVideos('for-you', nextPage);
        setVideos((prevResult) => [...prevResult, ...results]);
        setPage(nextPage);
    }, [page]);

    return <Content data={videos} loadMore={loadMoreVideos} />;
}

export default Home;
