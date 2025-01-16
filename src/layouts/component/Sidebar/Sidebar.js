import config from '~/config';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import Menu, { MenuItem } from './Menu';
import * as usersService from '~/services/usersService';
import { HomeIcon, LiveIcon, FollowingIcon } from '~/component/Icons/Icons';
import SuggestsAccounts from '~/component/SuggestedAccounts';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        usersService
            .getSuggested({ page: page, perPage: 5 })
            .then((data) => {
                // Merge new data with previous data
                setSuggestedAccounts((prevData) => [...prevData, ...data]);
            })
            .catch((err) => console.log(err));
    }, [page]);

    const handleViewChange = () => {
        setPage(page + 1);
    };

    return (
        <SimpleBar forceVisible="y" style={{ maxHeight: '670px' }}>
            <aside className={cx('wrapper')} data-overlayscrollbars-initialize>
                <Menu>
                    <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} />
                    <MenuItem title="Following" to={config.routes.following} icon={<FollowingIcon />} />
                    <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} />
                    <MenuItem
                        title="Profile"
                        to={config.routes.profile}
                        img="https://upanh123.com/wp-content/uploads/2021/02/anh-luffy-dep3-745x1024.jpg"
                    />
                </Menu>
                <SuggestsAccounts onViewChange={handleViewChange} label="Suggested accounts" data={suggestedAccounts} />
                <Footer></Footer>
            </aside>
        </SimpleBar>
    );
}
export default Sidebar;
