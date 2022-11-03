import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../store/user';
import { AppButton } from '../../theme';
import AppInput from '../others/AppInput';
import UserFormLayout from './UserFormLayout';


export default function SignIn() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await dispatch(
      signUp({
        credentials: data
      })
    );
    reset();
    navigate('/videos');
  }

  return (
    <UserFormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppInput
          type='email'
          name="email"
          register={register}
          label="Email" />
        <AppInput
          type='text'
          name="username"
          register={register}
          label="Username" />
        <AppInput
          type='password'
          name="password"
          register={register}
          label="Password" />
        <AppButton type="submit" small>Create account</AppButton>
      </form>
    </UserFormLayout>
  )
}