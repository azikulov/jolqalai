import styles from './page.module.scss';

export default function Signin() {
  return (
    <div className={styles['wrapper']}>
      <form className={styles['form']}>
        <h1 className={styles['form__title']}>Авторизация</h1>

        <input className={styles['form__field']} type='text' placeholder='Введите ваш логин' />
        <input className={styles['form__field']} type='password' placeholder='Введите ваш пароль' />

        <button type='submit' className={styles['form__submit']}>
          Войти
        </button>
      </form>
    </div>
  );
}
