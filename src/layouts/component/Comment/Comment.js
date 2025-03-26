import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { faCircleDot, faCommentDots, faBookmark, faShare, faMusic } from '@fortawesome/free-solid-svg-icons';
import styles from './Comment.module.scss';
import Image from '~/component/Image';
import Button from '~/component/Button';
import {
    EmotionIcon,
    FacebookIcon,
    HeartIcon,
    MentionIcon,
    ReupIcon,
    SendIcon,
    WhatappsIcon,
} from '~/component/Icons/Icons';

import Interact from '../Home/component/Interact/Interact';

const cx = classNames.bind(styles);
function Comment({ data }) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('description-content')}>
                        <div className={cx('acc-info')}>
                            <div className={cx('acc-info-left')}>
                                <Image className={cx('avatar')} src={data.user.avatar}></Image>
                                <span className={cx('user-name')}>
                                    <span
                                        className={cx('fullname')}
                                    >{` ${data.user.first_name} ${data.user.last_name}`}</span>
                                    <span className={cx('nickname-container')}>
                                        <span className={cx('nickname')}>{`@${data.user.nickname}`}</span>
                                        <span className={cx('dot')}>
                                            <FontAwesomeIcon icon={faCircleDot} />
                                        </span>
                                        <span className={cx('public-time')}>23 hours ago</span>
                                    </span>
                                </span>
                            </div>
                            <div className={cx('follow-btn')}>
                                <Button primary>Follow</Button>
                            </div>
                        </div>
                        <div className={cx('description')}>{data.description}</div>
                        <div className={cx('background-music')}>
                            <span>
                                <FontAwesomeIcon className={cx('note-icon')} icon={faMusic} />
                            </span>
                            <span className={cx('music-name')}>{data.music ? data.music : 'Âm thanh trong video'}</span>
                        </div>
                    </div>
                    <div className={cx('video-interact')}>
                        <div className={cx('interract-left')}>
                            <Interact
                                row
                                wrapsize="32px"
                                icon={<HeartIcon width="1.7rem" height="1.7rem" />}
                                value={data.likes_count}
                            />
                            <Interact
                                row
                                wrapsize="32px"
                                icon={<FontAwesomeIcon width="1.7rem" height="1.7rem" icon={faCommentDots} />}
                                value={data.comments_count}
                            />
                            <Interact
                                row
                                wrapsize="32px"
                                icon={<FontAwesomeIcon width="1.0rem" height="1.0rem" icon={faBookmark} />}
                                value={0}
                            />
                        </div>
                        <div className={cx('interract-right')}>
                            <Interact wrapsize="27px" icon={<ReupIcon />} />
                            <Interact wrapsize="27px" icon={<SendIcon />} />
                            <Interact wrapsize="27px" icon={<FacebookIcon />} />
                            <Interact wrapsize="27px" icon={<WhatappsIcon />} />
                            <Interact wrapsize="27px" icon={<FontAwesomeIcon fontSize="1.2rem" icon={faShare} />} />
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('tab-menu')}>
                        <div className={cx('tab-menu-comment')}>Bình luận {data.comments_count}</div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('input-container')}>
                    <input
                        value={inputValue}
                        className={cx('input')}
                        ref={inputRef}
                        placeholder="Thêm bình luận..."
                        onChange={handleInput}
                    ></input>
                    <div className={cx('right-btn')}>
                        <span className={cx('mention-btn')}>
                            <Tippy arrow content="Dùng ký hiệu '@' để gắn thẻ một người dùng trong bình luận của bạn">
                                <div>
                                    <MentionIcon />
                                </div>
                            </Tippy>
                        </span>
                        <span className={cx('emotion-btn')}>
                            <Tippy arrow content="Nhấp để thêm emoji">
                                <div>
                                    <EmotionIcon />
                                </div>
                            </Tippy>
                        </span>
                        <button className={cx('post-btn', { 'is-active': inputValue.length > 0 })}>Đăng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Comment;
