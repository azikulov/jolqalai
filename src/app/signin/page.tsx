import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AuthService } from '@/api/services/Auth';

import styles from './page.module.scss';
import { User } from '@/api/models/Auth';

export default function Signin() {
  const { register, handleSubmit } = useForm<User>();

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login,
  });

  const handleAuth = async (user: User) => {
    try {
      const response = await login.mutateAsync(user);

      console.log(response.data);
    } catch (error) {
      console.error('[JolQalai] Произошла ошибка при авторизаций пользователя!');
      throw error;
    }
  };

  return (
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit(handleAuth)} className={styles['form']}>
        <h1 className={styles['form__title']}>Авторизация</h1>

        <input
          className={styles['form__field']}
          type='text'
          placeholder='Введите ваш логин'
          {...register('email')}
        />
        <input
          className={styles['form__field']}
          type='password'
          placeholder='Введите ваш пароль'
          {...register('password')}
        />

        <button disabled={login.isLoading} type='submit' className={styles['form__submit']}>
          {login.isLoading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
