import Login from "../auth/Login"
import { Redirect } from 'react-router-dom'
import { useLogin } from '../../Context/AuthContext';
const Auth = ({ authRoute }) => {
	const { isLoggedIn } = useLogin();
	let body
	//If Context login = true vào trang MainDrawer và ngược lại 
	if (isLoggedIn) return <Redirect to='/MainDrawer' />
	else
		body = (
			<>
				{authRoute === 'login' && <Login />}
			</>
		)

	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1>Welcome, BT Style  </h1>
					<h4>Shopping made easy </h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth