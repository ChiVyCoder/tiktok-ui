import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as WrapperPopper } from '~/component/Popper';
import MenuItems from './MenuItems';
import Header from './Header';
import { data } from 'react-router-dom';

const cx = classNames.bind(styles);
const emtyFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = emtyFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            // console.log(item.children);

            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            // visible
            interactive
            delay={[0, 500]}
            offset={[16, 8]}
            arrow={true}
            hideOnClick={false}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <WrapperPopper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, history.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}> {renderItems()}</div>
                    </WrapperPopper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propType = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
