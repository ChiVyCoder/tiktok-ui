import classNames from 'classnames/bind';
import styles from './AdOverlay.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
// Hàm hiện quảng cáo
function AdOverlay({ adContent, onCloseAd }) {
    const [ad, setAd] = useState(true);
    const handleAdClose = () => {
        setAd(false);
        onCloseAd(); // Gọi hàm onCloseAd để thực hiện hành động khi quảng cáo bị đóng
    };

    if (ad) {
        return (
            <div className={cx('wrapper')}>
                <span className={cx('content')}>
                    <img className={cx('ad-img')} src={adContent}></img>
                    <div className={cx('close-btn')} onClick={handleAdClose}>
                        X
                    </div>
                </span>
            </div>
        );
    } else return null;
}

export default AdOverlay;
