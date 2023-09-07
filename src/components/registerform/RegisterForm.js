import { useDispatch } from 'react-redux';
import { register } from 'redux/actions';
import { useState } from 'react';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const form = e.currentTarget;
    const result = await dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );

    if (register.fulfilled.match(result)) {
      form.reset();
    } else {
      setError(result.payload.error);
    }
  };

  return (
    <form
      className={css.registerForm}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <label>
        Username
        <input type="text" name="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};
