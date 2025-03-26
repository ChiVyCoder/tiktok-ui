import classNames from 'classnames/bind';
import { useState } from 'react';
import { faCircleCheck, faEllipsisVertical, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import Image from '~/component/Image';
import Button from '~/component/Button';
import * as profileService from '~/services/profileService';
import { LikedIcon, ListColumnIcon, LookIcon, PauseIcon } from '~/component/Icons/Icons';
const cx = classNames.bind(styles);

function Profile() {
    const [userData, setUserData] = useState([]);
    const [userVideo, setUserVideo] = useState([]);
    const { nickname } = useParams(); // dùng để lấy ra tham số của routes
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await profileService.getUser(`@${nickname}`);
        setUserData(result);
        setUserVideo(result.videos);
    };

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
                    <Image src={userData.avatar} alt="avatar" className={cx('avatar')} />
                </div>
                <div className={cx('title-container')}>
                    <div className={cx('account-name')}>
                        <span className={cx('full-name')}>{`${userData.first_name} ${userData.last_name}`}</span>
                        {userData.tick && (
                            <span className={cx('tick')}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </span>
                        )}
                        <span className={cx('nick-name')}>@{userData.nickname}</span>
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
                                <strong className={cx('count')}>{userData.followers_count}</strong>
                                <span className={cx('count-unit')}>Followers</span>
                            </span>
                            <span className={cx('count-info')}>
                                <strong className={cx('count')}>{userData.followings_count}</strong>
                                <span className={cx('count-unit')}>Following</span>
                            </span>
                            <span className={cx('count-info')}>
                                <strong className={cx('count')}>{userData.likes_count}</strong>
                                <span className={cx('count-unit')}>Like</span>
                            </span>
                        </h2>
                        <h3 className={cx('bio')}>{userData.bio}</h3>
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
                            {userVideo.map((video, index) => (
                                <div
                                    className={cx('video-item')}
                                    onMouseOut={handleMouseOut}
                                    onMouseOver={handleMouseOver}
                                    key={index}
                                >
                                    <NavLink to={`/video/${video.id}`} className={cx('a-video-item')}>
                                        <video muted className={cx('video')} src={video.file_url} />
                                        <div className={cx('video-footer')}>
                                            <PauseIcon />
                                            <strong className={cx('views-count')}>{video.views_count}</strong>
                                        </div>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('videos-liked')}>
                        <LookIcon />
                        <div className={cx('video-like-main-title')}>
                            Video đã thích của người dùng này ở trạng thái riêng tư
                        </div>
                        <div className={cx('video-like-sub-title')}>
                            {`Các video được thích bởi ${userData.nickname} hiện đang ẩn`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
