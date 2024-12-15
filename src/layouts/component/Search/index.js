import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as WrapperPopper } from '~/component/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as searchServices from '~/services/searchService';
import AccountItem from '~/component/AccountItem';
import styles from './Search.module.scss';
import { SearchIcon } from '~/component/Icons';
import { useDebounce } from '~/hook';

const cx = classNames.bind(styles);
function Search() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const handleHideResult = () => {
        setShowResults(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(searchValue);
    };
    // goi API
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);
    return (
        // sử dụng div
        <div>
            <Tippy
                interactive
                // appendTo={() => document.body}
                visible={showResults && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <WrapperPopper>
                            <h4 className={cx('search-title')}>accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </WrapperPopper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        placeholder="Search videos and accounts"
                        spellCheck={false}
                        onFocus={() => setShowResults(true)}
                    />
                    {searchValue && !loading && (
                        <button
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                            }}
                            className={cx('clear')}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
