import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
// import * as yup from 'yup';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  // const validateScheme = yup.object().shape({
  //   email: yup
  //     .string()
  //     .required('Электронная почта обязательна для заполнения ')
  //     .email('Email введен некорректно'),
  //   password: yup
  //     .string()
  //     .required('Поле пароля  обязателен для заполнения ')
  //     .password('Email введен некорректно')
  //     .matches(/(?=.*[A-Z])/, 'Пароль должен содержать заглавную букву')
  //     .matches(/(?=.*[0-9])/, 'Пароль должен содержать одно число')
  //     .matches(
  //       /(?=.*[!@#$%^&*])/,
  //       'Пароль должен содержать один из специяльных символов !@#$%^&*'
  //     )
  //     .matches(/(?=.[8,])/, 'Пароль должен состоять из 8 символов')
  // });

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения ' },
      isEmail: { message: 'Email введен некорректно' }
    },
    password: {
      isRequired: { message: 'Поле пароля  обязателен для заполнения ' },
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
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));
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

      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
      </CheckBoxField>
      <button
        type='submit'
        disabled={!isValid}
        className='btn btn-primary w-100 mx-auto mb-4'
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
