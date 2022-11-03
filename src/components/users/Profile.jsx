import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadVideosForUser } from '../../store/videos';
import { AppButton as AppButtonTemplate, SmallContainer } from '../../theme';
import VideoThumbnail from '../videos/Thumbnail';
import LogOutButtonTemplate from './LogOutButton';

const ProfileHeader = styled.header`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, minmax(auto, 1fr));
	grid-template-rows: 100px;
	grid-template-areas:
		'imageContainer imageContainer imageContainer imageContainer imageContainer imageContainer'
		'userInfo userInfo userInfo userInfo userInfo userInfo'
		'following following followers followers likes likes'
		'edit edit edit logOut logOut logOut';

	text-align: center;

	padding: ${({ theme }) => theme.dims.padding.largePadding};
	& .image-container {
		grid-area: imageContainer;
	}
	& .info-container {
		grid-area: userInfo;
	}
`;
const ProfileImage = styled.img`
	max-height: 100%;
	border-radius: 50%;
`;
const Pill = styled.span`
	background-color: ${({ theme }) => theme.colors.gray};
	border-radius: ${({ theme }) => theme.dims.borderRadius.normal};
	font-size: ${({ theme }) => theme.dims.fonts.small};
	padding: ${({ theme }) => theme.dims.padding.largePadding};
	display: inline-block;
`;
const Counter = styled.div`
	grid-area: ${({ area }) => area};
	& .number {
		font-size: ${({ theme }) => theme.dims.fonts.medium};
		display: block;
	}

	& .description {
		color: ${({ theme }) => theme.colors.silver};
	}
`;
const AppButton = styled(AppButtonTemplate)`
	grid-area: edit;
	display: block;
	width: 100%;
`;

const LogOutButton = styled(LogOutButtonTemplate)`
	grid-area: logOut;
	display: block;
	background-color: ${({ theme }) => theme.colors.accent};
	border-radius: ${({ theme }) => theme.dims.borderRadius.normal};
	padding: ${({ theme }) => theme.dims.padding.largePadding};
	box-shadow: ${({ theme }) => theme.shadows.depth1};
	margin-top: ${({ theme }) => theme.dims.margin.normal};
	font-size: 1em;
	color: ${({ theme }) => theme.colors.white};
	width: ${({ fullWidth, small, theme }) => {
		if (fullWidth) return '100%';
		if (small) return theme.dims.widths.forms;
		return 'auto';
	}};
	cursor: pointer;
	border: none;
	&:hover {
		opacity: 0.8;
		box-shadow: ${({ theme }) => theme.shadows.depth2};
	}
`;

const VideosContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(auto, 1fr));
	gap: 5px;
`;

export default function Profile() {
	const user = useSelector(state => state.user.user);
	const videos = useSelector(state => state.videos.data.videos);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadVideosForUser());
	}, []);
	return (
		<SmallContainer>
			<ProfileHeader>
				<div className='image-container'>
					<ProfileImage src='/avatar.jpg' />
				</div>
				<div className='info-container'>
					<p>
						<strong>@{user.username}</strong>
					</p>
					<Pill>{videos.length} videos</Pill>
				</div>
				<Counter area='following'>
					<p className='number'>0</p>
					<p className='description'>Siguiendo</p>
				</Counter>
				<Counter area='followers'>
					<p className='number'>0</p>
					<p className='description'>Seguidores</p>
				</Counter>
				<Counter area='likes'>
					<p className='number'>0</p>
					<p className='description'>Likes</p>
				</Counter>
				<AppButton className='button'>Edit</AppButton>
				<LogOutButton fullWidth>Close Session</LogOutButton>
			</ProfileHeader>
			<VideosContainer>
				{videos &&
					videos.map((video, index) => (
						<VideoThumbnail video={video} key={index} />
					))}
			</VideosContainer>
		</SmallContainer>
	);
}
