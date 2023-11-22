import React from "react"
import { useDispatch } from "react-redux"
import { setLoggedIn } from "~/redux/authentication"
import { AppDispatch } from "~/redux/store"

const getGreeting = async function() {
	const res = await fetch(`server/api/hello.php`)
	return await res.json()
}

export function LoggedInApp() {
	const dispatch: AppDispatch = useDispatch()

	return <div className="LoggedInApp">
		<h1>You are logged in</h1>
		<div style={{ marginBottom: `10px` }}>
			<button onClick={() => {
				getGreeting().then((res) => alert(res.greeting))
			}}>Get From PHP Server!</button>
		</div>
		<button onClick={() => {
			dispatch(setLoggedIn(false))
		}}>Log Out</button>
	</div>
}
