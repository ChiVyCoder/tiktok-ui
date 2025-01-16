import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);
function SuggestsAccounts({ label, data = [], onViewChange, isSeeAll = false }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('label')}>{label}</span>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            <p onClick={onViewChange} className={cx('more-btn')}>
                See all
            </p>
        </div>
    );
}

SuggestsAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default SuggestsAccounts;
