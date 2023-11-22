import React from "react"
import { useDispatch } from 'react-redux'
import { setLoggedIn } from "~/redux/authentication"

export function LoggedInApp() {
	const dispatch = useDispatch()

	return <div className="LoggedInApp">
		<h1>You are logged in</h1>
		<button onClick={() => {
			dispatch(setLoggedIn(false))
		}}>Log Out</button>
	</div>
}
