import classNames from 'classnames/bind';
import styles from './Interact.module.scss';
import { useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

function Interact({ icon, value, className, wrapsize = '48px', row }) {
    const wrapperEl = useRef(null);
    const containerEl = useRef(null);
    const setStyles = (size) => {
        const wapperElStyle = wrapperEl.current;
        if (wapperElStyle) {
            wapperElStyle.style.width = size;
            wapperElStyle.style.height = size;
        }
    };
    const setLayout = () => {
        const containerElStyle = containerEl.current;
        if (containerElStyle) {
            if (row) {
                containerElStyle.style.flexDirection = 'row';
            } else {
                containerElStyle.style.flexDirection = 'column';
            }
        }
    };
    useEffect(() => {
        setLayout();
        setStyles(wrapsize);
    }, [wrapsize, row]);
    return (
        <div className={cx('wrapper', className)} ref={containerEl}>
            <span className={cx('circle-wrapper')} ref={wrapperEl}>
                <span className={cx('icon')}>{icon}</span>
            </span>
            <span className={cx('value')}>{value}</span>
        </div>
    );
}

export default Interact;
