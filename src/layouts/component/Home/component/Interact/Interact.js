import classNames from 'classnames/bind';
import styles from './Interact.module.scss';

const cx = classNames.bind(styles);

function Interact({ icon, value }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('circle-wrapper')}>
                <span className={cx('icon')}>{icon}</span>
            </span>
            <span className={cx('value')}>{value}</span>
        </div>
    );
}

export default Interact;
