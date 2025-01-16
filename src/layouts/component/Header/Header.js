import classNames from 'classnames/bind'; // giúp cho việc viết tên class gọn gàng và đúng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoHeadlessTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
    faLanguage,
    faCoins,
    faEllipsisVertical,
    faGear,
    faQuestionCircle,
    faSignIn,
    faSignOut,
    faSun,
    faUser,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import { MailIcon, UploadIcon } from '~/component/Icons';
import Image from '~/component/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'Language',
        children: {
            title: 'language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'Tiếng Anh',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Tiếng Pháp',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Feedback and helps',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faSun} />,
        title: 'Display ',
    },
];
function Header() {
    let currentUser = false;
    // handle

    const handleMenuChange = (menuItem) => {
        // switch case
    };

    const userMenu = [
        {
            title: 'View profile',
            icon: <FontAwesomeIcon icon={faUser} />,
            to: '/profile',
        },
        {
            title: 'Get coins',
            icon: <FontAwesomeIcon icon={faCoins} />,
            to: '/coins',
        },
        {
            title: 'Settings',
            icon: <FontAwesomeIcon icon={faGear} />,
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faSignOut} />,
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        {' '}
                        <img src={images.logo} alt="logotiktok" />
                    </Link>
                </div>
                <span>
                    <Search />
                </span>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <NoHeadlessTippy delay={[0, 200]} content="Upload videos" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </NoHeadlessTippy>
                            <NoHeadlessTippy delay={[0, 200]} content="Hộp thư" placement="bottom">
                                <button className={cx('action-btn-1')}>
                                    <MailIcon />
                                </button>
                            </NoHeadlessTippy>
                        </>
                    ) : (
                        <>
                            <Button outline rounded leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('menu-avatar')}
                                src="https://upanh123.com/wp-content/uploads/2021/02/anh-luffy-dep3-745x1024.jpg"
                                alt="Tran Chi Vy"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
