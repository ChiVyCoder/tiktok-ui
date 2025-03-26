import classNames from 'classnames/bind';
import styles from './ContentOnly.module.scss';
import Comment from '~/layouts/component/Comment';
import Watching from '~/layouts/component/Watching';
import * as getAVideo from '~/services/getAVideo';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function ContentOnly() {
    const { videoId } = useParams(); // dùng để lấy ra tham số của routes
    const [data, setData] = useState(null);
    const loadVideo = async () => {
        const result = await getAVideo.getAVideo(videoId);
        setData(result);
    };
    useEffect(() => {
        loadVideo();
    }, [videoId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('watching-container')}>{data && <Watching data={data} />}</div>
            <div className={cx('comment-container')}>{data && <Comment data={data} />}</div>
        </div>
    );
}

export default ContentOnly;
