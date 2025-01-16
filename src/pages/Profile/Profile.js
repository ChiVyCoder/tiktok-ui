import classNames from 'classnames/bind';
import { faEllipsisVertical, faSadCry, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import styles from './Profile.module.scss';
import Image from '~/component/Image';
import Button from '~/component/Button';
import { LikedIcon, ListColumnIcon, LookIcon, PauseIcon } from '~/component/Icons/Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Profile() {
    const handleBottomLine = () => {
        const feedTabActive = document.getElementsByClassName(cx('feedTab-item', 'active'))[0];
        const bottomLine = document.getElementsByClassName(cx('bottom-line'))[0];
        bottomLine.style.width = feedTabActive.offsetWidth + 'px';
        bottomLine.style.left = feedTabActive.offsetLeft + 'px';
    };
    const handleChangeTab = (num) => {
        const feedTabActive = document.getElementsByClassName(cx('feedTab-item', 'active'))[0];
        const feedTabs = document.getElementsByClassName(cx('feedTab-item'));
        const userVideosTab = document.getElementsByClassName(cx('videos'))[0];
        const videosLikedTab = document.getElementsByClassName(cx('videos-liked'))[0];

        const activeClass = cx('active');
        if (feedTabActive) {
            feedTabActive.classList.remove(activeClass);
        }
        feedTabs[num].classList.add(activeClass);
        if (num === 0) {
            userVideosTab.style.display = 'flex';
            videosLikedTab.style.display = 'none';
        } else if (num === 1) {
            userVideosTab.style.display = 'none';
            videosLikedTab.style.display = 'flex';
        }
        handleBottomLine();
    };
    const handleRevealVideosTab = () => {
        const userVideosTab = document.getElementsByClassName(cx('videos'))[0];
        const videosLikedTab = document.getElementsByClassName(cx('videos-liked'))[0];
        userVideosTab.style.display = 'flex';
        videosLikedTab.style.display = 'none';
    };
    const handleMouseOver = (e) => {
        const videoEl = e.currentTarget.querySelector('video');
        if (videoEl) {
            videoEl.play();
        }
    };
    const handleMouseOut = (e) => {
        const videoEl = e.currentTarget.querySelector('video');
        if (videoEl) {
            videoEl.pause();
        }
    };
    useEffect(() => {
        const timer1 = setTimeout(() => handleBottomLine(), 100);
        const timer2 = setTimeout(() => handleRevealVideosTab(), 100);
        return () => clearTimeout(timer1, timer2);
    }, []);

    return (
        <div className={cx('wrapper', 'clearfix')}>
            <div className={cx('header')}>
                <div>
                    <Image
                        src="https://upanh123.com/wp-content/uploads/2021/02/anh-luffy-dep3-745x1024.jpg"
                        alt="avatar"
                        className={cx('avatar')}
                    />
                </div>
                <div className={cx('title-container')}>
                    <div className={cx('account-name')}>
                        <span className={cx('full-name')}>Tran Chi Vy</span>
                        <span className={cx('nick-name')}>@tranchivy</span>
                    </div>
                    <div className={cx('button-panel-wrapper')}>
                        <Button className={cx('follow-btn')} primary>
                            Follow
                        </Button>
                        <Button className={cx('mesage-btn')}>Message</Button>
                        <button className={cx('share-icon')} small>
                            <FontAwesomeIcon icon={faShare} />
                        </button>
                        <button className={cx('options-icon')} small>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </div>
                    <div className={cx('text-container')}>
                        <h2 className={cx('count-infos')}>
                            <span className={cx('count-info')}>
                                <strong className={cx('count')}>12</strong>
                                <span className={cx('count-unit')}>Followers</span>
                            </span>
                            <span className={cx('count-info')}>
                                <strong className={cx('count')}>12</strong>
                                <span className={cx('count-unit')}>Following</span>
                            </span>
                            <span className={cx('count-info')}>
                                <strong className={cx('count')}>12</strong>
                                <span className={cx('count-unit')}>Like</span>
                            </span>
                        </h2>
                        <h3 className={cx('bio')}>
                            Mọi người theo dõi kênh mới của mình nha Giúp mình lên 1k fl vs ạ 🥹 Mọi người theo dõi kênh
                            mới của mình nha Giúp mình lên 1k fl vs ạ 🥹
                        </h3>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('feedTab-wrapper')}>
                    <div className={cx('video-feedTab')}>
                        <p className={cx('feedTab-item', 'active')} onClick={() => handleChangeTab(0)}>
                            <ListColumnIcon className={cx('feedTab-icon')} />
                            Video
                        </p>
                        <p className={cx('feedTab-item')} onClick={() => handleChangeTab(1)}>
                            <LikedIcon className={cx('feedTab-icon')} />
                            Liked
                        </p>
                        <span className={cx('bottom-line')}></span>
                    </div>
                </div>
                <div className={cx('user-video')}>
                    <div className={cx('videos', 'active')}>
                        <div className={cx('container')}>
                            <div className={cx('video-item')} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                                <Link className={cx('a-video-item')}>
                                    <video
                                        muted
                                        className={cx('video')}
                                        src="https://files.fullstack.edu.vn/f8-tiktok/videos/59-6304ab495bae9.mp4"
                                    />
                                    <div className={cx('video-footer')}>
                                        <PauseIcon />
                                        <strong className={cx('views-count')}>1232</strong>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('videos-liked')}>
                        <LookIcon />
                        <div className={cx('video-like-main-title')}>
                            Video đã thích của người dùng này ở trạng thái riêng tư
                        </div>
                        <div className={cx('video-like-sub-title')}>
                            Các video được thích bởi livedanhgiay2001 hiện đang ẩn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
