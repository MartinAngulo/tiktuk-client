import React from 'react';
import styled from 'styled-components';
import {
	CenteredContainer,
	SmallContainer as SmallContainerTemplate,
	Title,
} from '../../theme';

const SmallContainer = styled(SmallContainerTemplate)`
	text-align: center;
`;

const Header = styled.header`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.dims.margin.normal};
`;

export default function UserFormLayout(props) {
	return (
		<CenteredContainer>
			<SmallContainer>
				<Header>
					<img src='/logo.svg' alt='Logo de la aplicacion' height='120' />
					<div>
						<Title>Tik Tuk</Title>
					</div>
				</Header>
				{props.children}
			</SmallContainer>
		</CenteredContainer>
	);
}
