import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createVideo } from '../../store/videos';
import {
	AppButton,
	CenteredContainer,
	SmallContainer as SmallContainerTemplate,
} from '../../theme';
import AppInput, { Fieldset } from '../others/AppInput';

const SmallContainer = styled(SmallContainerTemplate)`
	text-align: center;
`;

export default function VideosForm() {
	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();

	const onSubmit = video => {
		const formData = new FormData();

		formData.append('title', video.title);
		formData.append('video', video.video[0]);
		dispatch(createVideo(formData));
	};
	return (
		<CenteredContainer>
			<SmallContainer>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AppInput
						type='text'
						name='title'
						register={register}
						label='Title'
					></AppInput>
					<Fieldset>
						<label>Video File</label>
						<input
							type='file'
							{...register('video')}
							placeholder='Load a Video'
						></input>
					</Fieldset>
					<AppButton type='submit' small>
						Load Video
					</AppButton>
				</form>
			</SmallContainer>
		</CenteredContainer>
	);
}
