import classNames from 'classnames/bind';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styles from './Watching.module.scss';
import { PauseIcon } from '~/component/Icons/Icons';

const cx = classNames.bind(styles);
function Watching({ data }) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const [currentTime, setCurrentTime] = useState('00:00');
    const [videoDuration, setVideoDuration] = useState(0);
    const [pause, setPause] = useState(false);

    // Hàm xử lý thanh range
    const handleProgressBar = () => {
        const videoEl = document.querySelector('video');
        const progressBar = document.getElementsByClassName(cx('input'))[0];

        videoEl.addEventListener('timeupdate', () => {
            const progress = (videoEl.currentTime / videoEl.duration) * 100;
            progressBar.value = progress;
            setCurrentTime(formatTime(videoEl.currentTime)); // Cập nhật currentTime khi video phát
        });
        // Khi người dùng thay đổi thanh thời gian, video sẽ nhảy đến thời điểm mới
        progressBar.addEventListener('input', function () {
            const time = (progressBar.value / 100) * videoEl.duration;
            videoEl.currentTime = time;
            setCurrentTime(formatTime(time)); // cập nhật currentTime khi tua video
        });
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${pad(minutes)}:${pad(seconds)}`;
    };

    const pad = (num) => (num < 10 ? `0${num}` : num);

    // Cập nhật video duration sau khi video load
    // Khi đổ CSDL vào thì không cần hàm này nữa
    const handleLoadedMetadata = () => {
        const videoEl = document.querySelector('video');
        setVideoDuration(formatTime(videoEl.duration));
    };

    const handlePauseVideo = () => {
        const videoEl = document.querySelector('video');
        setPause(!pause);
        if (pause) {
            videoEl.play();
        } else {
            videoEl.pause();
        }
    };

    useEffect(() => {
        const videoEl = document.querySelector('video');
        videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    useEffect(() => {
        handleProgressBar();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <NavLink to={'#'} onClick={goBack}>
                    <button className={cx('close-btn')}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </NavLink>
                <div className={cx('video-warpper')}>
                    <span className={cx('pause-icon')}>{pause ? <PauseIcon width="9rem" height="9rem" /> : null}</span>
                    <video className={cx('video')} loop autoPlay onClick={handlePauseVideo} src={data.file_url}></video>
                </div>
                <div className={cx('time-range')}>
                    <input className={cx('input')} type="range" min={0} max={100} step={1}></input>
                    <div className={cx('time-progress')}>
                        {currentTime} / {videoDuration}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watching;
