import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Following.module.scss';
import Button from '~/component/Button';
import * as videosService from '~/services/videosService';
import Image from '~/component/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Following() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        loadUserList();
    }, []);
    const loadUserList = async () => {
        const response = await videosService.getVideos('for-you', 6);
        setUsers(response);
    };
    const handleMouseOut = (e) => {
        const videoEl = e.currentTarget.querySelector('video');
        if (videoEl) {
            videoEl.pause();
        }
    };
    const handleHover = (e) => {
        const videoEl = e.currentTarget.querySelector('video');
        if (videoEl) {
            videoEl.play();
        }
    };
    return (
        <div className={cx('wrapper')}>
            {console.log('rendering')}
            {users.map((user) => (
                <div onMouseOut={handleMouseOut} onMouseOver={handleHover} key={user.id} className={cx('user-card')}>
                    <video muted loop className={cx('user-video')} src={user.file_url} />
                    <div className={cx('info-contant')}>
                        <Image className={cx('avatar')} alt="avatar" src={user.user.avatar} />
                        <span className={cx('user-name')}>{`${user.user.first_name} ${user.user.last_name} `}</span>
                        <span className={cx('nick-name')}>
                            @{user.user.nickname}
                            {user.user.tick && (
                                <span className={cx('tick')}>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                </span>
                            )}
                        </span>
                        <Button className={cx('follow-btn')} primary large>
                            Follow
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Following;
