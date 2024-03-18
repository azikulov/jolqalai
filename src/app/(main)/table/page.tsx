'use client';

import Link from 'next/link';
import SearchIcon from '@/assets/icons/field/search.svg';
import styles from './page.module.scss';
import Cities from '../map/cities.json';
import { useState } from 'react';

const Table: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

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
        <input
          type='number'
          inputMode='numeric'
          className={styles['filters__field']}
          placeholder='Поиск по ID'
          onChange={({target: {value}}) => setSearchValue(value)}
        />

        <input type='text' onChange={({target: {value}}) => setSearchValue(value)} className={styles['filters__field']} placeholder='Поиск по Улице' />

        <input type='date' onChange={({target: {value}}) => setSearchValue(value)} className={styles['filters__field']} />

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
                <th>Улица</th>
                <th>Время</th>
                <th>Фотография</th>
              </tr>
            </thead>

            <tbody>
              {Cities.filter((city) => String(city.id).includes(searchValue)).map((city, key) => (
                <tr key={key}>
                  <td>{city.id}</td>
                  <td>{city.latitude}</td>
                  <td>
                    {city.date} {city.time}
                  </td>
                  <td>
                    <img src={`/assets/photos/${city.photo}`} alt='' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
