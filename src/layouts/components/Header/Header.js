import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faEllipsisVertical,
    faKeyboard,
    faLanguage,
    faSignIn,
    faGear,
    faUser,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/config';
import Button from '~/components/Button';
import { Menu as MenuWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '~/layouts/components/Search';
const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                }
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = false;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle language change
                break;
            default:
                break;
        }
    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faBitcoin} />,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Logout',
            to: '/logout',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />
                <div className={cx('actions')}>
                    <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                        <button className={cx('action-btn')}>
                            <UploadIcon />
                        </button>
                    </Tippy>
                    {!!currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} to="https://youtube.com" abc="abc" />}>
                            <span>Login</span>
                        </Button>
                    )}
                    <MenuWrapper items={!!currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {!!currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1671782400&x-signature=kgmqwxkjn3h5T06h5eVI7IFNR7A%3D"
                                alt="Avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </MenuWrapper>
                </div>
            </div>
        </header>
    );
}

export default Header;
