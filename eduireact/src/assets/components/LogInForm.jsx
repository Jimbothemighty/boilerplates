import React from "react"
import { useDispatch } from 'react-redux'
import { setLoggedIn } from "~/redux/authentication"

export function LogInForm() {
	const dispatch = useDispatch()

	return <div className="LogInForm">
		<form>
			<h1>Log In Form</h1>
			<input type='email' placeholder='Email'/>
			<input type='password' placeholder='Password'/>
			<button onClick={() => {
				dispatch(setLoggedIn(true))
			}}>Log In</button>
		</form>
	</div>
}
