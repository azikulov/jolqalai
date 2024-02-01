'use client';

import cn from 'classnames';

import Link from 'next/link';
import styles from './page.module.scss';

export default function Add() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Добавление пользователя</p>

        <div className={styles['breadcrumb']}>
          <Link href='/table' className={styles['breadcrumb__link']}>
            Главная
          </Link>

          <span className={styles['breadcrumb__text']}>/</span>

          <Link href='/users' className={styles['breadcrumb__link']}>
            Пользователи
          </Link>
          <span className={styles['breadcrumb__text']}>/</span>

          <span className={styles['breadcrumb__text']}>Добавление пользователя</span>
        </div>
      </div>

      <div className={styles['form']}>
        <label className={styles['form__field']}>
          <span className={styles['form__field-title']}>Логин</span>
          <input type='text' className={styles['form__field-input']} />
        </label>

        <label className={styles['form__field']}>
          <span className={styles['form__field-title']}>Пароль</span>
          <input type='text' className={styles['form__field-input']} />
        </label>

        <label className={styles['form__field']}>
          <span className={styles['form__field-title']}>ML аккаунт</span>
          <select className={styles['form__field-input']}>
            <option value='' defaultChecked>
              Выберите значение
            </option>
            <option value='yes'> Да</option>
            <option value='no'>Нет</option>
          </select>
        </label>

        <button className={styles['form__button']}>Добавить пользователя</button>
      </div>
    </div>
  );
}
