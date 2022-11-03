import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../others/Home';
import Profile from '../users/Profile';
import SignIn from '../users/SignIn';
import SignUp from '../users/SignUp';
import Videos from '../videos/Videos';
import VideosForm from '../videos/VideosForm';
import VideoShow from '../videos/VideoShow';

const NotImplemented = () => (
	<>
		<Link to={'/videos'}>Go to Videos</Link>
		<h1>This page isn't already yet</h1>
	</>
);

const Error404 = () => {
	return (
		<>
			<Link to={'/'}>Back to home</Link>
			<h1>Page not Found - 404</h1>
		</>
	);
};

function AppRoutes() {
	const user = useSelector(state => state.user.user);

	return (
		<Routes>
			<Route path='/' element={<Navigate to={'/videos'} />} />

			<Route
				path='/users'
				element={user ? <Navigate to={'/videos'} /> : <Outlet />}
			>
				<Route path='signup' element={<SignUp />} />
				<Route path='login' element={<SignIn />} />
			</Route>

			<Route
				path=''
				element={user ? <Outlet /> : <Navigate to={'/users/login'} />}
			>
				<Route path='profile' element={<Profile />} />
				<Route path=':id/videos' element={<NotImplemented />} />

				<Route path='/videos'>
					<Route path='' element={<Videos />} />
					<Route path='new' element={<VideosForm />} />
					<Route path=':id' element={<VideoShow />} />
				</Route>
			</Route>

			<Route path='*' element={<Error404 />} />
		</Routes>
	);
}

export default AppRoutes;
