import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import Image from '~/component/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './SuggestedAccounts.module.scss';
import { Wrapper as WrapperPopper } from '~/component/Popper';
import PreviewItem from './PreviewItem';

const cx = classNames.bind(styles);

const renderPreview = (props, data) => {
    return (
        <div className={cx('preview')} tabIndex="-1" {...props}>
            <WrapperPopper>
                <PreviewItem data={data} />
            </WrapperPopper>
        </div>
    );
};

function AccountItem({ data }) {
    return (
        <div>
            <Tippy
                offset={[-20, 0]}
                interactive
                delay={[800, 0]}
                placement="bottom"
                render={(props) => renderPreview(props, data)}
            >
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt="img" />
                    <div className={cx('item-info')}>
                        <p className={cx('nick-name')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.full_name}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

PreviewItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
