import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleChange = (target) => {
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
    },
    profession: {
      isRequired: { message: 'Обязательно выберете вашу профессию' }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без лицензионного соглашения'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);

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

      <SelectField
        label='Выбери свою профессию...'
        onChange={handleChange}
        options={professions}
        name='profession'
        defaultOption='Choose...'
        value={data.profession}
        error={errors.profession}
      />

      <RadioField
        label='Выберете ваш пол'
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
      />

      <MultiSelectField
        label='Выберете ваши качества'
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name='qualities'
      />

      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>

      <button
        type='submit'
        disabled={!isValid}
        className='btn btn-primary w-100 mx-auto'
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
