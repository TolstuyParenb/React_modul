import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';
const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения ' },
      isEmail: { message: 'Email введен некорректно' }
    },
    password: {
      isRequired: { message: 'Поле пароля  обязательна для заполнения ' },
      isCapitalSymbol: { message: 'Пароль должен содержать заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать одно число' },
      min: {
        message: 'пароль дожен состоять минимум из 8-ми символов',
        value: 8
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);

    for (const fieldName in data) {
      if (data[fieldName].trim() === '') {
        errors[fieldName] = `${fieldName} обязателно для заполнения`;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 offset-md-3 shadow p-4'>
          <h3 className='mb-4'>Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Электронная почта'
              name='email'
              value={data.email}
              error={errors.email}
              onChange={handleChange}
            />

            <TextField
              label='Пароль'
              name='password'
              type='password'
              value={data.password}
              error={errors.password}
              onChange={handleChange}
            />
            <button
              type='submit'
              disabled={!isValid}
              className='btn btn-primary w-100 mx-auto'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
