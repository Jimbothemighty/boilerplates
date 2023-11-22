import React from "react"
import { isLoggedIn, setLoggedIn } from '~/redux/authentication'
import { useDispatch, useSelector } from 'react-redux'

export function NavBar() {
	const loggedIn = useSelector(isLoggedIn)
	const dispatch = useDispatch()

	return <div className="NavBar">
		<div className='logInButtonContainer'>ReactJs<button onClick={() => {
			dispatch(setLoggedIn(!loggedIn))
		}}>
			{loggedIn ? `Log Out` : `Log In`}
		</button>
		</div>
	</div>
}
