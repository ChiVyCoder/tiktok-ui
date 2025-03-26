import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUpFromBracket,
    faBookmark,
    faCircleNotch,
    faCommentDots,
    faEllipsisVertical,
    faFlag,
    faHeartCrack,
    faMusic,
    faPlay,
    faShare,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

import Image from '~/component/Image';
import { HeartIcon } from '~/component/Icons/Icons';
import Interact from '../Interact/Interact';
import AdOverlay from '~/component/AdOverlay/AdOverlay';
import { Wrapper as WrapperPopper } from '~/component/Popper';
import Button from '~/component/Button';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

function Content({ data, loadMore }) {
    const wrapperRef = useRef(null);
    const observerRef = useRef(null);
    const videoRef = useRef(null);
    const [adClosed, setAdClosed] = useState(false);
    const [rangeValue, setRangeValue] = useState(100);
    const [memoRangeValue, setMemoRangeValue] = useState(rangeValue);
    const [muted, setMuted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pauseBtn, setPauseBtn] = useState(false);

    // Kiểm tra video-content có nằm trong viewport không
    useEffect(() => {
        const container = wrapperRef.current;
        const options = {
            root: container,
            rootMargin: '0px',
            threshold: 0.1, // 10% của phần tử cần phải nằm trong khung nhìn
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && adClosed) {
                    handleVideoIn(entry);
                } else {
                    handleVideoOut(entry);
                }
            });
        }, options);

        const items = container.getElementsByClassName(cx('video-content'));
        Array.from(items).forEach((item) => {
            observerRef.current.observe(item);
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [data, adClosed]);

    // Xử lý video trong khung nhìn
    const handleVideoIn = (entry) => {
        const videoElement = entry.target.querySelector('video');
        if (videoElement) {
            videoElement.play();
            setPauseBtn(false);
            setLoading(false);
            videoElement.muted = false;
            videoElement.addEventListener('click', handleClickVideo);
        }
    };
    // Xử lý video ngoài khung nhìn
    const handleVideoOut = (entry) => {
        const videoElement = entry.target.querySelector('video');
        if (videoElement) {
            videoElement.pause();
            videoElement.removeEventListener('click', handleClickVideo);
        }
    };

    // Xử lý quảng cáo
    const handleAdClose = () => {
        setAdClosed(true);
    };
    // Xử Lý Cuộn để tải thêm video
    useEffect(() => {
        const handleScroll = () => {
            const container = wrapperRef.current;
            if (container.clientHeight + Math.ceil(container.scrollTop) >= container.scrollHeight - 60) {
                loadMore();
            }
        };
        wrapperRef.current.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    // Xử lý click vào video để ngưng phát
    const handleClickVideo = (e) => {
        const videoEl = e.target;
        if (videoEl.paused) {
            videoEl.play();
            setPauseBtn(false);
        } else {
            videoEl.pause();
            setPauseBtn(true);
        }
    };

    // Xử lý thanh volumn

    const handleVolumeChange = (e) => {
        const videoElements = wrapperRef.current.querySelectorAll('video');
        const volumeValue = e.target.value;
        if (volumeValue === '0') {
            setMuted(true);
        } else {
            setMuted(false);
        }
        setMemoRangeValue(volumeValue);
        setRangeValue(volumeValue);
        videoElements.forEach((videoElement) => (videoElement.volume = volumeValue / 100));
    };

    // Xử lý bật tắt âm thanh

    const handleToggleVolume = () => {
        setMuted(!muted);
        const newVolume = muted ? memoRangeValue : 0;
        setRangeValue(newVolume);
        const videoElements = wrapperRef.current.querySelectorAll('video');
        videoElements.forEach((videoElement) => (videoElement.volume = newVolume / 100));
    };

    // Xử lí hiệu ứng loading
    const updateLoadingIcon = () => {
        if ((navigator.connection && navigator.connection.downlink < 1) || !navigator.onLine) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    };
    useEffect(() => {
        navigator.connection.addEventListener('change', updateLoadingIcon);
        window.addEventListener('offline', () => setLoading(true));
        window.addEventListener('online', () => setLoading(false));
        if (videoRef.current) {
            //waiting của video được kích hoạt khi video tạm dừng để tải thêm dữ liệu (buffering).
            videoRef.current.addEventListener('waiting', () => setLoading(true));
            videoRef.current.addEventListener('playing', () => setLoading(false));
        }
        updateLoadingIcon(); // Kiểm tra ban đầu khi trang được tải
        return () => {
            navigator.connection.removeEventListener('change', updateLoadingIcon);
            window.removeEventListener('offline', () => setLoading(true));
            window.removeEventListener('online', () => setLoading(false));
            if (videoRef.current) {
                videoRef.current.removeEventListener('waiting', () => setLoading(true));
                videoRef.current.removeEventListener('playing', () => setLoading(false));
            }
        };
    }, []);

    // render options
    const handleRenderOptions = () => {
        return (
            <div className={cx('options-wrapper')}>
                <WrapperPopper>
                    <div className={cx('options-item')}>
                        <FontAwesomeIcon className={cx('options-icon')} icon={faArrowUpFromBracket} />
                        Cuộn tự động
                    </div>
                    <div className={cx('options-item')}>
                        <FontAwesomeIcon className={cx('options-icon')} icon={faHeartCrack} />
                        Không quan tâm
                    </div>
                    <div className={cx('options-item')}>
                        <FontAwesomeIcon className={cx('options-icon')} icon={faFlag} />
                        Báo cáo
                    </div>
                </WrapperPopper>
            </div>
        );
    };
    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            {!adClosed && (
                <AdOverlay
                    adContent={
                        'https://i0.wp.com/lovebelfast.co.uk/wp-content/uploads/2021/07/tik-tok-6016006_1280.png?w=1280&ssl=1'
                    }
                    onCloseAd={handleAdClose}
                />
            )}
            {data.map((video) => (
                <div key={video.id} className={cx('video-content')}>
                    <div className={cx('video-info')}>
                        <div className={cx('account-info-header')}>
                            <span className={cx('account-info')}>
                                <NavLink to={`/profile/${video.user.nickname}`}>
                                    <Image className={cx('avatar')} src={video.user.avatar} />
                                </NavLink>
                                <NavLink
                                    to={`/profile/${video.user.nickname}`}
                                    className={cx('user-name')}
                                >{`${video.user.first_name} ${video.user.last_name} `}</NavLink>
                                {video.user.tick && <span className={cx('tick')}>{video.user.tick}</span>}
                                <span className={cx('nick-name')}>@{video.user.nickname}</span>
                            </span>
                            <Button primary children={'Follow'} />
                        </div>
                        <span className={cx('description')}>
                            {video.description} <br />
                        </span>
                        <span className={cx('background-music')}>
                            <FontAwesomeIcon icon={faMusic} className={cx('note')} />
                            {video.music ? video.music : 'Âm thanh trong video'}
                        </span>
                    </div>
                    <div className={cx('video-interact')}>
                        {video.file_url && (
                            <span className={cx('video-wrapper')}>
                                <video
                                    className={cx('video')}
                                    poster={video.thumb_url}
                                    loop
                                    src={video.file_url}
                                    ref={videoRef}
                                ></video>
                                {pauseBtn && (
                                    <span className={cx('pause')}>
                                        <FontAwesomeIcon className={cx('pause-icon')} icon={faPlay} />
                                    </span>
                                )}
                                {loading && (
                                    <span className={cx('video-loading')}>
                                        <FontAwesomeIcon
                                            className={cx('loading-icon')}
                                            icon={faCircleNotch}
                                            style={{ color: '#ff3b5c' }}
                                        />
                                    </span>
                                )}
                                <span className={cx('video-utilities')}>
                                    <span>
                                        <Tippy
                                            interactive
                                            placement="bottom-start"
                                            offset={[0, -10]}
                                            render={handleRenderOptions}
                                        >
                                            <div>
                                                <FontAwesomeIcon className={cx('options')} icon={faEllipsisVertical} />
                                            </div>
                                        </Tippy>
                                    </span>
                                    <div className={cx('volumn-btn')}>
                                        <input
                                            className={cx('volumn-range')}
                                            type="range"
                                            min={0}
                                            max={100}
                                            step={1}
                                            onChange={handleVolumeChange}
                                            value={rangeValue}
                                        />
                                        <span onClick={handleToggleVolume} className={cx('volumn-icon')}>
                                            {muted ? (
                                                <FontAwesomeIcon className={cx('volumn-hight')} icon={faVolumeXmark} />
                                            ) : (
                                                <FontAwesomeIcon className={cx('volumn-muted')} icon={faVolumeHigh} />
                                            )}
                                        </span>
                                    </div>
                                </span>
                            </span>
                        )}
                        <div className={cx('interact')}>
                            <Interact icon={<HeartIcon />} value={video.likes_count} />
                            <NavLink to={`/video/${video.id}`}>
                                <Interact
                                    icon={<FontAwesomeIcon icon={faCommentDots} />}
                                    value={video.comments_count}
                                />
                            </NavLink>
                            <Interact icon={<FontAwesomeIcon icon={faBookmark} />} value={0} />
                            <Interact icon={<FontAwesomeIcon icon={faShare} />} value={video.shares_count} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Content;
