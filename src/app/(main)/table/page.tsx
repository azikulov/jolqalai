'use client';

import Link from 'next/link';
import SearchIcon from '@/assets/icons/field/search.svg';
import styles from './page.module.scss';

export default function Table() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Таблица</p>
        <div className={styles['breadcrumb']}>
          <Link href='/table' className={styles['breadcrumb__link']}>
            Главная
          </Link>
          <span className={styles['breadcrumb__text']}>/</span>
          <span className={styles['breadcrumb__text']}>Таблица</span>
        </div>
      </div>
      <div className={styles['filters']}>
        <select className={styles['filters__field']}>
          <option value='user'>user</option>
        </select>

        <input type='date' className={styles['filters__field']} />

        <button className={styles['filters__search-button']}>
          <SearchIcon />
          <span>Найти</span>
        </button>
      </div>

      <div className={styles['main']}>
        <h1 className={styles['main__title']}>Таблица позиций</h1>

        <div className={styles['table-wrapper']}>
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Улица</th>
                <th>Км/ч</th>
                <th>Время</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10449875</td>
                <td>Bones</td>
                <td>проспект Бухар Жырау</td>
                <td>93.43</td>
                <td>2023-09-06 10:05:27</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
