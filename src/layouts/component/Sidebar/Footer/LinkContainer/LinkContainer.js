import classNames from 'classnames/bind';
import styles from './LinkContainer.module.scss';

const cx = classNames.bind(styles);

function LinkContainer({ page_link }) {
    return (
        <div className={cx('wrapper')}>
            {page_link.map((link, index) => (
                <a key={index} className={cx('page_link')}>
                    {link}
                </a>
            ))}
        </div>
    );
}

export default LinkContainer;
