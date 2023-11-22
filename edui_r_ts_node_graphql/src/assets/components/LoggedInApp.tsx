import { useDispatch } from "react-redux"
import { setLoggedIn } from "~/redux/authentication"
import { AppDispatch } from "~/redux/store"

const getGreeting = async() => {
	const res = await fetch(`/api/hello`)
	return await res.json()
}

const getGraphQl = async() => {
	const res = await fetch(`/api/graphql`, {
		method: `POST`,
		headers: {
			"Content-Type": `application/json`,
			Accept: `application/json`,
		},
		body: JSON.stringify({ query: `{ hello }` }),
	})
	return await res.json()
}

export function LoggedInApp() {
	const dispatch: AppDispatch = useDispatch()

	return <div className="LoggedInApp">
		<h1>You are logged in</h1>
		<div style={{ marginBottom: `10px` }}>
			<button onClick={() => {
				getGreeting().then((res) => alert(res.greeting))
			}}>Get From Express Server!</button>
		</div>
		<div style={{ marginBottom: `10px` }}>
			<button onClick={() => {
				getGraphQl().then((res) => alert(JSON.stringify(res)))
			}}>Get From GraphQl Server!</button>
		</div>
		<button onClick={() => {
			dispatch(setLoggedIn(false))
		}}>Log Out</button>
	</div>
}
