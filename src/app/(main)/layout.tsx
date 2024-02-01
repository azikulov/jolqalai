'use client';

import cn from 'classnames';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import MapIcon from '@/assets/icons/nav/map.svg';
import UserIcon from '@/assets/icons/nav/user.svg';
import ExitIcon from '@/assets/icons/nav/exit.svg';
import MenuIcon from '@/assets/icons/nav/burger.svg';
import TableIcon from '@/assets/icons/nav/table.svg';
import styles from './layout.module.scss';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleExit = () => {};

  return (
    <div className={styles['wrapper']}>
      <header className={styles['header']}>
        <button onClick={handleToggle} type='button' className={styles['header__menu']}>
          <MenuIcon />
        </button>
      </header>

      <aside className={cn(styles['sidebar'], isMenuOpen && styles['open'])}>
        <div className={styles['sidebar__header']}>
          <button onClick={handleToggle} className={styles['sidebar__menu-button']}>
            <MenuIcon />
          </button>

          <Link className={styles['sidebar__logo']} href='/table'>
            JolQalai
          </Link>
        </div>

        <nav className={styles['nav']}>
          <ul className={styles['nav__list']}>
            <li className={styles['nav__item']}>
              <Link
                className={cn(styles['nav__link'], pathname.includes('/table') && styles['active'])}
                href='/table'
              >
                <TableIcon className={styles['nav__link-icon']} />
                <span className={styles['nav__link-text']}>Таблица</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link
                className={cn(styles['nav__link'], pathname.includes('/map') && styles['active'])}
                href='/map'
              >
                <MapIcon className={styles['nav__link-icon']} />
                <span className={styles['nav__link-text']}>Карта</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link
                className={cn(styles['nav__link'], pathname.includes('/users') && styles['active'])}
                href='/users'
              >
                <UserIcon className={styles['nav__link-icon']} />
                <span className={styles['nav__link-text']}>Пользователи</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles['profile']}>
          <p className={styles['profile__username']}>Вы: admin</p>

          <button onClick={handleExit} className={styles['profile__button']}>
            <ExitIcon className={styles['profile__button-icon']} />
            <span className={styles['profile__button-text']}>Выйти</span>
          </button>
        </div>
      </aside>

      <main className={styles['main']}>{children}</main>
    </div>
  );
}
