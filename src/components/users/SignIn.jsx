import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, signIn, signUp } from '../../store/user';
import { AppButton } from '../../theme';
import AppInput from '../others/AppInput';
import UserFormLayout from './UserFormLayout';

export default function SignIn() {
	const dispatch = useDispatch();
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = data => {
		dispatch(
			signIn({
				credentials: data,
			})
		);
		reset();
	};

	return (
		<UserFormLayout>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AppInput type='email' name='email' register={register} label='Email' />
				<AppInput
					type='password'
					name='password'
					register={register}
					label='Password'
				/>
				<AppButton type='submit' small>
					Sign In
				</AppButton>
			</form>
		</UserFormLayout>
	);
}
