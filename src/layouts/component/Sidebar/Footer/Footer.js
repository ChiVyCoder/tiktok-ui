import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import LinkContainer from './LinkContainer';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Footer() {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleShow = (index) => {
        if (index === activeIndex) {
            // Nếu mục được nhấn hiện đang active, gỡ bỏ active
            setActiveIndex(null);
        } else {
            // Nếu mục được nhấn không phải là mục hiện tại, thiết lập active
            setActiveIndex(index);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <a href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main">
                    <img
                        className={cx('banner-img')}
                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop-islands/021d2ed936cbb9f7033f.png"
                        alt="banner"
                    />
                </a>
            </div>
            <h4
                className={cx('link-list', { active: activeIndex === 0 })}
                onClick={() => {
                    handleShow(0);
                }}
            >
                Công ty
                {activeIndex === 0 && <LinkContainer page_link={['giới thiệu', 'Phòng tin tức', 'liên hệ']} />}
            </h4>
            <h4
                className={cx('link-list', { active: activeIndex === 1 })}
                onClick={() => {
                    handleShow(1);
                }}
            >
                Chương trình
                {activeIndex === 1 && (
                    <LinkContainer
                        page_link={[
                            'TikTok for Good',
                            'Quảng cáo',
                            'Đại lý TikTok',
                            'LIVE',
                            'Nhà phát triển',
                            'Minh bạch',
                            'Phần thưởng trên TikTok',
                        ]}
                    />
                )}
            </h4>
            <h4
                className={cx('link-list', { active: activeIndex === 2 })}
                onClick={() => {
                    handleShow(2);
                }}
            >
                Điều khoản và Chính sách
                {activeIndex === 2 && (
                    <LinkContainer
                        page_link={[
                            'Trợ giúp',
                            'An toàn',
                            'Điều khoản',
                            'Chính sách quyền riêng tư',
                            'Trợ năng',
                            'Trung tâm quyền riêng tư',
                            'Học viện cho nhà sáng tạo',
                            'Nguyên tắc Cộng đồng',
                        ]}
                    />
                )}
            </h4>
            <h4 className={cx('copyright')}>© 2024 TikTok</h4>
        </div>
    );
}

export default Footer;
