'use client';

import cn from 'classnames';

import Link from 'next/link';
import TrashIcon from '@/assets/icons/field/trash.svg';
import EditIcon from '@/assets/icons/field/pen.svg';
import styles from './page.module.scss';

export default function Users() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Список пользователей</p>

        <div className={styles['breadcrumb']}>
          <Link href='/table' className={styles['breadcrumb__link']}>
            Главная
          </Link>

          <span className={styles['breadcrumb__text']}>/</span>

          <Link href='/users' className={styles['breadcrumb__link']}>
            Пользователи
          </Link>
          <span className={styles['breadcrumb__text']}>/</span>

          <span className={styles['breadcrumb__text']}>Список пользователей</span>
        </div>

        <Link className={styles['header__button']} href='/users/add'>
          Добавить пользователя
        </Link>
      </div>

      <div className={styles['main']}>
        <h1 className={styles['main__title']}>Таблица пользователей</h1>

        <div className={styles['table-wrapper']}>
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>ML аккаунт </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {new Array(10).fill('').map((_, key) => (
                <tr key={key}>
                  <td>10449875</td>
                  <td>Bones</td>
                  <td>Да</td>
                  <td>
                    <div className={styles['table__actions']}>
                      <button className={cn(styles['table__action-button'], styles['delete'])}>
                        <TrashIcon />
                      </button>
                      <button className={cn(styles['table__action-button'], styles['edit'])}>
                        <EditIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
