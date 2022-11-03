import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClearButton } from '../../theme';
import { logOut } from '../../store/user';

export default function LogOutButton(props) {
	const dispatch = useDispatch();

	const doLogOut = () => {
		dispatch(logOut());
	};

	return (
		<ClearButton className={props.className} onClick={doLogOut}>
			Close Session
		</ClearButton>
	);
}
