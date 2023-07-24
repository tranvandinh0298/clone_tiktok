import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const searchInputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchInputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleShowResult = () => {
        setShowResult(true);
    };
    return (
        <div>
        <HeadlessTippy
            interactive={true}
            // appendTo={() => document.body}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={searchInputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck="false"
                    onChange={handleSearch}
                    onFocus={handleShowResult}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />}
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
        </div>
    );
}

export default Search;
